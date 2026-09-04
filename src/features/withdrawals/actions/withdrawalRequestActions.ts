"use server";
import { getToken } from "@/features/auth/actions/action";
import { redirect } from "next/navigation";
import { connectDB } from "@/shared/lib/mongodb";
import WithdrawalRequest from "@/features/withdrawals/models/withdrawalRequestModel";
import Transaction from "@/shared/models/transactionModel";
import Notification from "@/shared/models/notificationModel";
import User from "@/shared/models/userModel";
import { revalidatePath } from "next/cache";

export async function getAllWithdrawalRequests(status?: string) {
  try {
    const userToken = await getToken();
    if (!userToken || !userToken.isAdmin) return { error: true, message: "Unauthorized" };
    await connectDB();
    const query = status ? { status } : {};
    const requests = await WithdrawalRequest.find(query).sort({ requestDate: -1 }).lean();
    return { error: false, data: JSON.parse(JSON.stringify(requests)) };
  } catch { return { error: true, message: "Failed to fetch withdrawal requests" }; }
}

export async function getUserWithdrawalRequests() {
  try {
    const userToken = await getToken();
    if (!userToken) redirect("/login");
    await connectDB();
    const requests = await WithdrawalRequest.find({ userId: userToken.id }).sort({ requestDate: -1 }).limit(20).lean();
    return { error: false, data: JSON.parse(JSON.stringify(requests)) };
  } catch { return { error: true, message: "Failed to fetch your withdrawal requests" }; }
}

export async function approveWithdrawalRequest(requestId: string) {
  try {
    const userToken = await getToken();
    if (!userToken || !userToken.isAdmin) return { error: true, message: "Unauthorized" };
    await connectDB();
    const request = await WithdrawalRequest.findById(requestId);
    if (!request) return { error: true, message: "Request not found" };
    if (request.status !== "pending") return { error: true, message: "Request already processed" };

    request.status = "approved";
    request.processedDate = new Date();
    request.processedBy = userToken.username;
    await request.save();

    await Transaction.findByIdAndUpdate(request.transactionId, { status: "successful", disc: "Withdrawal approved by admin" });
    await User.findByIdAndUpdate(request.userId, { $inc: { "account.withdrawal.allTimeWithdrawal": request.amount } });
    await Notification.create({ username: request.username, message: `Your withdrawal request of ₦${request.amount.toLocaleString()} has been approved and processed.` });

    revalidatePath("/admin/withdrawals");
    return { error: false, message: "Withdrawal request approved successfully" };
  } catch { return { error: true, message: "Failed to approve withdrawal request" }; }
}

export async function rejectWithdrawalRequest(requestId: string, reason: string) {
  try {
    const userToken = await getToken();
    if (!userToken || !userToken.isAdmin) return { error: true, message: "Unauthorized" };
    await connectDB();
    const request = await WithdrawalRequest.findById(requestId);
    if (!request) return { error: true, message: "Request not found" };
    if (request.status !== "pending") return { error: true, message: "Request already processed" };

    request.status = "rejected";
    request.processedDate = new Date();
    request.processedBy = userToken.username;
    request.rejectionReason = reason;
    await request.save();

    await Transaction.findByIdAndUpdate(request.transactionId, { status: "failed", disc: `Withdrawal rejected: ${reason}` });
    await User.findByIdAndUpdate(request.userId, { $inc: { "account.balance": request.amount } });
    await Notification.create({ username: request.username, message: `Your withdrawal request of ₦${request.amount.toLocaleString()} was rejected. Reason: ${reason}. Amount refunded.` });

    revalidatePath("/admin/withdrawals");
    return { error: false, message: "Withdrawal request rejected and amount refunded" };
  } catch { return { error: true, message: "Failed to reject withdrawal request" }; }
}

export async function completeWithdrawalRequest(requestId: string, notes?: string) {
  try {
    const userToken = await getToken();
    if (!userToken || !userToken.isAdmin) return { error: true, message: "Unauthorized" };
    await connectDB();
    const request = await WithdrawalRequest.findById(requestId);
    if (!request) return { error: true, message: "Request not found" };
    if (request.status !== "approved") return { error: true, message: "Request must be approved first" };

    request.status = "completed";
    request.notes = notes || "";
    await request.save();

    await Notification.create({ username: request.username, message: `Your withdrawal of ₦${request.amount.toLocaleString()} has been completed and sent to your bank account.` });

    revalidatePath("/admin/withdrawals");
    return { error: false, message: "Withdrawal marked as completed" };
  } catch { return { error: true, message: "Failed to complete withdrawal request" }; }
}
