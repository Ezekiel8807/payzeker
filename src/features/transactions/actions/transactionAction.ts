"use server";
import { getToken } from "@/features/auth/actions/action";
import User from "@/shared/models/userModel";
import { connectDB } from "@/shared/lib/mongodb";
import { redirect } from "next/navigation";
import Transaction from "@/shared/models/transactionModel";

export async function userTransLim5() {
  const userToken = await getToken();
  if (!userToken) redirect("/login");

  const userId = userToken.id as string;
  if (!userId) return { error: true, msg: "Error something went wrong!" };

  await connectDB();

  const userLatestSpainTrans = await Transaction.find(
    { userId, disc: { $regex: "Spin", $options: "i" } },
    "_id userId type disc amount date"
  )
    .sort({ date: -1 })
    .limit(3);

  return JSON.parse(JSON.stringify(userLatestSpainTrans));
}

export async function spinWinners() {
  await connectDB();

  const transactions = await Transaction.aggregate([
    { $match: { type: "credit", disc: { $regex: "Spin win", $options: "i" } } },
    { $sample: { size: 50 } },
    { $project: { userId: 1, amount: 1 } },
  ]);

  if (transactions.length === 0) return [];

  const userIds = Array.from(new Set(transactions.map((t) => t.userId))).filter(Boolean);
  const users = await User.find({ _id: { $in: userIds } }, "_id username").lean();

  const userMap = new Map<string, string>();
  users.forEach((u) => { if (u?._id && u?.username) userMap.set(String(u._id), u.username); });

  const result = transactions.map((t) => ({ ...t, username: userMap.get(t.userId) || "Unknown" }));
  return JSON.parse(JSON.stringify(result));
}
