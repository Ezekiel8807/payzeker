import { use } from "react";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";

// compponents\
import SideNav from "@/components/SideNav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = use(getToken());
  if (!user) return redirect("/login");

  const { username, isAdmin } = user;
  const isLogin = !!user;
  //
  return (
    <div className="mx-auto">
      <div className="flex">
        <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
          <SideNav sideNavInfo={{ username, isAdmin, isLogin }} />
        </div>
        <div className="w-[100%] px-5 lg:w-[70%]">{children}</div>
      </div>
    </div>
  );
}
