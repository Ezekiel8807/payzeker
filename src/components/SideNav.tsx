"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react"; // Iconify icons "lucide-react";
import Logout_btn from "./Logout_btn";

// TYPES
interface SideNavProps {
  sideNavInfo: {
    username: string;
    isAdmin: boolean;
    isLogin: boolean;
  };
}

export default function SideNav({ sideNavInfo }: SideNavProps) {
  const deskLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      show: sideNavInfo.isLogin,
      icon: "mdi:view-dashboard",
    },
    {
      label: "Account",
      href: "/account",
      show: sideNavInfo.isLogin,
      icon: "mdi:account-circle",
    },
    {
      label: "Profile",
      href: "/profile",
      show: sideNavInfo.isLogin,
      icon: "mdi:account",
    },
    {
      label: "Tasks",
      href: "/tasks",
      show: sideNavInfo.isLogin,
      icon: "mdi:clipboard-list",
    },
    {
      label: "Lucky Spin",
      href: "/luckySpin",
      show: sideNavInfo.isLogin,
      icon: "mdi:gamepad-variant",
    },
    {
      label: "Request",
      href: "/requests",
      show: sideNavInfo.isLogin && sideNavInfo.isAdmin,
      icon: "mdi:inbox",
    },
    {
      label: "Withdrawals",
      href: "/withdrawals",
      show: sideNavInfo.isLogin && sideNavInfo.isAdmin,
      icon: "mdi:cash-multiple",
    },
    {
      label: "Users",
      href: "/users",
      show: sideNavInfo.isLogin && sideNavInfo.isAdmin,
      icon: "mdi:account-group",
    },
    {
      label: "Plans",
      href: "/plans",
      show: sideNavInfo.isLogin && sideNavInfo.isAdmin,
      icon: "mdi:diamond-stone",
    },
    {
      label: "Leadership",
      href: "/leadership",
      show: sideNavInfo.isLogin,
      icon: "mdi:crown",
    },
    {
      label: "Transactions",
      href: "/transactions",
      show: sideNavInfo.isLogin,
      icon: "mdi:wallet",
    },
    {
      label: "Subscription",
      href: "/subscription",
      show: sideNavInfo.isLogin,
      icon: "mdi:arrow-up-bold-circle",
    },
    {
      label: "Referrals",
      href: "/referrer",
      show: sideNavInfo.isLogin,
      icon: "mdi:account-multiple-plus",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[250px] bg-[var(--green)] p-5 my-5 md:my-10 rounded mx-auto shadow-md"
    >
      <div className="w-[100px] h-[100px] bg-[var(--blue-dark)] shadow-md rounded-full m-auto flex items-center justify-center">
        <Image
          src="/icons/user-139.svg"
          width={90}
          height={90}
          alt="Side nav profile photo"
        />
      </div>

      <h1 className="font-black text-center text-white text-[26px] mt-3">
        {sideNavInfo.username}
      </h1>

      <nav className="h-[300px] overflow-y-scroll  mt-4 space-y-1">
        {deskLinks.map(
          (item) =>
            item.show && (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.03, x: 5 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Link
                  id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  href={item.href}
                  className="flex items-center gap-3 font-bold p-3 rounded hover:bg-[var(--blue-dark)] hover:text-white transition-all duration-200"
                >
                  <Icon icon={item.icon} width={20} />
                  {item.label}
                </Link>
              </motion.div>
            ),
        )}

        <Logout_btn logoutBtnStyle="flex items-center gap-3 font-bold block p-3 hover:text-[var(--white)]" />
      </nav>
    </motion.div>
  );
}
