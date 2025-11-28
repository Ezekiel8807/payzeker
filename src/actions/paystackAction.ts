"use server";
import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { revalidatePath } from "next/cache";
import Recipient from "@/model/recipientModel";

export async function withdrawPaystackServer(amount: number) {
  try {
    //check user is login
    const userToken = await getToken();
    if (!userToken) redirect("/login");

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
      return { error: true, message: `Minimum withdrawal is ₦${minWithdrawal.toLocaleString()}` };
    }

    // Validate user details
    if (!user.firstname || !user.lastname) {
      return { error: true, message: "Please update your profile with your full name" };
    }

    //fetch/find user recipient_code from Recipient model
    const recipient = await Recipient.findOne({ userId: user._id });
    let recipientCode = recipient?.recipient_code;


    //create user recipient_code if not exists
    if (!recipientCode) {
      const { bankName, bankAcctNo } = user.account.withdrawal;

      if (!bankName || !bankAcctNo) {
        return { error: true, message: "Please update your bank details first" };
      }

      // Create recipient on Paystack
      const createRecipientRes = await fetch("/api/paystack/createRecipient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${user.firstname} ${user.lastname}`,
          account_number: bankAcctNo,
          bank_code: bankName, // This should be the bank code, not name
        }),
      });

      const recipientData = await createRecipientRes.json();

      if (!recipientData.status) {
        return { error: true, message: recipientData.message || "Failed to create recipient" };
      }

      recipientCode = recipientData.data.recipient_code;

      // Save recipient to database for future use
      await Recipient.create({
        userId: user._id,
        recipient_code: recipientCode,
        recipient_id: recipientData.data.id,
        name: recipientData.data.name,
        account_number: bankAcctNo,
        bank_code: bankName,
        bank_name: recipientData.data.details?.bank_name,
        type: recipientData.data.type,
        currency: recipientData.data.currency,
      });
    }

    // Process withdrawal
    const res = await fetch("/api/paystack/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amount,
        recipient_code: recipientCode,
      }),
    });

    const data = await res.json();

    if (data.status && data.data.status === "success") {
      // Deduct amount from user balance
      user.account.balance -= amount;
      user.account.withdrawal.allTimeWithdrawal += amount;
      await user.save();

      // Create transaction record
      const Transaction = (await import("@/model/transactionModel")).default;
      await Transaction.create({
        userId: user._id,
        type: "debit",
        status: "successful",
        amount: amount,
        disc: "Withdrawal via Paystack",
        date: new Date(),
      });

      // Create notification
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
