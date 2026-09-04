"use client";
import Link from "next/link";

const links = ["How To Start", "About", "FAQ", "Contact"];

export default function NavLink() {
  return (
    <nav className="hidden lg:flex items-center gap-1">
      {links.map((link) => (
        <Link
          className="rounded-pill px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:bg-[var(--green)]/10 hover:text-[var(--green-dark)]"
          key={link}
          href={`/#${link.toLowerCase()}`}
        >
          {link}
        </Link>
      ))}
    </nav>
  );
}
