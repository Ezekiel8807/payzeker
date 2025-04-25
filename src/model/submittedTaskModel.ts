import mongoose, { models } from "mongoose";

const SubmittedTaskSchema = new mongoose.Schema({
  userId: { type: String, default: "" },
  taskId: { type: String, default: "" },
  taskName: { type: String, default: "" },
  level: Number,
  price: { type: Number, default: 0 },
  state: { type: String, default: "review" },
  type: { type: String, required: true },
  content: { type: String, default: "" },
  instruction: { type: String, default: "" },
});

const SubmittedTask =
  models?.SubmittedTask || mongoose.model("SubmittedTask", SubmittedTaskSchema);
export default SubmittedTask;
