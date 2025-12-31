"use client";

import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logout_btn from "./Logout_btn";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

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
  const buttonRef = useRef<HTMLImageElement>(null);

  const toggleMenu = useCallback(() => {
    setMenuIsOpen((prev) => !prev);
  }, []);

  // Close menu when clicking outside (but not on the button)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Don't close if clicking the menu itself or the toggle button
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setMenuIsOpen(false);
      }
    };

    if (menuIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuIsOpen]);

  // Define menu icons and routes
  const menuItems = [
    {
      label: "Home",
      href: "/",
      icon: "mdi:home-outline",
      show: !toggleData.isLogin,
    },
    {
      label: "About",
      href: "/about",
      icon: "mdi:information-outline",
      show: !toggleData.isLogin,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: "mdi:email-outline",
      show: !toggleData.isLogin,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: "mdi:view-dashboard-outline",
      show: toggleData.isLogin,
    },
    {
      label: "Account",
      href: "/account",
      icon: "mdi:account-outline",
      show: toggleData.isLogin,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: "mdi:account-circle-outline",
      show: toggleData.isLogin,
    },
    {
      label: "Tasks",
      href: "/tasks",
      icon: "mdi:clipboard-text-outline",
      show: toggleData.isLogin,
    },
    {
      label: "Lucky Spin",
      href: "/luckySpin",
      icon: "mdi:gamepad-variant",
      show: toggleData.isLogin && !toggleData.isAdmin,
    },
    {
      label: "Request",
      href: "/requests",
      icon: "mdi:inbox-arrow-down-outline",
      show: toggleData.isLogin && toggleData.isAdmin,
    },
    {
      label: "Withdrawals",
      href: "/withdrawals",
      icon: "mdi:cash-multiple",
      show: toggleData.isLogin && toggleData.isAdmin,
    },
    {
      label: "Users",
      href: "/users",
      icon: "mdi:account-group-outline",
      show: toggleData.isLogin && toggleData.isAdmin,
    },
    {
      label: "Plans",
      href: "/plans",
      icon: "mdi:calendar-multiselect-outline",
      show: toggleData.isLogin && toggleData.isAdmin,
    },
    {
      label: "Transactions",
      href: "/transactions",
      icon: "mdi:cash-multiple",
      show: toggleData.isLogin,
    },
    {
      label: "Leadership",
      href: "/leadership",
      icon: "mdi:crown-outline",
      show: toggleData.isLogin,
    },
    {
      label: "Subscription",
      href: "/subscription",
      icon: "mdi:arrow-up-bold-circle-outline",
      show: toggleData.isLogin && !toggleData.isAdmin,
    },
    {
      label: "Login",
      href: "/login",
      icon: "mdi:login",
      show: !toggleData.isLogin,
    },
    {
      label: "Register",
      href: "/register",
      icon: "mdi:account-plus-outline",
      show: !toggleData.isLogin,
    },
  ];

  return (
    <>
      {/* Toggle Button */}
      <Image
        ref={buttonRef}
        onClick={toggleMenu}
        aria-expanded={menuIsOpen}
        aria-label="Toggle navigation menu"
        src="/icons/menu.png"
        alt="menu icon"
        width={25}
        height={25}
        style={{ width: "auto", height: "auto" }}
        className="lg:hidden cursor-pointer"
      />

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {menuIsOpen && (
          <motion.div
            ref={menuRef}
            key="menu"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 h-screen z-[60] w-64 bg-white shadow-sm border-r-2"
          >
            <nav className="relative h-screen text-center overflow-y-auto">
              <div className="border-b-2 mb-3">
                <Image
                  src="/img/payzekel-logo-icon1.png"
                  width={500}
                  height={500}
                  alt="logo-2"
                  className="object-cover bg-no-repeat w-[100px] h-[100px] mx-auto pt-10 pb-2"
                />
                <h1 className="text-3xl text-center font-black mb-3">
                  Payzeker
                </h1>
              </div>

              {/* Menu Links */}
              <div className="flex flex-col items-start">
                {menuItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    item.show && (
                      <motion.div
                        key={item.label}
                        whileHover={{ x: 10, scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-full"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMenuIsOpen(false)}
                          className={`w-full flex items-center gap-3 px-6 py-3 ${active
                            ? "bg-[#eefdfa] text-[var(--green)] border-r-4 border-[var(--green)] font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          <Icon icon={item.icon} width="22" height="22" />
                          {item.label}
                        </Link>
                      </motion.div>
                    )
                  );
                })}
              </div>

              <div className="w-full absolute left-0 bottom-0 border-t-2">
                {/* hover:bg-[var(--green)] */}
                {toggleData.isLogin && (
                  <Logout_btn logoutBtnStyle="w-full flex items-center justify-center gap-3 p-3 block text-red-500 hover:font-black" />
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
