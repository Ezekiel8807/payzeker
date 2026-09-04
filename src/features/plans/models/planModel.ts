import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rank: Number,
  subDuration: String, // e.g. '1 month' '30 days'
  minWithdrawal: Number,
  maxWithdrawal: Number,
  minEarning: Number,
  price: Number,
  isDefault: { type: Boolean, default: false },
});

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);
export default Plan;
