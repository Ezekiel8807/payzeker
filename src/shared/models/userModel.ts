import mongoose, { models } from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  planName: String,
  subDuration: String,
  subStartDate: Date,
  subEndDate: Date,
  rank: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  tasks: [
    {
      userId: { type: String, default: "" },
      name: { type: String, default: "" },
      level: { type: Number, default: 1 },
      price: { type: Number, default: 100 },
      state: { type: String, enum: ["new", "review", "completed"], default: "new" },
      isActive: { type: Boolean, default: true },
      socialTarget: { type: String, default: "" },
      media: {
        type: { type: String, default: "link" },
        content: { type: String, default: "" },
      },
      caption: { type: String, default: "" },
      instruction: { type: String, default: "" },
      remainingDays: { type: Number, default: 0 },
      startDate: { type: Date, default: null },
      pauseDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
    },
  ],
  overallTask: { type: Number, default: 0 },
  completedTask: { type: Number, default: 0 },
  account: {
    balance: { type: Number, default: 0 },
    earning: { type: Number, default: 0 },
    minWithdrawal: { type: Number, default: 100 },
    withdrawal: {
      allTimeWithdrawal: { type: Number, default: 0 },
      bankName: { type: String, default: "" },
      bankCode: { type: String, default: "" },
      bankAcctNo: { type: String, default: "1234567890" },
      minWithdrawal: { type: Number, default: 5000 },
      maxWithdrawal: { type: Number, default: 5000 },
    },
  },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpiry: { type: Date },
  completedTours: { type: [String], default: [] },
  referralCode: { type: String, unique: true, sparse: true },
  referredBy: { type: String, default: null },
  referralsCount: { type: Number, default: 0 },
  referralEarnings: { type: Number, default: 0 },
  hasPaidReferralBonus: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

const User = models?.User || mongoose.model("User", UserSchema);
export default User;
