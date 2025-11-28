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

const Transaction =
  models?.Transaction || mongoose.model("Transaction", transactionSchema);
export default Transaction;
