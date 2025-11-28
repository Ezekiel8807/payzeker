"use server";
import { getToken } from "@/actions/action";
import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/model/transactionModel";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

//private key
const privateKey = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: NextRequest) {
  const userToken = await getToken();
  if (!userToken) redirect("/login");

  const { reference } = await req.json();

  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${privateKey}`, // from .env
      },
    }
  );

  const result = await res.json();

  if (result.status && result.data.status === "success") {
    const { amount, customer } = result.data;
    const email = customer.email;

    //connect database
    await connectDB();

    //Update your database
    await User.updateOne(
      { email },
      { $inc: { "account.balance": amount / 100 } }
    );

    //create new transaction for deposit
    await Transaction.create({
      userId: userToken.id,
      type: "credit",
      status: "successful",
      amount: amount / 100,
      disc: "Deposit",
      date: new Date(),
    });

    return NextResponse.json({
      success: true,
      amount: amount / 100, // Convert back to Naira
      email,
    });
  }

  return NextResponse.json({ success: false });
}
