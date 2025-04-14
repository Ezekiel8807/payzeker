"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import NavLink from "./NavLink";
import ToggleBtn from "./ToggleBtn";
import Login_out from "./Login_out";
import NavProfile from "./NavProfile";
import NotificationCom from "./NotificationCom";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notifications: any[];
}

export default function HeaderClient({ user, notifications }: Props) {
  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.refresh(); // Refresh the server component to refetch new session data
  }, [router]);

  useEffect(() => {
    window.addEventListener("login-success", handleLogin);

    return () => {
      window.removeEventListener("login-success", handleLogin);
    };
  }, [handleLogin]);

  const isLogin = !!user;
  const isAdmin = user?.isAdmin || false;

  return (
    <header className="h-[10vh] md:h-[15vh] flex items-center justify-center">
      <div className="w-[90%] md:w-[80%] flex flex-row items-center justify-between">
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"}>
          <Image
            src="/img/logo.png"
            width={150}
            height={200}
            alt="payzeker logo"
          />
        </Link>

        {/* Navigation Links */}
        <NavLink />

        {/* User Authentication */}
        <div className="w-[100px] md:w-[200px] flex items-center justify-end">
          <div className="flex flex-row-reverse md:flex-row items-center">
            {!user ? (
              <Login_out />
            ) : (
              <>
                <NotificationCom notis={notifications} />
                <Link href="/profile">
                  <NavProfile userName={user.username} userRank={user.rank} />
                </Link>
              </>
            )}
          </div>

          {/* Toggle Button */}
          <ToggleBtn toggleData={{ isLogin, isAdmin }} />
        </div>
      </div>
    </header>
  );
}
