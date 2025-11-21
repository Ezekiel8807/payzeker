"use server";
import { getToken } from "./action";
import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import Transaction from "@/model/transactionModel";

export async function userTransLim5() {
  //user authentication
  const userToken = await getToken();
  if (!userToken) redirect("/login");

  const userId = userToken.id as string;
  if (!userId) return { error: true, msg: "Error something went wrong!" };

  //db connection
  await connectDB();

  // fetch user's 5 latet spin transaction
  const userLatestSpainTrans = await Transaction.find(
    {
      userId,
      disc: { $regex: "Spin", $options: "i" },
    },
    "_id userId type disc amount date"
  )
    .sort({ date: -1 })
    .limit(3);

  // Convert Mongoose documents to plain objects
  return JSON.parse(JSON.stringify(userLatestSpainTrans));
}

export async function spinWinners() {
  await connectDB();

  // Randomly select 100 spin-win transactions
  const transactions = await Transaction.aggregate([
    {
      $match: {
        type: "credit",
        disc: { $regex: "Spin win", $options: "i" }, // case-insensitive
      },
    },
    { $sample: { size: 50 } }, // randomly pick 100
    { $project: { userId: 1, amount: 1 } }, // select fields
  ]);

  if (transactions.length === 0) return [];

  // Extract unique userIds
  const userIds = Array.from(new Set(transactions.map((t) => t.userId))).filter(
    Boolean
  );

  // Fetch all users with these IDs
  const users = await User.find(
    { _id: { $in: userIds } },
    "_id username"
  ).lean();

  // Build a safe map
  const userMap = new Map<string, string>();
  users.forEach((u) => {
    if (u?._id && u?.username) {
      userMap.set(String(u._id), u.username); // cast _id to string
    }
  });

  // Merge username into each transaction
  const result = transactions.map((t) => ({
    ...t,
    username: userMap.get(t.userId) || "Unknown",
  }));

  return JSON.parse(JSON.stringify(result));
}
