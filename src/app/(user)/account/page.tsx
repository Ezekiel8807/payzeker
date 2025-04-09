import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { connectDB } from "../../../lib/mongodb";
import Transaction from "@/model/transactionModel";

// Components
import BankInfo from "@/components/BankInfo";
import AcctBalCom from "@/components/AcctBalCom";
import SubHeading from "@/components/SubHeading";
import Main from "@/components/layout/Main";
import UserTrans from "@/components/transactions/UserTrans";

// Fetch user data on the server
async function getUser() {
  const token = await getToken();
  if (!token?.id) return redirect("/login");

  //db connection
  await connectDB();

  // Find user and populate tasks
  const user = await User.findOne({ _id: token.id }).populate("tasks");

  // Convert user data to a plain JavaScript object
  return JSON.parse(JSON.stringify(user));
}

// Fetch user data on the server
async function getTransactions() {
  const token = await getToken();
  if (!token?.id) return redirect("/login");

  //db connection
  await connectDB();

  // Find user and populate tasks
  const transactions = await Transaction.find().sort({ _id: -1 });

  // Convert user data to a plain JavaScript object
  return JSON.parse(JSON.stringify(transactions));
}

export default async function Account() {
  const user = await getUser(); // Fetch user data before rendering
  const AllTransac = await getTransactions();

  const { firstname = "firstname", lastname = "lastname", rank = 1 } = user;
  const balance = user.account.balance as number;
  const {
    bankName = "bankName",
    bankAcctNo = 12346790,
    minWithdrawal = 5000,
    maxWithdrawal,
    allTimeWithdrawal,
  } = user.account.withdrawal;

  return (
    <Main>
      <SubHeading title="Account" desc="Everything about your account." />

      <div className="grid grid-flow-col justify-start gap-5 overflow-x-scroll no-scrollbar  my-3">
        <div className="w-[275px] h-[130px] md:w-[300px]">
          <AcctBalCom
            acctInfo={{
              firstname,
              lastname,
              rank,
              balance,
              bankName,
              bankAcctNo,
              minWithdrawal,
              maxWithdrawal,
              allTimeWithdrawal,
            }}
          />
        </div>

        <BankInfo BankInfo={{ firstname, lastname, bankName, bankAcctNo }} />
      </div>

      {/* auto scroll element */}
      <div className="scroll-smooth"></div>

      <div className="w-full m-auto">
        <SubHeading
          title="Transaction"
          desc="Transaction history right here."
        />
        <UserTrans userId={user._id as string} trans={AllTransac} />
      </div>
    </Main>
  );
}
