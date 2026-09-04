import mongoose, { models } from "mongoose";

const requestSchema = new mongoose.Schema({
  userId: { type: String, default: "" },
  transId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  username: { type: String, default: "" },
  fullname: { type: String, default: "" },
  status: {
    type: String,
    enum: ["new", "accepted", "declined"],
    default: "new",
  },
  bankName: String,
  bankAcctNo: Number,
  amount: { type: Number, required: true },
});

const Request = models?.Request || mongoose.model("Request", requestSchema);
export default Request;
