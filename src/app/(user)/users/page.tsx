import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { connectDB } from "../../../lib/mongodb";

// Components
import SubHeading from "@/components/SubHeading";
import Main from "@/components/layout/Main";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

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
      {users.map(
        (user: {
          _id: Key | null | undefined;
          username:
            | string
            | number
            | bigint
            | boolean
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | ReactPortal
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
        }) => (
          <h1 key={user._id}>{user.username}</h1>
        )
      )}
    </Main>
  );
}
