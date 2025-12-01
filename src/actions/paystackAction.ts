"use server";
import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { revalidatePath } from "next/cache";
// import Recipient from "@/model/recipientModel";

/* ============================================
   AUTOMATIC PAYSTACK WITHDRAWAL (COMMENTED OUT)
   Uncomment this when Paystack account is upgraded
   ============================================ */

/*
export async function withdrawPaystackServer(amount: number) {
  try {
    const userToken = await getToken();
    if (!userToken) redirect("/login");

    // Input validation
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return { error: true, message: "Invalid amount" };
    }

    if (amount > 10000000) {
      return { error: true, message: "Amount exceeds maximum limit" };
    }

    if (!Number.isInteger(amount)) {
      return { error: true, message: "Amount must be a whole number" };
    }

    await connectDB();

    const user = await User.findById(userToken.id);
    if (!user) {
      return { error: true, message: "User not found" };
    }

    const { balance } = user.account;
    const { minWithdrawal } = user.account.withdrawal;

    if (amount > balance) {
      return { error: true, message: "Insufficient balance" };
    }

    if (amount < minWithdrawal) {
      return { error: true, message: `Minimum withdrawal is ₦${minWithdrawal.toLocaleString()}` };
    }

    if (!user.firstname || !user.lastname) {
      return { error: true, message: "Please update your profile with your full name" };
    }

    const recipient = await Recipient.findOne({ userId: user._id });
    let recipientCode = recipient?.recipient_code;

    const { bankName, bankCode, bankAcctNo } = user.account.withdrawal;

    if (!recipientCode) {
      if (!bankCode || !bankAcctNo) {
        return { error: true, message: "Please update your bank details first" };
      }

      const privateKey = process.env.PAYSTACK_SECRET_KEY;
      const createRecipientRes = await fetch("https://api.paystack.co/transferrecipient", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${privateKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "nuban",
          name: `${user.firstname} ${user.lastname}`,
          account_number: bankAcctNo,
          bank_code: bankCode, 
          currency: "NGN",
        }),
      });

      const recipientData = await createRecipientRes.json();

      if (!recipientData.status) {
        return { error: true, message: recipientData.message || "Failed to create recipient" };
      }

      recipientCode = recipientData.data.recipient_code;

      await Recipient.create({
        userId: user._id,
        recipient_code: recipientCode,
        recipient_id: recipientData.data.id,
        name: recipientData.data.name,
        account_number: bankAcctNo,
        bank_code: bankCode,
        bank_name: bankName || recipientData.data.details?.bank_name || "",
        type: recipientData.data.type,
        currency: recipientData.data.currency,
      });
    }

    const privateKey = process.env.PAYSTACK_SECRET_KEY;
    const res = await fetch("https://api.paystack.co/transfer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${privateKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "balance",
        amount: amount * 100,
        recipient: recipientCode,
        reason: "User withdrawal",
      }),
    });

    const data = await res.json();

    if (data.status && data.data.status === "success") {
      user.account.balance -= amount;
      user.account.withdrawal.allTimeWithdrawal += amount;
      await user.save();

      const Transaction = (await import("@/model/transactionModel")).default;
      await Transaction.create({
        userId: user._id,
        type: "debit",
        status: "successful",
        amount: amount,
        disc: "Withdrawal via Paystack",
        date: new Date(),
      });

      const Notification = (await import("@/model/notificationModel")).default;
      await Notification.create({
        username: user.username,
        message: `Withdrawal of ₦${amount} was successful`,
      });

      revalidatePath("/dashboard");
      return { error: false, message: `Withdrawal of ₦${amount} successful` };
    } else {
      return { error: true, message: data.message || "Withdrawal failed" };
    }
  } catch (error) {
    console.error("Withdrawal error:", error);
    return { error: true, message: "An error occurred during withdrawal" };
  }
}
*/

/* ============================================
   MANUAL WITHDRAWAL REQUEST SYSTEM (ACTIVE)
   Used until Paystack account is upgraded
   ============================================ */

export async function createWithdrawalRequest(amount: number) {
  try {
    const userToken = await getToken();
    if (!userToken) redirect("/login");

    // Import constants and utilities at the top of the file
    const { WITHDRAWAL_LIMITS } = await import("@/lib/constants");
    const { isValidAmount, createErrorResponse } = await import("@/lib/utils");

    // Strict input validation using utility
    if (
      !isValidAmount(
        amount,
        WITHDRAWAL_LIMITS.MINIMUM,
        WITHDRAWAL_LIMITS.MAXIMUM
      )
    ) {
      return createErrorResponse(
        `Amount must be between ₦${WITHDRAWAL_LIMITS.MINIMUM.toLocaleString()} and ₦${WITHDRAWAL_LIMITS.MAXIMUM.toLocaleString()}`
      );
    }

    //connect to database
    await connectDB();

    //fetch the user from database
    const user = await User.findById(userToken.id);
    if (!user) {
      return { error: true, message: "User not found" };
    }

    // Validate withdrawal amount
    const { balance, minWithdrawal } = user.account;

    if (amount > balance) {
      return { error: true, message: "Insufficient balance" };
    }

    if (amount < minWithdrawal) {
      return {
        error: true,
        message: `Minimum withdrawal is ₦${minWithdrawal.toLocaleString()}`,
      };
    }

    // Validate user details
    if (!user.firstname || !user.lastname) {
      return {
        error: true,
        message: "Please update your profile with your full name",
      };
    }

    // Get bank details
    const { bankName, bankCode, bankAcctNo } = user.account.withdrawal;

    if (!bankCode || !bankAcctNo) {
      return { error: true, message: "Please update your bank details first" };
    }

    try {
      // Deduct amount from user balance
      user.account.balance -= amount;
      await user.save();

      // Create transaction record as pending
      const Transaction = (await import("@/model/transactionModel")).default;
      const transaction = await Transaction.create({
        userId: user._id,
        type: "debit",
        status: "pending",
        amount: amount,
        disc: "Withdrawal request (Pending approval)",
        date: new Date(),
      });

      // Create withdrawal request
      const WithdrawalRequest = (await import("@/model/withdrawalRequestModel"))
        .default;
      await WithdrawalRequest.create({
        userId: user._id,
        username: user.username,
        amount: amount,
        bankName: bankName,
        bankCode: bankCode,
        accountNumber: bankAcctNo,
        accountName: `${user.firstname} ${user.lastname}`,
        status: "pending",
        transactionId: transaction._id,
        requestDate: new Date(),
      });

      // Create notification
      const Notification = (await import("@/model/notificationModel")).default;
      await Notification.create({
        username: user.username,
        message: `Withdrawal request of ₦${amount.toLocaleString()} submitted. Awaiting approval.`,
      });

      revalidatePath("/dashboard");
      return {
        error: false,
        message: `Withdrawal request of ₦${amount.toLocaleString()} submitted successfully. You will be notified once processed.`,
      };
    } catch (error) {
      // If any operation fails, try to restore the balance
      try {
        const userToRestore = await User.findById(userToken.id);
        if (userToRestore) {
          userToRestore.account.balance += amount;
          await userToRestore.save();
        }
      } catch (restoreError) {
        console.error("Failed to restore balance:", restoreError);
      }
      throw error;
    }
  } catch (error) {
    console.error("Withdrawal error:", error);
    return { error: true, message: "An error occurred during withdrawal" };
  }
}
