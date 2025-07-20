"use server";
import { getToken } from "@/actions/action";
import { connectDB } from "@/lib/mongodb";
import User from "@/model/userModel";

// Fetch user data on the server
export default async function getUserDailyTask() {
  const token = await getToken();
  if (!token?.id) return null;

  //db connection
  await connectDB();

  // Find user and populate tasks
  const user = await User.findOne({ _id: token.id }).populate("tasks");

  // Convert user data to a plain JavaScript object
  return JSON.parse(JSON.stringify(user));
}
