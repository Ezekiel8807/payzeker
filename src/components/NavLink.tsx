"use client";
import Link from "next/link";

const links = ["How To Start", "About", "FAQ", "Contact"];

export default function NavLink() {
  return (
    <nav className="hidden lg:block">
      {links.map((link) => (
        <Link
          className="font-black p-3 hover:text-[var(--green)]"
          key={link}
          href={`/${link.toLowerCase()}`}
        >
          {link}
        </Link>
      ))}
    </nav>
  );
}
