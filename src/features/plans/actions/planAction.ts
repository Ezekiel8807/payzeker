"use server";
import { getToken } from "@/features/auth/actions/action";
import { connectDB } from "@/shared/lib/mongodb";
import { revalidatePath } from "next/cache";
import { calculateEndDate } from "@/shared/utils/dateFunc";

// models
import User from "@/shared/models/userModel";
import Plan from "@/features/plans/models/planModel";
import Transaction from "@/shared/models/transactionModel";
import Notification from "@/shared/models/notificationModel";
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
  isDefault,
}: {
  name: string;
  rank: number;
  duration: string;
  minWid: number;
  maxWid: number;
  minEarn: number;
  price: number;
  isDefault: boolean;
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
      (field) => field === undefined || field === null || field === "",
    );

    if (hasMissingFields) {
      return {
        error: true,
        msg: "Missing required fields. Please fill all inputs.",
      };
    }

    // If this new plan should be default, remove default from the previous one
    if (isDefault) {
      await Plan.updateMany(
        { isDefault: true },
        { $set: { isDefault: false } },
      );
    }

    const newPlan = new Plan({
      name,
      rank: Number(rank),
      subDuration: duration,
      minWithdrawal: Number(minWid),
      maxWithdrawal: Number(maxWid),
      minEarning: Number(minEarn),
      price: Number(price),
      isDefault,
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

    let hasPaidReferralBonus = dbUserInfo.hasPaidReferralBonus;
    const bonusAmount = 500;

    // Process referral bonus if applicable
    if (dbUserInfo.referredBy && !hasPaidReferralBonus) {
      const referrer = await User.findById(dbUserInfo.referredBy);
      if (referrer) {
        // Update referrer's balance and earnings
        referrer.account.balance += bonusAmount;
        referrer.referralEarnings += bonusAmount;
        await referrer.save();

        // Create a transaction for the referrer
        await new Transaction({
          userId: referrer._id,
          type: "credit",
          status: "successful",
          amount: bonusAmount,
          disc: `Referral Bonus for ${dbUserInfo.username}'s first subscription`,
        }).save();

        // Notify the referrer
        await new Notification({
          username: referrer.username,
          message: `You earned a ₦${bonusAmount} referral bonus for ${dbUserInfo.username}'s first subscription!`,
        }).save();

        hasPaidReferralBonus = true; // Mark as paid for the subscribing user
      }
    }

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
          hasPaidReferralBonus: hasPaidReferralBonus,
        },
      },
      { new: true },
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
