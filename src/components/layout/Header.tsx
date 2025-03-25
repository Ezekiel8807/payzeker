import { use } from "react";
import Link from "next/link";
import { getToken } from "@/actions/action";
import User from "../../model/userModel";
import { connectDB } from "../../lib/mongodb";

// components
import NavLink from "../NavLink";
import ToggleBtn from "../ToggleBtn";
import Login_out from "../Login_out";
import NavProfile from "../NavProfile";

// Fetch user data on the server
async function getUser() {
  const token = await getToken();
  if (!token) return null;

  //connect to database
  await connectDB();

  //fetch user
  const user = await User.findOne({ _id: token.id }).select(
    "username rank isAdmin"
  );
  if (!user) return null;

  // respond
  return JSON.parse(JSON.stringify(user));
}

export default function Header() {
  const user = use(getUser());
  const isLogin = !user ? false : true;
  const isAdmin = !user ? false : user.isAdmin;
  //

  return (
    <header className="p-5">
      <div className="mx-auto w-[100%] md:w-[90%] flex flex-row items-center justify-between">
        {/* Logo */}
        <Link className="inline" href={user ? "/dashboard" : "/"}>
          <h1 className="font-black text-[25px]">
            <span className="text-[var(--green)]">Pay</span>zeker
          </h1>
        </Link>

        {/* /*  Navigation Links  */}
        <NavLink />

        {/* User Authentication */}
        {!user ? (
          <Login_out />
        ) : (
          <NavProfile userName={user.username} userRank={user.rank} />
        )}

        {/* Toggle Button */}
        <ToggleBtn toggleData={{ isLogin, isAdmin }} />
      </div>
    </header>
  );
}
