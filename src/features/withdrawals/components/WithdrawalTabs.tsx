"use client";
import Link from "next/link";

type WithdrawalTabsProps = {
  currentStatus: string;
};

export default function WithdrawalTabs({ currentStatus }: WithdrawalTabsProps) {
  const tabs = [
    { label: "Pending", value: "pending", count: "?" },
    { label: "Approved", value: "approved", count: "?" },
    { label: "Rejected", value: "rejected", count: "?" },
    { label: "Completed", value: "completed", count: "?" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-4 border-b border-slate-200">
      {tabs.map((tab) => (
        <Link
          key={tab.value}
          href={`/withdrawals?status=${tab.value}`}
          className={`px-4 py-2 rounded-t-lg whitespace-nowrap transition-colors ${
            currentStatus === tab.value
              ? "bg-[var(--green)] text-white font-semibold"
              : "bg-slate-50 text-ink-soft hover:bg-slate-100"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
