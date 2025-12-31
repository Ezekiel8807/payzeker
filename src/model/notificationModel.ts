import mongoose, { models } from "mongoose";

const notificationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  state: {
    type: String,
    enum: ["read", "unread"],
    default: "unread",
  },
  message: {
    type: String,
    default:
      "Hello, welcome to payzeker. you are currently on our 7days free trial. Subscribe to any of our plans today and start earning more cash for every task completed.",
  },
});

const Notification =
  models?.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;
