"use server";
import { getToken } from "@/features/auth/actions/action";
import { connectDB } from "@/shared/lib/mongodb";
import User from "@/shared/models/userModel";
import Notification from "@/shared/models/notificationModel";

export async function getHeaderData() {
  const token = await getToken();
  if (!token) return { user: null, notifications: [] };

  await connectDB();

  const user = await User.findOne({ _id: token.id }).select("username rank isAdmin");
  const notifications = await Notification.find({ username: token.username }).sort({ _id: -1 });

  return {
    user: JSON.parse(JSON.stringify(user)),
    notifications: JSON.parse(JSON.stringify(notifications)),
  };
}
