// import { use } from "react";
import { getHeaderData } from "@/actions/getHeaderData";

//components
import Link from "next/link";
import Image from "next/image";
import NavLink from "../NavLink";
import ToggleBtn from "../ToggleBtn";
import Login_out from "../Login_out";
import NavProfile from "../NavProfile";
import NotificationCom from "../NotificationCom";

export default async function Header() {
  const { user, notifications } = await getHeaderData();
  const isLogin = !!user;
  const isAdmin = user?.isAdmin;

  return (
    <header className="px-5 sm:px-10 md:px-20">
      <div className="flex flex-row items-center justify-between">
        {/* Logo */}
        <Link href={isLogin ? "/dashboard" : "/"}>
          <Image
            src="/img/logo.png"
            width={500}
            height={500}
            alt="payzeker logo"
            className="w-[110px] sm:w-[120px] md:w-[200px]"
          />
        </Link>

        {/* Navigation Links */}
        <NavLink />

        {/* User Authentication */}
        <div className="w-[100px] md:w-[200px] flex items-center justify-end">
          <div className="flex flex-row-reverse md:flex-row items-center">
            {!isLogin ? (
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
