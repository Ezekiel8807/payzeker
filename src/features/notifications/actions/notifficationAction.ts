"use server";
import Notification from "@/shared/models/notificationModel";
import { getToken } from "@/features/auth/actions/action";
import { connectDB } from "@/shared/lib/mongodb";

// Get all notifications for current user
export async function getNotifications() {
  try {
    const token = await getToken();
    if (!token) {
      return { error: true, message: "Unauthorized", data: [] };
    }

    await connectDB();

    const notifications = await Notification.find({
      username: token.username,
    })
      .sort({ _id: -1 })
      .lean();

    return {
      error: false,
      data: JSON.parse(JSON.stringify(notifications)),
    };
  } catch (err) {
    return {
      error: true,
      message: err instanceof Error ? err.message : "An unknown error occurred",
      data: [],
    };
  }
}

// Update Notification State
export async function updateNotis(id: string) {
  try {
    const updatedNotis = await Notification.findOneAndUpdate(
      { _id: id },
      { $set: { state: "read" } },
      { new: true } // Ensures the updated document is returned
    );

    if (!updatedNotis)
      return { error: true, msg: "Error updating notification" };

    return { error: false, msg: "Update successful" };
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}

// Delete Notification
export async function deleteNotis(id: string) {
  try {
    const deletedNotis = await Notification.findByIdAndDelete(id);

    if (!deletedNotis)
      return { error: true, msg: "Error deleting notification" };

    return { error: false, msg: "Notification deleted successfully" };
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}
