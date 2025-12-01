import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/actions/action";
import { rateLimit, RATE_LIMITS } from "@/lib/rateLimit";

const apiRateLimit = rateLimit(RATE_LIMITS.API);
const privateKey = process.env.PAYSTACK_SECRET_KEY;

export async function GET(req: NextRequest) {
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

    const response = await fetch("https://api.paystack.co/bank?country=nigeria", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${privateKey}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { status: false, message: "Failed to fetch banks" },
      { status: 500 }
    );
  }
}
