"use server";
import User from "@/shared/models/userModel";
import { connectDB } from "@/shared/lib/mongodb";

export default async function getLeadership() {
  // Connect to the database
  await connectDB();

  // Find top 5 users sorted by earning in descending order
  const leaders = await User.find({}, "username rank completedTask account")
    .sort({ "account.earning": -1 }) // 👈 sort using dot notation
    .limit(5);

  // Convert Mongoose documents to plain objects
  return JSON.parse(JSON.stringify(leaders));
}
