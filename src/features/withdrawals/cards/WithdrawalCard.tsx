"use client";
import { useState } from "react";
import {
  approveWithdrawalRequest,
  rejectWithdrawalRequest,
} from "@/features/withdrawals/actions/withdrawalRequestActions";

//components
import CardActionBtn from "@/shared/components/ui/CardActionBtn";
import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";
import StatusBadge from "@/shared/components/ui/StatusBadge";
import InfoRow from "@/shared/components/ui/InfoRow";
import WarningModal from "@/shared/components/modals/WarningModal";
import SuccessModal from "@/shared/components/modals/SuccessModal";
import ErrorModal from "@/shared/components/modals/ErrorModal";
import RejectModal from "@/shared/components/modals/RejectModal";

//hooks
import useFormState from "@/shared/hooks/useFormState";

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
  const { isSuc, setIssuc, isErr, setIserr, errMsg, setErrmsg, sucMsg, setSucmsg } = useFormState();
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
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
      setErrmsg(response.message);
      setIsApproving(false);
      setIserr(true);
      return;
    }

    setSucmsg(response.message);
    setIssuc(true);
    setIsApproving(false);
  }

  async function rejectWithdrawal(reason: string) {
    setIsRejecting(true);
    const response = await rejectWithdrawalRequest(_id, reason);

    if (response.error) {
      setErrmsg(response.message);
      setIsRejecting(false);
      setIserr(true);
      return;
    }

    setSucmsg(response.message);
    setIsRejecting(false);
    setIssuc(true);
  }

  function showApproveWarning() {
    setIsApproveWarning(true);
  }

  function showRejectModal() {
    setIsRejectModal(true);
  }

  return (
    <>
      <div className="card p-4">
        <div className="flex justify-between items-start mb-3">
          <h2 className="font-black text-lg">Withdrawal</h2>
          <StatusBadge status={status} />
        </div>

        <div className="space-y-2">
          <InfoRow label="User">@{username}</InfoRow>

          <InfoRow label="Amount">
            <span className="font-bold text-lg text-[var(--green-dark)]">
              <CurrencyDisplay amount={amount} />
            </span>
          </InfoRow>

          <div className="border-t border-slate-200 pt-2 mt-2">
            <InfoRow label="Name" className="mt-1">{accountName}</InfoRow>
            <InfoRow label="Bank" className="mt-1">{bankName}</InfoRow>
            <InfoRow label="Account" className="mt-1">
              <span className="font-mono">{accountNumber}</span>
            </InfoRow>
          </div>

          <div className="border-t border-slate-200 pt-2 mt-2">
            <InfoRow label="Requested">
              <span className="text-xs">{formattedDate}</span>
            </InfoRow>

            {processedDate && (
              <InfoRow label="Processed" className="mt-1">
                <span className="text-xs">
                  {new Date(processedDate).toLocaleDateString("en-NG", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </InfoRow>
            )}

            {processedBy && (
              <InfoRow label="By" className="mt-1">
                <span className="text-xs">@{processedBy}</span>
              </InfoRow>
            )}

            {rejectionReason && (
              <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-xs text-red-700">
                  <span className="font-semibold">Reason:</span>{" "}
                  {rejectionReason}
                </p>
              </div>
            )}
          </div>

          {status === "pending" && (
            <>
              <p className="mt-4 p-2 text-xs text-center bg-slate-50 text-ink-soft rounded-lg">
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
          setIssuc={setIssuc}
          sucMsg={sucMsg}
          direction="/withdrawals"
        />
      )}

      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
