import mongoose, { models } from "mongoose";

const TaskSchema = new mongoose.Schema({
  userId: { type: String, default: "" },
  name: { type: String, default: "" },
  level: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
  state: {
    type: String,
    enum: ["new", "review", "completed"],
    default: "new",
  },
  socialTarget: { type: String, default: "" },
  link: { type: String, default: "" },
  media: {
    type: {
      type: String,
      enum: ["image", "video", "others"],
      default: "others",
    },
    content: { type: String, default: "" },
  },
  caption: { type: String, default: "" },
  instruction: { type: String, default: "" },
  startDate: { type: String, default: "" },
  endDate: { type: String, default: "" },
});

const Task = models?.Task || mongoose.model("Task", TaskSchema);
export default Task;
