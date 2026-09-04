import mongoose, { models } from "mongoose";

const WithdrawalRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  username: { type: String, required: true },
  amount: { type: Number, required: true },
  bankName: { type: String, required: true },
  bankCode: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountName: { type: String, default: "" },
  status: { type: String, enum: ["pending", "approved", "rejected", "completed"], default: "pending", index: true },
  requestDate: { type: Date, default: Date.now, index: true },
  processedDate: { type: Date },
  processedBy: { type: String },
  rejectionReason: { type: String },
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  notes: { type: String },
});

WithdrawalRequestSchema.index({ userId: 1, status: 1 });
WithdrawalRequestSchema.index({ status: 1, requestDate: -1 });

const WithdrawalRequest = models?.WithdrawalRequest || mongoose.model("WithdrawalRequest", WithdrawalRequestSchema);
export default WithdrawalRequest;
