"use client";
import Image from "next/image";
import Link from "next/link";

//components
import NavLink from "./NavLink";
import Login_out from "./Login_out";
import NavProfile from "./NavProfile";
import NotificationCom from "./NotificationCom";
import ToggleBtn from "./ToggleBtn";
// import { useEffect, useState } from "react";

export default function HeaderCom({
  user,
  notifications,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notifications: any;
}) {
  const isLogin = !user ? false : true;
  const isAdmin = !user ? false : user.isAdmin;

  return (
    <header className="h-[10vh] md:h-[15vh] flex items-center justify-center">
      <div className="w-[90%] md:w-[80%] flex flex-row items-center justify-between">
        {/* Logo */}
        <Link className="" href={user ? "/dashboard" : "/"}>
          <Image
            src="/img/logo.png"
            width={150}
            height={200}
            alt="payzeker logo"
          />
          {/* <h1 className="font-black text-[25px]">
              <span className="text-[var(--green)]">Pay</span>zeker
            </h1> */}
        </Link>

        {/* /*  Navigation Links  */}
        <NavLink />

        {/* User Authentication */}
        <div className="w-[100px] md:w-[200px]  flex items-center justify-end">
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
