"use client";
import { useState, useCallback } from "react";

// components
import Link from "next/link";
import Image from "next/image";
import Logout_btn from "./Logout_btn";

// Define Props Type
interface ToggleBtnProps {
  toggleData: {
    isLogin: boolean;
    isAdmin: boolean | null;
  };
}

export default function ToggleBtn({ toggleData }: ToggleBtnProps) {
  // const navEl = useRef(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  // Toggle Menu Handler
  const toggleMenu = useCallback(() => {
    setMenuIsOpen((prev) => !prev);
  }, []);

  // useEffect(() => {
  //   if (document.activeElement != navEl.current) {
  //     setMenuIsOpen(false);
  //   }
  // }, [navEl]);

  // Define Navigation Links
  const menuItems = [
    { label: "Home", href: "/", show: !toggleData.isLogin },
    { label: "About", href: "/about", show: !toggleData.isLogin },
    { label: "Contact", href: "/contact", show: !toggleData.isLogin },
    { label: "Dashboard", href: "/dashboard", show: toggleData.isLogin },
    { label: "Account", href: "/account", show: toggleData.isLogin },
    { label: "Profile", href: "/profile", show: toggleData.isLogin },
    { label: "Tasks", href: "/tasks", show: toggleData.isLogin },
    {
      label: "Request",
      href: "/requests",
      show: toggleData.isLogin && toggleData.isAdmin,
    },
    {
      label: "Users",
      href: "/users",
      show: toggleData.isLogin && toggleData.isAdmin,
    },
    {
      label: "Plans",
      href: "/plans",
      show: toggleData.isLogin && toggleData.isAdmin,
    },
    { label: "Transactions", href: "/transactions", show: toggleData.isLogin },
    { label: "Leadership", href: "/leadership", show: toggleData.isLogin },
    { label: "Upgrade", href: "/upgrade", show: toggleData.isLogin },
    {
      label: "Login",
      href: "/login",
      show: !toggleData.isLogin,
    },
    {
      label: "Register",
      href: "/register",
      show: !toggleData.isLogin,
    },
  ];

  return (
    <>
      {/* Toggle Button */}
      <Image
        onClick={toggleMenu}
        aria-expanded={menuIsOpen}
        aria-label="Toggle navigation menu"
        src="/icons/menu.png"
        alt="menu icon"
        width={25}
        height={25}
        style={{ width: "auto", height: "auto" }}
        className="lg:hidden"
      />

      {/* Toggle Dropdown */}
      <div
        className={`${
          !menuIsOpen ? "hidden" : "block"
        } fixed top-0 left-0 h-screen z-10 bg-[#eefdfa] shadow-lg border-r-2 border-[var(--green)] transition-transform scale-100 ease-in-out`}
      >
        <nav className="relative h-[94vh] text-center">
          <Image
            src="/img/payzekel-logo-icon1.png"
            width={500}
            height={500}
            alt="logo-2"
            className="object-cover bg-no-repeat w-[85px] h-[85px] mx-auto mt-10 mb-2"
          />
          <h1 className="text-3xl text-center font-black mb-3">Payzeker</h1>

          {menuItems.map(
            (item) =>
              item.show && (
                <Link
                  key={item.label}
                  onClick={() => setMenuIsOpen(false)}
                  className="p-3 block w-[200px] hover:bg-[var(--green)] hover:text-[var(--white)] hover:font-black"
                  href={item.href}
                >
                  {item.label}
                </Link>
              )
          )}
          {toggleData.isLogin && (
            <Logout_btn logoutBtnStyle="absolute left-0 bottom-0 p-3 block w-[200px] text-red-500 hover:bg-[var(--green)] hover:text-[var(--white)] hover:font-black" />
          )}
        </nav>
      </div>
    </>
  );
}
