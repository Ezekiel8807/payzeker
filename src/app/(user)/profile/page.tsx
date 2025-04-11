/* -eslint-disable @typescript-eslint/no-explicit-any- */
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { connectDB } from "../../../lib/mongodb";

// Components
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import ClientProfile from "@/components/layout/Profile";
import ForgetPass from "@/components/ForgetPass";

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

export default async function Profile() {
  const user = await getUser(); // Fetch user data before rendering

  if (!user) {
    return redirect("/login");
  }

  const {
    firstname = "firstname",
    lastname = "lastname",
    username = "username",
    rank = 1,
    email = "enail",
  } = user;
  const { bankName = "bankName", bankAcctNo = 12346790 } =
    user.account.withdrawal;

  return (
    <Main>
      <SubHeading title="User Profile" desc="Everything about you." />
      <ClientProfile
        userInfo={{
          username,
          firstname,
          lastname,
          email,
          rank,
          bankName,
          bankAcctNo,
        }}
      ></ClientProfile>

      <ForgetPass />
    </Main>
  );
}
