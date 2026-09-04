"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Logout_btn from "@/shared/components/feedback/Logout_btn";

interface SideNavProps {
  sideNavInfo: { username: string; isAdmin: boolean; isLogin: boolean; };
}

export default function SideNav({ sideNavInfo }: SideNavProps) {
  const pathname = usePathname();
  const deskLinks = [
    { label: "Dashboard", href: "/dashboard", show: sideNavInfo.isLogin, icon: "mdi:view-dashboard" },
    { label: "Account", href: "/account", show: sideNavInfo.isLogin, icon: "mdi:account-circle" },
    { label: "Profile", href: "/profile", show: sideNavInfo.isLogin, icon: "mdi:account" },
    { label: "Tasks", href: "/tasks", show: sideNavInfo.isLogin, icon: "mdi:clipboard-list" },
    { label: "Lucky Spin", href: "/luckySpin", show: sideNavInfo.isLogin, icon: "mdi:gamepad-variant" },
    { label: "Request", href: "/requests", show: sideNavInfo.isLogin && sideNavInfo.isAdmin, icon: "mdi:inbox" },
    { label: "Withdrawals", href: "/withdrawals", show: sideNavInfo.isLogin && sideNavInfo.isAdmin, icon: "mdi:cash-multiple" },
    { label: "Users", href: "/users", show: sideNavInfo.isLogin && sideNavInfo.isAdmin, icon: "mdi:account-group" },
    { label: "Plans", href: "/plans", show: sideNavInfo.isLogin && sideNavInfo.isAdmin, icon: "mdi:diamond-stone" },
    { label: "Leadership", href: "/leadership", show: sideNavInfo.isLogin, icon: "mdi:crown" },
    { label: "Transactions", href: "/transactions", show: sideNavInfo.isLogin, icon: "mdi:wallet" },
    { label: "Subscription", href: "/subscription", show: sideNavInfo.isLogin, icon: "mdi:arrow-up-bold-circle" },
    { label: "Referrals", href: "/referrer", show: sideNavInfo.isLogin, icon: "mdi:account-multiple-plus" },
  ];

  return (
    <aside className="flex h-full flex-col rounded-card border border-slate-100 bg-white p-4 shadow-card">
      <div className="mb-5 overflow-hidden rounded-xl bg-gradient-to-br from-[var(--green)] to-[#12805e] p-5 text-center text-white shadow-soft">
        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 ring-4 ring-white/15">
          <Image src="/icons/user-139.svg" width={50} height={50} alt="Side nav profile photo" />
        </div>
        <h1 className="truncate text-xl font-black">{sideNavInfo.username}</h1>
      </div>
      <nav className="slim-scroll flex-1 space-y-1 overflow-y-auto pr-1">
        {deskLinks.map(
          (item) =>
            item.show && (
              <Link
                key={item.href}
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-[var(--green)]/10 text-[var(--green-dark)]"
                    : "text-ink-soft hover:bg-[var(--gray-01)] hover:text-[var(--green-dark)]"
                }`}
              >
                <Icon icon={item.icon} width={20} className="shrink-0" />
                {item.label}
              </Link>
            ),
        )}
        <Logout_btn logoutBtnStyle="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50" />
      </nav>
    </aside>
  );
}
