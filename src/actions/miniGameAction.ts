"use server";
// import User from "@/model/userModel";
import { getToken } from "@/actions/action";
// import Transaction from "@/model/transactionModel";

export async function handleSpinAction(stake: number, balance: number) {
  let multiplier = 0;
  let outcome = "Try Again";
  const isLogin = await getToken();

  if (!isLogin) return { error: true, msg: "user not Authorized" };
  if (stake > balance) return { error: true, msg: "Insufficient Fund!" };

  const newBalance = balance - stake;

  const rand = Math.random() * 100;

  if (rand <= 2) {
    outcome = "Jackpot 🎉";
    multiplier = 5;
  } else if (rand <= 10) {
    outcome = "Big Win";
    multiplier = 2.5;
  } else if (rand <= 25) {
    outcome = "Break Even";
    multiplier = 1.0;
  } else if (rand <= 50) {
    outcome = "Small Win";
    multiplier = 1.5;
  } else {
    outcome = "Ops, Try Again";
    multiplier = 0;
  }

  const amountWon = stake * multiplier;
  const finalBalance = newBalance + amountWon;
  // const timestamp = new Date();

  // updateDatase

  return {
    error: false,
    msg: "success",
    result: { outcome, amountWon, finalBalance },
  };
}
