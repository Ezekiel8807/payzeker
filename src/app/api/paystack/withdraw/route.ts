"use server";
import { NextResponse } from "next/server";

//private key
const privateKey = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: Request) {
  try {
    const { amount, recipient_code } = await req.json();

    const res = await fetch("https://api.paystack.co/transfer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${privateKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "balance",
        amount: amount * 100,
        recipient: recipient_code,
        reason: "User withdrawal",
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
    //

    //
  } catch (e) {
    return NextResponse.json({ error: `Error: ${e}` }, { status: 500 });
  }
}
