"use server";
import { getToken } from "@/features/auth/actions/action";
import { connectDB } from "@/shared/lib/mongodb";
import User from "@/shared/models/userModel";

export default async function getUserDailyTask() {
  const token = await getToken();
  if (!token?.id) return null;

  await connectDB();
  const user = await User.findOne({ _id: token.id }).populate("tasks");
  return JSON.parse(JSON.stringify(user));
}
