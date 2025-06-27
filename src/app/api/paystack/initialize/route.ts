import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const PAYSTACK_SECRET_KEY = "sk_test_8f88d45f65a1bbe065f5c5b9f9fcdca6a1e7b09e";

export async function POST(req: NextRequest) {
  const { email, amount } = await req.json();

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Paystack expects amount in Kobo (NGN)
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
    //

    //
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to initialize payment: ${err}` },
      { status: 500 }
    );
  }
}
