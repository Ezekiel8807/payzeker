"use server";
import User from "@/shared/models/userModel";
import { connectDB } from "@/shared/lib/mongodb";
import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import { revalidatePath } from "next/cache";
import { WITHDRAWAL_LIMITS } from "@/shared/constants";
import { isValidAmount, createErrorResponse } from "@/shared/lib/utils";

export async function createWithdrawalRequest(amount: number) {
  try {
    const userToken = await getToken();
    if (!userToken) redirect("/login");

    if (!isValidAmount(amount, WITHDRAWAL_LIMITS.MINIMUM, WITHDRAWAL_LIMITS.MAXIMUM)) {
      return createErrorResponse(`Amount must be between ₦${WITHDRAWAL_LIMITS.MINIMUM.toLocaleString()} and ₦${WITHDRAWAL_LIMITS.MAXIMUM.toLocaleString()}`);
    }

    await connectDB();

    const user = await User.findById(userToken.id);
    if (!user) return { error: true, message: "User not found" };

    const { balance, minWithdrawal } = user.account;
    if (amount > balance) return { error: true, message: "Insufficient balance" };
    if (amount < minWithdrawal) return { error: true, message: `Minimum withdrawal is ₦${minWithdrawal.toLocaleString()}` };
    if (!user.firstname || !user.lastname) return { error: true, message: "Please update your profile with your full name" };

    const { bankName, bankCode, bankAcctNo } = user.account.withdrawal;
    if (!bankCode || !bankAcctNo) return { error: true, message: "Please update your bank details first" };

    try {
      user.account.balance -= amount;
      await user.save();

      const Transaction = (await import("@/shared/models/transactionModel")).default;
      const transaction = await Transaction.create({
        userId: user._id, type: "debit", status: "pending", amount,
        disc: "Withdrawal request (Pending approval)", date: new Date(),
      });

      const WithdrawalRequest = (await import("@/features/withdrawals/models/withdrawalRequestModel")).default;
      await WithdrawalRequest.create({
        userId: user._id, username: user.username, amount, bankName, bankCode,
        accountNumber: bankAcctNo, accountName: `${user.firstname} ${user.lastname}`,
        status: "pending", transactionId: transaction._id, requestDate: new Date(),
      });

      const Notification = (await import("@/shared/models/notificationModel")).default;
      await Notification.create({
        username: user.username,
        message: `Withdrawal request of ₦${amount.toLocaleString()} submitted. Awaiting approval.`,
      });

      revalidatePath("/dashboard");
      return { error: false, message: `Withdrawal request of ₦${amount.toLocaleString()} submitted successfully.` };
    } catch (error) {
      try {
        const userToRestore = await User.findById(userToken.id);
        if (userToRestore) { userToRestore.account.balance += amount; await userToRestore.save(); }
      } catch (restoreError) { console.error("Failed to restore balance:", restoreError); }
      throw error;
    }
  } catch (error) {
    console.error("Withdrawal error:", error);
    return { error: true, message: "An error occurred during withdrawal" };
  }
}
