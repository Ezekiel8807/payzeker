import mongoose, { models } from "mongoose";

const RecipientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  recipient_code: { type: String, required: true },
  recipient_id: { type: Number },
  type: { type: String, default: "nuban" },
  name: { type: String, required: true },
  account_number: { type: String, required: true },
  bank_code: { type: String, required: true },
  bank_name: { type: String },
  currency: { type: String, default: "NGN" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Recipient = models?.Recipient || mongoose.model("Recipient", RecipientSchema);
export default Recipient;
