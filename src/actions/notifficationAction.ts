"use server";
import Notification from "@/model/notificationModel";

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
