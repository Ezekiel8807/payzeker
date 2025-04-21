"use server";
import { getToken } from "@/actions/action";
import { connectDB } from "@/lib/mongodb";
import User from "@/model/userModel";
import Notification from "@/model/notificationModel";

export async function getHeaderData() {
  const token = await getToken();
  if (!token) return { user: null, notifications: [] };

  await connectDB();

  const user = await User.findOne({ _id: token.id }).select(
    "username rank isAdmin"
  );
  const notifications = await Notification.find({
    username: token.username,
  }).sort({ _id: -1 });

  return {
    user: JSON.parse(JSON.stringify(user)),
    notifications: JSON.parse(JSON.stringify(notifications)),
  };
}
