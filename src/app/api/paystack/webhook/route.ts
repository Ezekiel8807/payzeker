import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/model/userModel";
import Transaction from "@/model/transactionModel";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const secret = process.env.PAYSTACK_SECRET_KEY as string;

        // Verify signature
        const signature = req.headers.get("x-paystack-signature");

        if (!signature) {
            return NextResponse.json({ message: "No signature provided" }, { status: 400 });
        }

        const hash = crypto
            .createHmac("sha512", secret)
            .update(JSON.stringify(body))
            .digest("hex");

        if (hash !== signature) {
            return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
        }

        // Process event
        const event = body.event;
        const data = body.data;

        if (event === "charge.success") {
            await connectDB();

            const reference = data.reference;
            const amount = data.amount / 100; // Convert kobo to Naira
            const email = data.customer.email;

            // Idempotency Check: Verify if this transaction has already been processed
            const existingTransaction = await Transaction.findOne({ reference });

            if (existingTransaction) {
                return NextResponse.json(
                    { message: "Transaction already processed" },
                    { status: 200 }
                );
            }

            // Find user and update balance
            const user = await User.findOne({ email });
            if (user) {
                user.account.balance += amount;
                await user.save();

                // Create transaction record
                await Transaction.create({
                    userId: user._id,
                    type: "credit",
                    status: "successful",
                    amount: amount,
                    disc: "Deposit via Paystack Webhook",
                    date: new Date(),
                    reference: reference, // Save reference for future idempotency checks
                });
            }
        }

        return NextResponse.json({ message: "Webhook received" }, { status: 200 });
    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
