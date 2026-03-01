"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function ReferralClient({
  referralCode,
  referralsCount,
  referralEarnings,
}: {
  referralCode: string;
  referralsCount: number;
  referralEarnings: number;
}) {
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    setReferralLink(`${window.location.origin}/register?ref=${referralCode}`);
  }, [referralCode]);

  const handleCopy = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 px-4 md:px-0 font-sans text-slate-800">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Invite & Earn <span className="text-[#29cd9c]">₦500</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Share Payzeker and earn instantly when they subscribe.
          </p>
        </div>

        <div className="bg-[#29cd9c]/10 text-[#29cd9c] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-[#29cd9c]/20">
          <Icon icon="solar:gift-bold" />
          ₦500 PER ACTIVE USER
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Earnings */}
        <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#29cd9c] to-[#1dbb8f] text-white shadow-xl shadow-[#29cd9c]/20 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-white/20 p-3 rounded-xl">
              <Icon icon="solar:wallet-money-bold" className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
              Total Earnings
            </span>
          </div>

          <div className="text-4xl font-black tracking-tight">
            ₦{referralEarnings.toLocaleString()}
          </div>

          <p className="text-xs mt-3 opacity-90">
            Referral commissions earned
          </p>

          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Referrals */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-[#29cd9c]/10 p-3 rounded-xl">
              <Icon icon="solar:users-group-rounded-bold" className="text-[#29cd9c] w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">
              Referrals
            </span>
          </div>

          <div className="text-4xl font-black text-slate-900">
            {referralsCount}
          </div>

          <p className="text-xs text-slate-500 mt-2">
            People joined with your link
          </p>
        </div>
      </div>

      {/* Referral Link Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">
          Your Referral Link
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={referralLink}
            readOnly
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#29cd9c]"
          />

          <button
            onClick={handleCopy}
            className={`px-8 py-4 rounded-2xl text-sm font-bold transition active:scale-95 ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-[#29cd9c] text-white hover:bg-[#22b387]"
            }`}
          >
            {copied ? "Copied ✓" : "Copy Link"}
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div>
        <h2 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "solar:share-linear",
              title: "Share",
              desc: "Send your link to friends and online communities.",
            },
            {
              icon: "solar:user-plus-linear",
              title: "They Subscribe",
              desc: "They register and subscribe to unlock tasks.",
            },
            {
              icon: "solar:wad-of-money-bold",
              title: "Earn ₦500",
              desc: "You earn instantly once they become active.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-md transition"
            >
              <div className="bg-[#29cd9c]/10 w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4">
                <Icon icon={step.icon} className="text-[#29cd9c] w-6 h-6" />
              </div>

              <h3 className="font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}