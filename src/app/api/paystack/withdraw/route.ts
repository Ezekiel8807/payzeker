import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/actions/action";
import { rateLimit, RATE_LIMITS } from "@/lib/rateLimit";

const withdrawalRateLimit = rateLimit(RATE_LIMITS.WITHDRAWAL);
const privateKey = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    // Authentication check
    const userToken = await getToken();
    if (!userToken) {
      return NextResponse.json(
        { error: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    // Apply rate limiting per user
    const rateLimitResponse = withdrawalRateLimit(req, userToken.id);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const { amount, recipient_code } = body;

    // Input validation
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    if (!recipient_code || typeof recipient_code !== "string") {
      return NextResponse.json(
        { error: "Invalid recipient code" },
        { status: 400 }
      );
    }

    // Amount limits
    if (amount < 100) {
      return NextResponse.json(
        { error: "Minimum withdrawal is ₦100" },
        { status: 400 }
      );
    }

    if (amount > 10000000) {
      return NextResponse.json(
        { error: "Amount exceeds maximum limit" },
        { status: 400 }
      );
    }

    // Call Paystack API
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
  } catch {
    // Don't leak system information
    return NextResponse.json(
      { error: "An error occurred processing your withdrawal" },
      { status: 500 }
    );
  }
}
