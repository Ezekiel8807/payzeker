import { Key } from "react";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { connectDB } from "../../../lib/mongodb";

// Components
import Table from "@/components/Table";
import Search from "@/components/Search";
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import Allusers from "@/components/Allusers";

// Fetch user data on the server
async function getUsers() {
  "use server";
  const token = await getToken();
  if (!token) throw new Error("User not login!");

  if (token.isAdmin != true) {
    return redirect("/dashboard");
  }

  //db connection
  await connectDB();

  // Find user and populate tasks
  const users = await User.find();
  if (!users) throw new Error("Something went wrong!");

  // Convert user data to a plain JavaScript object
  return JSON.parse(JSON.stringify(users));
}

export default async function page() {
  const users = await getUsers();

  return (
    <Main>
      <SubHeading title="All Users" desc="Users information all together." />
      <Allusers allUsers={users} />
    </Main>
  );
}
