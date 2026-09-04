"use client";
import Image from "next/image";

type NavProfileProbs = { userName: string; userRank: number | null; };

export default function NavProfile({ userName, userRank }: NavProfileProbs) {
  return (
    <div className="flex items-center gap-2 rounded-pill border border-slate-100 bg-white py-1 pl-1 pr-3 shadow-sm transition-colors hover:border-[var(--green)]">
      <Image
        src="/icons/user-139.svg"
        width={32}
        height={32}
        className="rounded-full"
        alt="nav profile photo link"
      />
      <div className="leading-tight">
        <h3 className="text-[13px] font-black text-ink">{userName}</h3>
        <span className="text-[10px] font-bold text-ink-muted">Rank: {userRank ?? 0}</span>
      </div>
    </div>
  );
}
