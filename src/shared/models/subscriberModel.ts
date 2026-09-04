import mongoose, { models } from "mongoose";

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

const Subscriber = models?.Subscriber || mongoose.model("Subscriber", SubscriberSchema);
export default Subscriber;
