import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import Transaction from "@/model/transactionModel";
import { connectDB } from "../../../lib/mongodb";

// Components
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import AllTrans from "@/components/transactions/AllTrans";
import UserTrans from "@/components/transactions/UserTrans";

// Fetch user data on the server
async function getTransactions() {
  const token = await getToken();
  if (!token?.id) return redirect("/login");

  //db connection
  await connectDB();

  // Find user and populate tasks
  const transactions = await Transaction.find();

  // Convert user data to a plain JavaScript object
  return JSON.parse(JSON.stringify(transactions));
}

// Fetch user data on the server
// async function getUserTransactions() {
//   const token = await getToken();
//   if (!token?.id) return redirect("/login");

//   //db connection
//   await connectDB();

//   // Find user and populate tasks
//   const userTransactions = await Transaction.find({ userId: token.id });

//   // Convert user data to a plain JavaScript object
//   return JSON.parse(JSON.stringify(userTransactions));
// }

export default async function Transactions() {
  const user = await getToken();
  const userId = user.id as string;
  const AllTransac = await getTransactions();
  // const userTransac = await getUserTransactions();

  // // const userTransac = AllTransac.filter(
  //   (trans: { _id: string }) => trans._id != user.id
  // );

  return (
    <Main>
      <SubHeading title="Transactions" desc="Transaction history right here." />
      {user.isAdmin ? (
        <AllTrans trans={AllTransac} />
      ) : (
        <UserTrans userId={userId} trans={AllTransac} />
      )}
    </Main>
  );
}
