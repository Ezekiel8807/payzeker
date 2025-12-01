"use client";
import { useState } from "react";
import {
  approveWithdrawalRequest,
  rejectWithdrawalRequest,
} from "@/actions/withdrawalRequestActions";

//components
import CardActionBtn from "../CardActionBtn";
import WarningModal from "../modal/WarningModal";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";
import RejectModal from "../modal/RejectModal";

type WithdrawalCardProps = {
  withdrawalInfo: {
    _id: string;
    userId: string;
    username: string;
    amount: number;
    bankName: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
    status: string;
    requestDate: string;
    processedDate?: string;
    processedBy?: string;
    rejectionReason?: string;
  };
};

export default function WithdrawalCard({ withdrawalInfo }: WithdrawalCardProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isSuc, setIsSuc] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [sucMsg, setSucMsg] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isApproveWarning, setIsApproveWarning] = useState(false);
  const [isRejectModal, setIsRejectModal] = useState(false);

  const {
    _id,
    username,
    amount,
    bankName,
    accountNumber,
    accountName,
    status,
    requestDate,
    processedDate,
    processedBy,
    rejectionReason,
  } = withdrawalInfo;

  const formattedDate = new Date(requestDate).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  async function approveWithdrawal() {
    setIsApproving(true);
    const response = await approveWithdrawalRequest(_id);

    if (response.error) {
      setErrMsg(response.message);
      setIsApproving(false);
      setIsErr(true);
      return;
    }

    setSucMsg(response.message);
    setIsSuc(true);
    setIsApproving(false);
  }

  async function rejectWithdrawal(reason: string) {
    setIsRejecting(true);
    const response = await rejectWithdrawalRequest(_id, reason);

    if (response.error) {
      setErrMsg(response.message);
      setIsRejecting(false);
      setIsErr(true);
      return;
    }

    setSucMsg(response.message);
    setIsRejecting(false);
    setIsSuc(true);
  }

  function showApproveWarning() {
    setIsApproveWarning(true);
  }

  function showRejectModal() {
    setIsRejectModal(true);
  }

  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="bg-[var(--gray-10)] p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-3">
          <h2 className="font-black text-lg">Withdrawal</h2>
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor()}`}
          >
            {status.toUpperCase()}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">User:</span>
            <span className="text-right font-medium">@{username}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Amount:</span>
            <span className="text-right font-bold text-lg text-green-600">
              {amount.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Name:</span>
              <span className="text-right text-sm">{accountName}</span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-gray-600">Bank:</span>
              <span className="text-right text-sm">{bankName}</span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-gray-600">Account:</span>
              <span className="text-right text-sm font-mono">
                {accountNumber}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Requested:</span>
              <span className="text-right text-xs">{formattedDate}</span>
            </div>

            {processedDate && (
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-600">Processed:</span>
                <span className="text-right text-xs">
                  {new Date(processedDate).toLocaleDateString("en-NG", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}

            {processedBy && (
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-600">By:</span>
                <span className="text-right text-xs">@{processedBy}</span>
              </div>
            )}

            {rejectionReason && (
              <div className="mt-2 p-2 bg-red-50 rounded">
                <p className="text-xs text-red-700">
                  <span className="font-semibold">Reason:</span>{" "}
                  {rejectionReason}
                </p>
              </div>
            )}
          </div>

          {status === "pending" && (
            <>
              <p className="mt-4 p-2 text-xs text-center bg-[var(--gray-05)] rounded">
                Verify bank details before approving payment.
              </p>

              <CardActionBtn
                isCon={isApproving}
                isRej={isRejecting}
                rejectFunc={showRejectModal}
                confirmFunc={showApproveWarning}
              />
            </>
          )}
        </div>
      </div>

      {isApproveWarning && (
        <WarningModal
          setIswarning={setIsApproveWarning}
          warningMsg="Are you sure you want to approve this withdrawal? This action cannot be undone!"
          action={approveWithdrawal}
        />
      )}

      {isRejectModal && (
        <RejectModal
          setIsOpen={setIsRejectModal}
          onReject={rejectWithdrawal}
        />
      )}

      {isSuc && (
        <SuccessModal
          setIssuc={setIsSuc}
          sucMsg={sucMsg}
          direction="/withdrawals"
        />
      )}

      {isErr && <ErrorModal setIserr={setIsErr} errMsg={errMsg} />}
    </>
  );
}
