import mongoose, { models } from "mongoose";

const requestSchema = new mongoose.Schema({
  userId: { type: String, default: "" },
  transId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  username: { type: String, default: "" },
  fullname: { type: String, default: "" },
  type: {
    type: String,
    enum: ["deposit", "withdraw", "others"],
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "accepted", "declined"],
    default: "new",
  },
  bankName: String,
  bankAcctNo: Number,
  prof: { type: String, default: "" },
  amount: { type: Number, required: true },
});

const Request = models?.Request || mongoose.model("Request", requestSchema);
export default Request;
