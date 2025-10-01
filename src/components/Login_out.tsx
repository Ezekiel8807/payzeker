//components
import Link from "next/link";

export default function Login_out() {
  return (
    <div className="hidden lg:block">
      <Link
        className="w-[60px] inline-block font-black text-center p-2 text-[var(--black)] hover:text-[var(--green)]"
        href="/login"
      >
        Login
      </Link>
      <Link
        className="w-[100px] inline-block font-black text-center rounded-full p-2 text-[var(--white)] bg-[var(--green)] "
        href="/register"
      >
        Register
      </Link>
    </div>
  );
}
