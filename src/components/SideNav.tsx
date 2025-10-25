import Link from "next/link";
import Image from "next/image";

// components
import Logout_btn from "./Logout_btn";

type SideNavProbs = {
  sideNavInfo: {
    username: string;
    isAdmin: boolean;
    isLogin: boolean;
  };
};
export default function SideNav({ sideNavInfo }: SideNavProbs) {
  const deskLinks = [
    { label: "Dashboard", href: "/dashboard", show: sideNavInfo.isLogin },
    { label: "Account", href: "/account", show: sideNavInfo.isLogin },
    { label: "Profile", href: "/profile", show: sideNavInfo.isLogin },
    { label: "Tasks", href: "/tasks", show: sideNavInfo.isLogin },
    {
      label: "Request",
      href: "/requests",
      show: sideNavInfo.isLogin && sideNavInfo.isAdmin,
    },
    {
      label: "Users",
      href: "/users",
      show: sideNavInfo.isLogin && sideNavInfo.isAdmin,
    },

    {
      label: "Plans",
      href: "/plans",
      show: sideNavInfo.isLogin && sideNavInfo.isAdmin,
    },

    { label: "Leadership", href: "/leadership", show: sideNavInfo.isLogin },
    { label: "Transactions", href: "/transactions", show: sideNavInfo.isLogin },
    { label: "Upgrade", href: "/upgrade", show: sideNavInfo.isLogin },
  ];
  return (
    <div className="w-[250px] bg-[var(--green)] p-5 my-5 md:my-10 rounded mx-auto shadow-md">
      <div className="w-[100px] h-[100px] bg-[var(--blue-dark)] shadow-md rounded-full m-auto">
        <Image
          src="/icons/user-139.svg"
          width={100}
          height={100}
          alt="Sde nav pro-photo"
        />
      </div>
      <h1 className="font-black text-center text-white text-[30px]">
        {sideNavInfo.username}
      </h1>
      <nav className="h-[300px] overflow-y-scroll">
        {deskLinks.map(
          (item) =>
            item.show && (
              <Link
                key={item.href}
                className="font-black block p-3 hover:text-[var(--white)]"
                href={item.href}
              >
                {item.label}
              </Link>
            )
        )}
        <Logout_btn logoutBtnStyle="font-black block p-3 hover:text-[var(--white)]" />
      </nav>
    </div>
  );
}
