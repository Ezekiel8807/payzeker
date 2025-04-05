/* ---eslint-disable @typescript-eslint/no-explicit-any-- */
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { connectDB } from "../../../lib/mongodb";

// Components
import TransCard from "@/components/TransCard";
import SubHeading from "@/components/SubHeading";
import Main from "@/components/layout/Main";
import Table from "@/components/Table";
import Search from "@/components/Search";

// Fetch user data on the server
async function getUser() {
  const token = await getToken();
  if (!token?.id) return null;

  //db connection
  await connectDB();

  // Find user and populate tasks
  const user = await User.findOne({ _id: token.id }).populate("tasks");

  // Convert user data to a plain JavaScript object
  return JSON.parse(JSON.stringify(user));
}

export default async function Transactions() {
  const user = await getUser(); // Fetch user data before rendering

  if (!user) {
    return redirect("/login");
  }

  return (
    <Main>
      <SubHeading title="Transactions" desc="Transaction history right here." />
      {!user.isAdmin && (
        <div className="w-[100%] py-5">
          <TransCard />
          <TransCard />
          <TransCard />
          <TransCard />
          <TransCard />
          <TransCard />
        </div>
      )}

      {user.isAdmin && (
        <div className="w-[100%]">
          <Search />
          <Table>
            <TransCard />
            <TransCard />
            <TransCard />
          </Table>
        </div>
      )}
    </Main>
  );
}
