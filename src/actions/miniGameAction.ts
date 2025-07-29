"use server";

import User from "@/model/userModel";
import Transaction from "@/model/transactionModel";
import { connectDB } from "@/lib/mongodb";
import { getToken } from "@/actions/action";

export async function handleSpinAction(stake: number, balance: number) {
  await connectDB(); // Ensure DB connection

  const token = await getToken();
  if (!token) return { error: true, msg: "User not authorized" };

  const userId = token.id;

  if (stake > balance) return { error: true, msg: "Insufficient funds!" };

  const newBalance = balance - stake;
  const rand = Math.random() * 100;

  let multiplier = 0;
  let outcome = "Try Again";

  if (rand <= 2) {
    outcome = "Jackpot 🎉";
    multiplier = 5.0;
  } else if (rand <= 10) {
    outcome = "Big Win";
    multiplier = 2.5;
  } else if (rand <= 25) {
    outcome = "Small Win";
    multiplier = 1.5;
  } else if (rand <= 45) {
    outcome = "Break Even";
    multiplier = 1.0;
  } else {
    outcome = "Oops, Try Again";
    multiplier = 0;
  }

  const amountWon = stake * multiplier;
  const finalBalance = newBalance + amountWon;

  try {
    // Update user's balance
    await User.findByIdAndUpdate(userId, { "account.balance": finalBalance });

    // Record stake (debit) transaction
    await Transaction.create({
      userId,
      type: "debit",
      status: "successful",
      amount: stake,
      disc: "Spin stake",
      date: new Date(),
    });

    // Record win (credit) transaction, only if amountWon > 0
    if (amountWon > 0) {
      await Transaction.create({
        userId,
        type: "credit",
        status: "successful",
        amount: amountWon,
        disc: `Spin win: ${outcome}`,
        date: new Date(),
      });
    }

    return {
      error: false,
      msg: "success",
      result: {
        outcome,
        amountWon,
        finalBalance,
      },
    };
  } catch (error) {
    console.error("Spin Error:", error);
    return {
      error: true,
      msg: "Something went wrong, try again.",
    };
  }
}
