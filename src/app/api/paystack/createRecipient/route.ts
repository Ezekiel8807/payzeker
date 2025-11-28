"use server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, account_number, bank_code } = await req.json();

    const res = await fetch("https://api.paystack.co/transferrecipient", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "nuban",
        name,
        account_number,
        bank_code,
        currency: "NGN",
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
