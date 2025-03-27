import mongoose, { models } from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: String, default: "" },
  transId: { type: String, default: "" },
  type: {
    type: String,
    enum: ["deposit", "withdraw", "other"],
    default: "other",
  },
  amount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["successful", "pending", "failed"],
    default: "pending",
  },
  disc: {
    type: String,
    default: "",
  },
});

const Transaction =
  models?.Transaction || mongoose.model("Transaction", transactionSchema);
export default Transaction;
