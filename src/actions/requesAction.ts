"use server";
import { getToken } from "./action";
import User from "../model/userModel";
import Request from "../model/requestModel";
import Transaction from "@/model/transactionModel";
import Notification from "../model/notificationModel";
// import { revalidatePath } from "next/cache";

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

    //remove withdrawal amount from balance and add to allTimeWitdrawal
    user.account.balance -= amount;
    user.account.withdrawal.allTimeWithdrawal += amount;
    await user.save();

    //update

    //crate transaction
    const newTransaction = await new Transaction({
      userId: user._id,
      type: "debit",
      amount: amount,
      disc: `Withdraw #${amount}`,
    });
    await newTransaction.save();

    // Create withdrawal request
    const newRequest = new Request({
      userId,
      transId: newTransaction._id,
      username: user.username,
      fullname: `${user.lastname} ${user.firstname}`,
      type: "withdraw",
      bankName: user.account.withdrawal.bankName,
      bankAcctNo: user.account.withdrawal.bankAcctNo,
      amount: amount,
    });
    await newRequest.save();

    // Notify user about withdrawal
    const newNotification = await new Notification({
      username: user.username,
      message: `Withdrawal request of #${amount} successfully made. Await payment under 48hrs.`,
    });
    await newNotification.save();
    // Save to database

    return {
      error: false,
      balance: user.account.balance,
      msg: `Withdrawal request of #${amount} successfully made.`,
    };
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}

// export async function depositAction(email: string, depAmount: number) {
//   try {
//     //
//     const token = await getToken();
//     if (!token) return { error: true, msg: "User not logged in" };

//     if (!email) return { error: true, msg: "Missing user email!" };

//     if (depAmount < 100) return { error: true, msg: "Invalid amount!" };

//     const userId = token.id as string;
//     const user = await User.findOne({ _id: userId });
//     if (!user) return { error: true, msg: "User not found" };

//     //crate transaction
//     const newTransaction = new Transaction({
//       userId,
//       type: "deposit",
//       amount: depAmount,
//       disc: `Deposit request of #${depAmount}`,
//     });
//     await newTransaction.save();

//     // Notify user about withdrawal
//     const newNotification = new Notification({
//       username: user.username,
//       message: `Deposit of #${depAmount} successfully made.`,
//     });
//     // Save to database
//     await newNotification.save();

//     return {
//       error: false,
//       msg: `Deposit request of #${depAmount} successfully made.`,
//     };
//     //
//   } catch (err) {
//     return {
//       error: true,
//       msg: err instanceof Error ? err.message : "An unknown error occurred",
//     };
//   }
// }

//function to cancle deposit or withdraw requst...
export async function cancelRequest(userId: string, requestId: string) {
  if (!userId || !requestId)
    return { error: true, msg: "Error something went wrong!" };

  try {
    //fetch the user
    const user = await User.findById(userId);
    if (!user) return { error: true, msg: "Error can't find user!" };

    //fetch request with its id
    const request = await Request.findById(requestId);
    if (!request) return { error: true, msg: "Error can't find request!" };

    //fetch requst transaction
    const transaction = await Transaction.findById(request.transId);
    if (!transaction)
      return { error: true, msg: "Error can't find transaction!" };

    if (request.type === "withdraw") {
      user.account.balance += request.amount;

      //Update user
      await user.save();
    }

    //set transaction status failed
    transaction.status = "failed";
    await transaction.save();

    //Update the status of the request
    request.status = "declined";
    await request.save();

    //refund

    //notify the user
    const notification = new Notification({
      username: user.username,
      message: `Sorry😔, ${request.type} request of #${request.amount} was rejected!.`,
    });

    //save to update new info
    await notification.save();

    return { error: false, msg: "Request rejected sucessfully!" };

    //
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}

//function to confirm deposit or withdraw requst...
export async function confirmRequest(userId: string, requestId: string) {
  if (!userId || !requestId)
    return { error: true, msg: "Error something went wrong!" };

  try {
    //fetch the user
    const user = await User.findById(userId);
    if (!user) return { error: true, msg: "Error can't find user!" };

    //fetch submitted task
    const request = await Request.findById(requestId);
    if (!request) return { error: true, msg: "Error can't find request!" };

    //fetch submitted task
    const transaction = await Transaction.findById(request.transId);
    if (!transaction)
      return { error: true, msg: "Error can't find transaction!" };

    // if (request.type === "withdraw") {
    //   if (user.account.balance < request.amount) {
    //     cancelRequest(userId, requestId);
    //     return { error: true, msg: "Error: Insufficent balance!" };
    //   }

    //   user.account.balance -= request.amount;
    // }

    if (request.type === "deposit") {
      user.account.balance += request.amount;
    }

    //update user
    await user.save();

    //Update the status of the request
    request.status = "accepted";
    await request.save();

    //update transaction
    //set transaction status successful
    transaction.status = "successful";
    await transaction.save();

    //notify the user
    const notification = new Notification({
      username: user.username,
      message: `Congrat😃, your ${request.type} request of #${request.amount} as been confirmed!`,
    });

    //save to update new info
    await notification.save();

    return { error: false, msg: "Request confirmation completed!" };
    //
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}
