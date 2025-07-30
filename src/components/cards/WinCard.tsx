import React from "react";

export default function WinCard() {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#e6fff7] shadow-xl p-10 text-center max-w-sm w-full">
        <div className="p-5 bg-[var(--green)] rounded-2xl">
          {/* Header */}
          <h2 className="text-3xl font-bold mb-1">🎉 Congratulations!</h2>
          <p className="mb-6 text-sm">You’ve won this round. Well done!</p>
          {/* Body */}
          <div className="rounded-xl p-5 text-center border bg-[#e6fff7] mb-6">
            <p className={`text-xl font-medium `}>🏅Big win</p>
            <p className={`text-2xl font-black mt-2`}>
              💰 ₦{"500".toLocaleString()}
            </p>
          </div>
          {/* Footer */}
          <button className="w-full mt-4 py-2 rounded-full bg-gradient-to-r from-[#29cd9c] to-[#26b99a] text-white font-semibold hover:opacity-90 transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
