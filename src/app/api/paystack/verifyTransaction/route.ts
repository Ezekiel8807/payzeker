import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
// import Transaction from "@/model/transactionModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { reference } = await req.json();

  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization:
          "Bearer sk_test_8f88d45f65a1bbe065f5c5b9f9fcdca6a1e7b09e", // from .env
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

    return NextResponse.json({
      success: true,
      amount: amount / 100, // Convert back to Naira
      email,
    });
  }

  return NextResponse.json({ success: false });
}
