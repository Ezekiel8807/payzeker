import mongoose, { models } from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  username: { type: String, required: true, unique: true }, /// username is required
  email: { type: String, required: true, unique: true }, /// user email is required
  planName: { type: String, required: true },
  subDuration: String,
  subStartDate: Date,
  subEndDate: Date,
  rank: Number,
  isAdmin: { type: Boolean, default: false },
  tasks: [
    {
      userId: { type: String, default: "" },
      name: { type: String, default: "" },
      level: { type: Number, default: 1 },
      price: { type: Number, default: 100 },
      state: {
        type: String,
        enum: ["new", "review", "completed"],
        default: "new",
      },
      isActive: { type: Boolean, default: true },
      socialTarget: { type: String, default: "" },
      media: {
        type: { type: String, default: "link" },
        content: { type: String, default: "" },
      },
      caption: { type: String, default: "" },
      instruction: { type: String, default: "" },
      remainingDays: Number,
      startDate: Date,
      pauseDate: Date,
      endDate: Date,
    },
  ],
  overallTask: { type: Number, default: 0 },
  completedTask: { type: Number, default: 0 },
  account: {
    balance: { type: Number, default: 0 },
    withdrawal: {
      allTimeWithdrawal: { type: Number, default: 0 },
      bankName: { type: String, default: "" },
      bankAcctNo: { type: Number, default: 1234567890 },
      minWithdrawal: { type: Number, required: true },
      maxWithdrawal: { type: Number, required: true },
    },
  },
  password: { type: String, require: true }, // user password is required
  createdAt: { type: Date, default: Date.now() },
});

const User = models?.User || mongoose.model("User", UserSchema);
export default User;
