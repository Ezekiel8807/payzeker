"use server";
import { getToken } from "./action";
import User from "../../src/model/userModel";
import Request from "../../src/model/requestModel";
import Transaction from "@/model/transactionModel";
import Notification from "../../src/model/notificationModel";

export async function depositAction(depAmount: number, fileUrl: string) {
  try {
    //
    const token = await getToken();
    if (!token) return { error: true, msg: "User not logged in" };

    if (depAmount < 100) {
      return { error: true, msg: "Invalid amount!" };
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

    //crate transaction
    const newTransaction = new Transaction({
      userId,
      type: "deposit",
      amount: depAmount,
      disc: `Deposit request of #${depAmount}`,
    });
    await newTransaction.save();

    // Create deposit request
    const newRequest = new Request({
      userId,
      transId: newTransaction._id,
      username: user.username,
      fullname: `${user.lastname} ${user.firstname}`,
      type: "deposit",
      prof: fileUrl,
      amount: depAmount,
    });
    await newRequest.save();

    // Notify user about withdrawal
    const newNotification = new Notification({
      username: user.username,
      message: `Deposit request of #${depAmount} successfully made. Await Approval under 24hrs.`,
    });
    // Save to database
    await newNotification.save();

    return {
      error: false,
      msg: `Deposit request of #${depAmount} successfully made.`,
    };

    //z
  } catch (err) {
    //
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
    //
  }
}
