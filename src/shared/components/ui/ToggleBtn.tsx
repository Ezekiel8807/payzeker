"use client";

import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import Logout_btn from "@/shared/components/feedback/Logout_btn";

interface ToggleBtnProps {
  toggleData: {
    isLogin: boolean;
    isAdmin: boolean | null;
  };
}

export default function ToggleBtn({ toggleData }: ToggleBtnProps) {
  const pathname = usePathname();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => {
    setMenuIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setMenuIsOpen(false);
      }
    };
    if (menuIsOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuIsOpen]);

  useEffect(() => {
    setMenuIsOpen(false);
  }, [pathname]);

  const menuItems = [
    { label: "Home", href: "/", icon: "mdi:home-outline", show: !toggleData.isLogin },
    { label: "About", href: "/about", icon: "mdi:information-outline", show: !toggleData.isLogin },
    { label: "Contact", href: "/contact", icon: "mdi:email-outline", show: !toggleData.isLogin },
    { label: "Dashboard", href: "/dashboard", icon: "mdi:view-dashboard-outline", show: toggleData.isLogin },
    { label: "Account", href: "/account", icon: "mdi:account-outline", show: toggleData.isLogin },
    { label: "Profile", href: "/profile", icon: "mdi:account-circle-outline", show: toggleData.isLogin },
    { label: "Tasks", href: "/tasks", icon: "mdi:clipboard-text-outline", show: toggleData.isLogin },
    { label: "Lucky Spin", href: "/luckySpin", icon: "mdi:gamepad-variant", show: toggleData.isLogin && !toggleData.isAdmin },
    { label: "Request", href: "/requests", icon: "mdi:inbox-arrow-down-outline", show: toggleData.isLogin && toggleData.isAdmin },
    { label: "Withdrawals", href: "/withdrawals", icon: "mdi:cash-multiple", show: toggleData.isLogin && toggleData.isAdmin },
    { label: "Users", href: "/users", icon: "mdi:account-group-outline", show: toggleData.isLogin && toggleData.isAdmin },
    { label: "Plans", href: "/plans", icon: "mdi:calendar-multiselect-outline", show: toggleData.isLogin && toggleData.isAdmin },
    { label: "Transactions", href: "/transactions", icon: "mdi:cash-multiple", show: toggleData.isLogin },
    { label: "Leadership", href: "/leadership", icon: "mdi:crown-outline", show: toggleData.isLogin },
    { label: "Subscription", href: "/subscription", icon: "mdi:arrow-up-bold-circle-outline", show: toggleData.isLogin && !toggleData.isAdmin },
    { label: "Referrals", href: "/referrer", icon: "mdi:account-multiple-plus", show: toggleData.isLogin },
    { label: "Login", href: "/login", icon: "mdi:login", show: !toggleData.isLogin },
    { label: "Register", href: "/register", icon: "mdi:account-plus-outline", show: !toggleData.isLogin },
  ];

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-expanded={menuIsOpen}
        aria-label="Toggle navigation menu"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-ink-soft shadow-sm transition-colors hover:border-[var(--green)] hover:text-[var(--green-dark)] lg:hidden"
      >
        <Icon icon={menuIsOpen ? "mdi:close" : "mdi:menu"} width={24} height={24} />
      </button>

      <AnimatePresence>
        {menuIsOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuIsOpen(false)}
              className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              ref={menuRef}
              key="menu"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="fixed left-0 top-0 z-[60] flex h-dvh w-[290px] max-w-[85vw] flex-col bg-white shadow-modal"
            >
              <div className="bg-gradient-to-br from-[var(--green)] to-[#12805e] px-6 py-6 text-white">
                <h1 className="text-2xl font-black">Payzeker</h1>
                <p className="mt-1 text-xs font-medium text-white/80">Earn by completing tasks</p>
              </div>

              <nav className="slim-scroll flex-1 overflow-y-auto py-3">
                {menuItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    item.show && (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuIsOpen(false)}
                        className={`flex items-center gap-3 px-6 py-3 text-sm font-bold transition-colors ${
                          active
                            ? "border-r-4 border-[var(--green)] bg-[var(--green)]/10 text-[var(--green-dark)]"
                            : "text-ink-soft hover:bg-slate-50 hover:text-[var(--green-dark)]"
                        }`}
                      >
                        <Icon icon={item.icon} width="22" height="22" />
                        {item.label}
                      </Link>
                    )
                  );
                })}
              </nav>

              {toggleData.isLogin && (
                <div className="border-t border-slate-100 p-4">
                  <Logout_btn logoutBtnStyle="w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100" />
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
