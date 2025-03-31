import { use } from "react";
import Link from "next/link";
import { getToken } from "@/actions/action";
import User from "../../model/userModel";
import { connectDB } from "../../lib/mongodb";
import Notification from "@/model/notificationModel";

// components
import NavLink from "../NavLink";
import ToggleBtn from "../ToggleBtn";
import Login_out from "../Login_out";
import NavProfile from "../NavProfile";
import NotificationCom from "../NotificationCom";

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

// Fetch user notification
async function getNotifications() {
  const token = await getToken();
  if (!token) return null;

  //connect to database
  await connectDB();

  //fetch user
  const notifications = await Notification.find({ username: token.username });

  // respond
  return JSON.parse(JSON.stringify(notifications));
}

export default function Header() {
  const user = use(getUser());
  const notifications = use(getNotifications());

  const isLogin = !user ? false : true;
  const isAdmin = !user ? false : user.isAdmin;
  //

  return (
    <header className="h-[10vh] md:h-[15vh] flex items-center justify-center">
      <div className="w-[90%] md:w-[80%] flex flex-row items-center justify-between">
        {/* Logo */}
        <Link className="inline" href={user ? "/dashboard" : "/"}>
          <h1 className="font-black text-[25px]">
            <span className="text-[var(--green)]">Pay</span>zeker
          </h1>
        </Link>

        {/* /*  Navigation Links  */}
        <NavLink />

        {/* User Authentication */}
        <div className="w-[100px] md:w-[200px]  flex items-center justify-end">
          <div className="flex flex-row-reverse md:flex-row items-center">
            {!user ? (
              <Login_out />
            ) : (
              <>
                <NotificationCom notis={notifications} />
                <NavProfile userName={user.username} userRank={user.rank} />
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
