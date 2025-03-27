import mongoose, { models } from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: String, default: "" },
  state: {
    type: String,
    enum: ["read", "unread"],
    default: "unread",
  },
  message: {
    type: String,
    default:
      "Hello, welcome to payzeker. Start earning by performing your daily assigned task on your dashboard.",
  },
});

const Notification =
  models?.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;
