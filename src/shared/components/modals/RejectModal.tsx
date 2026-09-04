"use client";
import { useState } from "react";

type RejectModalProps = {
  setIsOpen: (value: boolean) => void;
  onReject: (reason: string) => void;
};

export default function RejectModal({ setIsOpen, onReject }: RejectModalProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) { alert("Please provide a reason for rejection"); return; }
    setIsSubmitting(true);
    await onReject(reason);
    setIsSubmitting(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Reject Withdrawal Request</h2>
        <p className="text-sm text-gray-600 mb-4">Please provide a reason for rejecting this withdrawal request. The user will be notified and their balance will be refunded.</p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter rejection reason..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={isSubmitting}
        />
        <div className="flex gap-3">
          <button onClick={() => setIsOpen(false)} disabled={isSubmitting} className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50">Cancel</button>
          <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            {isSubmitting ? "Rejecting..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}
