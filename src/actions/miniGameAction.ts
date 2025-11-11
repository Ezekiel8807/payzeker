"use server";
import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
import { getToken } from "@/actions/action";
import { revalidatePath } from "next/cache";
import Transaction from "@/model/transactionModel";

export async function handleSpinAction(stake: number, balance: number) {
  await connectDB(); // Ensure DB connection

  const token = await getToken();
  if (!token) return { error: true, msg: "User not authorized" };

  const userId = token.id;

  if (stake > balance || stake < 100)
    return { error: true, msg: "Insufficient funds or Invalid Amount!" };

  const newBalance = balance - stake;
  const rand = Math.random() * 100;

  let outcome = "lose";
  let multiplier = 0;
  let winType = "Try Again";

  // replace multiplier assignments
  if (rand <= 2) {
    winType = "Jackpot 🎉";
    multiplier = 4.0; // changed
    outcome = "win";
  } else if (rand <= 10) {
    winType = "Big Win";
    multiplier = 2.0; // changed
    outcome = "win";
  } else if (rand <= 35) {
    winType = "Small Win";
    multiplier = 1.2; // changed
    outcome = "win";
  } else if (rand <= 60) {
    winType = "Break Even";
    multiplier = 1.0;
    outcome = "break-even";
  } else {
    winType = "Try Again";
    multiplier = 0;
    outcome = "lose";
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
        disc: `Spin win: ${winType}`,
        date: new Date(),
      });
    }

    //re-validate path
    revalidatePath("/dashboard");

    return {
      error: false,
      msg: "success",
      result: {
        outcome,
        winType,
        amountWon,
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
