import mongoose, { models } from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  username: { type: String, required: true, unique: true }, /// username is required
  email: { type: String, required: true, unique: true }, /// user email is required
  rank: { type: Number, default: 1 },
  isAdmin: { type: Boolean, default: false },
  tasks: [
    {
      name: { type: String, default: "" },
      level: { type: Number, default: 1 },
      price: { type: Number, default: 0 },
      state: {
        type: String,
        enum: ["new", "review", "completed"],
        default: "new",
      },
      socialTarget: { type: String, default: "" },
      media: {
        type: {
          type: String,
          enum: ["image", "video", "others"],
          default: "others",
        },
        content: { type: String, default: "" },
      },
      isPaid: { type: Boolean, default: false },
      instruction: { type: String, default: "" },
    },
  ],
  overallTask: { type: Number, default: 0 },
  completedTask: { type: Number, default: 0 },
  account: {
    balance: { type: Number, default: 0 },
    withdrawal: {
      allTimeWithdrawal: { type: Number, default: 0 },
      bankName: { type: String, default: "Bank Name" },
      bankAcctNo: { type: Number, default: 123456890 },
      minWithdrawal: { type: Number, default: 5000 },
      maxWithdrawal: { type: Number, default: 5000 },
    },
  },
  password: { type: String, require: true }, // user password is required
});

const User = models?.User || mongoose.model("User", UserSchema);
export default User;
