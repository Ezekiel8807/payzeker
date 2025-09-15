"use server";
import { getToken } from "./action";
import { connectDB } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { calculateEndDate } from "@/utils/dateFunc";

// models
import User from "@/actions/model/userModel";
import Plan from "@/actions/model/planModel";
import Transaction from "@/actions/model/transactionModel";
import Notification from "@/actions/model/notificationModel";
import { redirect } from "next/navigation";

//////////////////////////////////
//Action to create a user Plan
//////////////////////////////////
export async function createPlan({
  name,
  rank,
  duration,
  minWid,
  maxWid,
  minEarn,
  price,
}: {
  name: string;
  rank: number | string;
  duration: string;
  minWid: number | string;
  maxWid: number | string;
  minEarn: number | string;
  price: number | string;
}) {
  try {
    const requiredFields = [
      name,
      rank,
      duration,
      minWid,
      maxWid,
      minEarn,
      price,
    ];
    const hasMissingFields = requiredFields.some(
      (field) => field === undefined || field === null || field === ""
    );

    if (hasMissingFields) {
      return {
        error: true,
        msg: "Missing required fields. Please fill all inputs.",
      };
    }

    const newPlan = new Plan({
      name,
      rank: Number(rank),
      subDuration: duration,
      minWithdrawal: Number(minWid),
      maxWithdrawal: Number(maxWid),
      minEarning: Number(minEarn),
      price: Number(price),
    });

    await newPlan.save();

    return { error: false, msg: "Plan created successfully!" };
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred.",
    };
  }
}

//////////////////////////////////
//Action to subscribe user to a plan
//////////////////////////////////
export async function subToPlan(planId: string) {
  if (!planId)
    return {
      error: true,
      msg: "Missing plan ID. Please provide a valid plan.",
    };

  const user = await getToken();
  if (!user) return redirect("/login");

  try {
    await connectDB();

    const [dbUserInfo, plan] = await Promise.all([
      User.findById(user.id),
      Plan.findById(planId),
    ]);

    if (!dbUserInfo) return { error: true, msg: "User not found." };
    if (!plan) return { error: true, msg: "Plan not found." };
    if (dbUserInfo.planName === plan.name) {
      return { error: true, msg: "Already subscribed to this plan." };
    }
    if (dbUserInfo.account.balance < plan.price) {
      return { error: true, msg: "Insufficient funds." };
    }

    const now = new Date();
    const end = calculateEndDate(now, plan.subDuration);
    const updatedBalance = dbUserInfo.account.balance - plan.price;

    const updatedUser = await User.findByIdAndUpdate(
      dbUserInfo._id,
      {
        $set: {
          rank: plan.rank,
          planName: plan.name,
          subDuration: plan.subDuration,
          subStartDate: now,
          subEndDate: end,
          "account.balance": updatedBalance,
          "account.withdrawal.allTimeWithdrawal": 0,
          "account.withdrawal.minWithdrawal": plan.minWithdrawal,
          "account.withdrawal.maxWithdrawal": plan.maxWithdrawal,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return {
        error: true,
        msg: "Something went wrong during the subscription update.",
      };
    }

    await Promise.all([
      new Transaction({
        userId: user.id,
        type: "debit",
        status: "successful",
        amount: plan.price,
        disc: `#${plan.price} for upgrade`,
      }).save(),

      new Notification({
        username: dbUserInfo.username,
        message: "Congratulations! You have successfully upgraded your plan.",
      }).save(),
    ]);

    revalidatePath("/dashboard"); // change path as needed
    return {
      error: false,
      msg: `Successfully subscribed for upgrade to ${plan.name} plan.`,
    };

    //
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred.",
    };
  }
}
