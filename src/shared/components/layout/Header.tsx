import { getHeaderData } from "@/features/dashboard/actions/getHeaderData";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import ToggleBtn from "@/shared/components/ui/ToggleBtn";
import Login_out from "@/shared/components/feedback/Login_out";
import NavProfile from "./NavProfile";
import NotificationPanel from "@/features/notifications/components/NotificationPanel";

export default async function Header() {
  const { user, notifications } = await getHeaderData();
  const isLogin = !!user;
  const isAdmin = user?.isAdmin;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-md shadow-sm">
      <div className="page-container flex h-[4.5rem] items-center justify-between gap-3 py-3">
        <Link href={isLogin ? "/dashboard" : "/"} className="shrink-0">
          <Image
            src="/img/logo.png"
            width={120}
            height={200}
            priority
            alt="payzeker logo"
            style={{ width: "auto", height: "auto" }}
            className="h-8 w-auto sm:h-10 md:h-12"
          />
        </Link>

        <NavLink />

        <div className="flex items-center justify-end gap-2 sm:gap-4">
          {!isLogin ? (
            <Login_out />
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <NotificationPanel initialNotifications={notifications} />
              <Link href="/profile" aria-label="View profile" className="hidden sm:block">
                <NavProfile userName={user.username} userRank={user.rank} />
              </Link>
            </div>
          )}
          <ToggleBtn toggleData={{ isLogin, isAdmin }} />
        </div>
      </div>
    </header>
  );
}
