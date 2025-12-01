import mongoose, { models } from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: String, default: "" },
  // transId
  type: {
    type: String,
    enum: ["credit", "debit"],
    default: "debit",
  },
  status: {
    type: String,
    enum: ["successful", "pending", "failed"],
    default: "pending",
  },
  amount: { type: Number, default: 0 },
  disc: {
    type: String,
    default: "",
  },
  date: { type: Date, default: Date.now() },
});

// Add indexes for better query performance
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ type: 1, status: 1 });
transactionSchema.index({ userId: 1, type: 1, status: 1 });

const Transaction =
  models?.Transaction || mongoose.model("Transaction", transactionSchema);
export default Transaction;
