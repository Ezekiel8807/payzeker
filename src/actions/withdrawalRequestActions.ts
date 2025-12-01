"use server";
import { getToken } from "./action";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import WithdrawalRequest from "@/model/withdrawalRequestModel";
import Transaction from "@/model/transactionModel";
import Notification from "@/model/notificationModel";
import User from "@/model/userModel";
import { revalidatePath } from "next/cache";

// Get all withdrawal requests (Admin only)
export async function getAllWithdrawalRequests(status?: string) {
  try {
    const userToken = await getToken();
    if (!userToken || !userToken.isAdmin) {
      return { error: true, message: "Unauthorized" };
    }

    await connectDB();

    const query = status ? { status } : {};
    const requests = await WithdrawalRequest.find(query)
      .sort({ requestDate: -1 })
      .lean();

    return { error: false, data: JSON.parse(JSON.stringify(requests)) };
  } catch {
    return { error: true, message: "Failed to fetch withdrawal requests" };
  }
}

// Get user's withdrawal requests
export async function getUserWithdrawalRequests() {
  try {
    const userToken = await getToken();
    if (!userToken) redirect("/login");

    await connectDB();

    const requests = await WithdrawalRequest.find({ userId: userToken.id })
      .sort({ requestDate: -1 })
      .limit(20)
      .lean();

    return { error: false, data: JSON.parse(JSON.stringify(requests)) };
  } catch {
    return { error: true, message: "Failed to fetch your withdrawal requests" };
  }
}

// Approve withdrawal request (Admin only)
export async function approveWithdrawalRequest(requestId: string) {
  try {
    const userToken = await getToken();
    if (!userToken || !userToken.isAdmin) {
      return { error: true, message: "Unauthorized" };
    }

    await connectDB();

    const request = await WithdrawalRequest.findById(requestId);
    if (!request) {
      return { error: true, message: "Request not found" };
    }

    if (request.status !== "pending") {
      return { error: true, message: "Request already processed" };
    }

    // Update request status
    request.status = "approved";
    request.processedDate = new Date();
    request.processedBy = userToken.username;
    await request.save();

    // Update transaction status
    await Transaction.findByIdAndUpdate(request.transactionId, {
      status: "successful",
      disc: "Withdrawal approved by admin",
    });

    // Update user's allTimeWithdrawal
    await User.findByIdAndUpdate(request.userId, {
      $inc: { "account.withdrawal.allTimeWithdrawal": request.amount },
    });

    // Notify user
    await Notification.create({
      username: request.username,
      message: `Your withdrawal request of ₦${request.amount.toLocaleString()} has been approved and processed.`,
    });

    revalidatePath("/admin/withdrawals");
    return { error: false, message: "Withdrawal request approved successfully" };
  } catch {
    return { error: true, message: "Failed to approve withdrawal request" };
  }
}

// Reject withdrawal request (Admin only)
export async function rejectWithdrawalRequest(requestId: string, reason: string) {
  try {
    const userToken = await getToken();
    if (!userToken || !userToken.isAdmin) {
      return { error: true, message: "Unauthorized" };
    }

    await connectDB();

    const request = await WithdrawalRequest.findById(requestId);
    if (!request) {
      return { error: true, message: "Request not found" };
    }

    if (request.status !== "pending") {
      return { error: true, message: "Request already processed" };
    }

    // Update request status
    request.status = "rejected";
    request.processedDate = new Date();
    request.processedBy = userToken.username;
    request.rejectionReason = reason;
    await request.save();

    // Update transaction status
    await Transaction.findByIdAndUpdate(request.transactionId, {
      status: "failed",
      disc: `Withdrawal rejected: ${reason}`,
    });

    // Refund user balance
    await User.findByIdAndUpdate(request.userId, {
      $inc: { "account.balance": request.amount },
    });

    // Notify user
    await Notification.create({
      username: request.username,
      message: `Your withdrawal request of ₦${request.amount.toLocaleString()} was rejected. Reason: ${reason}. Amount refunded to your balance.`,
    });

    revalidatePath("/admin/withdrawals");
    return { error: false, message: "Withdrawal request rejected and amount refunded" };
  } catch {
    return { error: true, message: "Failed to reject withdrawal request" };
  }
}

// Mark as completed (Admin only) - After manual bank transfer
export async function completeWithdrawalRequest(requestId: string, notes?: string) {
  try {
    const userToken = await getToken();
    if (!userToken || !userToken.isAdmin) {
      return { error: true, message: "Unauthorized" };
    }

    await connectDB();

    const request = await WithdrawalRequest.findById(requestId);
    if (!request) {
      return { error: true, message: "Request not found" };
    }

    if (request.status !== "approved") {
      return { error: true, message: "Request must be approved first" };
    }

    // Update request status
    request.status = "completed";
    request.notes = notes || "";
    await request.save();

    // Notify user
    await Notification.create({
      username: request.username,
      message: `Your withdrawal of ₦${request.amount.toLocaleString()} has been completed and sent to your bank account.`,
    });

    revalidatePath("/admin/withdrawals");
    return { error: false, message: "Withdrawal marked as completed" };
  } catch {
    return { error: true, message: "Failed to complete withdrawal request" };
  }
}
