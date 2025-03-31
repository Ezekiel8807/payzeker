"use server";
import { getToken } from "./action";
import User from "../../src/model/userModel";
import Request from "../../src/model/requestModel";
import Notification from "../../src/model/notificationModel";

export async function withdrawalAction(
  balance: number,
  minWithdrawal: number,
  allTimeWithdrawal: number,
  maxWithdrawal: number,
  amount: number
) {
  try {
    const token = await getToken();
    if (!token) return { error: true, msg: "User not logged in" };

    if (amount > balance) {
      return { error: true, msg: "Insufficient balance" };
    }

    if (amount < minWithdrawal) {
      return { error: true, msg: `Minimum withdrawal is #${minWithdrawal}` };
    }

    if (amount + allTimeWithdrawal > maxWithdrawal) {
      return {
        error: true,
        msg: `Upgrade your account to withdraw this amount.`,
      };
    }

    const userId = token.id as string;
    const user = await User.findOne({ _id: userId });
    if (!user) return { error: true, msg: "User not found" };

    if (
      user.firstname === "" ||
      user.lastname === "" ||
      !user.account.withdrawal.bankName ||
      !user.account.withdrawal.bankAcctNo
    ) {
      return {
        error: true,
        msg: "Details are missing. Please update your profile.",
      };
    }

    // const requestCheck = await Request.find({ userId }).lean();
    // if (requestCheck.length > 0) {
    //   return { error: true, msg: "You have a request waiting for approval." };
    // }

    // Create withdrawal request
    const newRequest = new Request({
      userId,
      username: user.username,
      fullname: `${user.lastname} ${user.firstname}`,
      type: "withdraw",
      bankName: user.account.withdrawal.bankName,
      bankAcctNo: user.account.withdrawal.bankAcctNo,
      amount: amount,
    });

    // Notify user about withdrawal
    const newNotification = new Notification({
      username: user.username,
      message: `Withdrawal request of #${amount} successfully made. Await payment under 48hrs.`,
    });

    // Save to database
    await newNotification.save();
    await newRequest.save();

    return {
      error: false,
      msg: `Withdrawal request of #${amount} successfully made.`,
    };
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}
