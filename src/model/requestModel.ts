import mongoose, { models } from "mongoose";

const requestSchema = new mongoose.Schema({
  userId: { type: String, default: "" },
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
  bankName: { type: String, required: true },
  bankAcctNo: { type: Number, required: true },
  prof: { type: String, default: "" },
  amount: { type: Number, required: true },
});

const Request = models?.Request || mongoose.model("Request", requestSchema);
export default Request;
