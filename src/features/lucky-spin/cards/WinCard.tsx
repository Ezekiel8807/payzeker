import React from "react";

export default function WinCard() {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="rounded-card border border-slate-100 bg-white shadow-modal p-8 sm:p-10 text-center max-w-sm w-full">
        <div className="p-5 bg-[var(--green)] rounded-2xl">
          {/* Header */}
          <h2 className="text-3xl font-bold mb-1 text-white">🎉 Congratulations!</h2>
          <p className="mb-6 text-sm text-white">You’ve won this round. Well done!</p>
          {/* Body */}
          <div className="rounded-xl p-5 text-center border border-[var(--green)]/20 bg-[var(--green)]/10 mb-6">
            <p className={`text-xl font-medium `}>🏅Big win</p>
            <p className={`text-2xl font-black mt-2`}>
              💰 ₦{"500".toLocaleString()}
            </p>
          </div>
          {/* Footer */}
          <button className="w-full mt-4 btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
