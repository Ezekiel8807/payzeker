import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/features/auth/actions/action";
import { rateLimit, RATE_LIMITS } from "@/shared/lib/rateLimit";

const apiRateLimit = rateLimit(RATE_LIMITS.API);
const privateKey = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    // Authentication check
    const userToken = await getToken();
    if (!userToken) {
      return NextResponse.json(
        { status: false, message: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    // Apply rate limiting
    const rateLimitResponse = apiRateLimit(req, userToken.id);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const { account_number, bank_code } = body;

    // Input validation
    if (!account_number || !bank_code) {
      return NextResponse.json(
        { status: false, message: "Account number and bank code are required" },
        { status: 400 }
      );
    }

    // Validate account number format (10 digits)
    if (!/^\d{10}$/.test(account_number)) {
      return NextResponse.json(
        { status: false, message: "Invalid account number format. Must be 10 digits." },
        { status: 400 }
      );
    }

    // Validate bank code format (3 digits)
    if (!/^\d{3}$/.test(bank_code)) {
      return NextResponse.json(
        { status: false, message: "Invalid bank code format" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${privateKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { status: false, message: "Failed to verify account" },
      { status: 500 }
    );
  }
}
