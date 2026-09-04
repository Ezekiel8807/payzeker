import Link from "next/link";

export default function Login_out() {
  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Link
        className="rounded-pill px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:bg-[var(--green)]/10 hover:text-[var(--green-dark)]"
        href="/login"
      >
        Login
      </Link>
      <Link
        className="rounded-pill bg-[var(--green)] px-5 py-2 text-sm font-bold text-white shadow-soft transition-colors hover:bg-[var(--green-dark)]"
        href="/register"
      >
        Register
      </Link>
    </div>
  );
}
