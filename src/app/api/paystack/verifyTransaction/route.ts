"use server";
import { getToken } from "@/features/auth/actions/action";
import User from "@/shared/models/userModel";
import { connectDB } from "@/shared/lib/mongodb";
import Transaction from "@/shared/models/transactionModel";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

//private key
const privateKey = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: NextRequest) {
  const userToken = await getToken();
  if (!userToken) redirect("/login");

  const { reference } = await req.json();

  await connectDB();

  // 1. Idempotency Check: Check if we have already processed this reference
  const existingTransaction = await Transaction.findOne({ reference });
  if (existingTransaction) {
    return NextResponse.json({
      success: true,
      amount: existingTransaction.amount,
      message: "Transaction already verified",
    });
  }

  // 2. Verify with Paystack
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${privateKey}`, // from .env
      },
    },
  );

  const result = await res.json();

  if (result.status && result.data.status === "success") {
    const { amount, customer } = result.data;
    const email = customer.email;

    // Create transaction record FIRST (this acts as a lock)
    await Transaction.create({
      userId: userToken.id,
      type: "credit",
      status: "successful",
      amount: amount / 100,
      disc: "Deposit",
      date: new Date(),
      reference: reference,
    });

    // Then credit balance
    // Webhook will skip this transaction because it already exists
    await User.updateOne(
      { email },
      { $inc: { "account.balance": amount / 100 } },
    );

    return NextResponse.json({
      success: true,
      amount: amount / 100,
      email,
      message: "Payment verified and credited successfully",
    });
  }

  return NextResponse.json({ success: false });
}
