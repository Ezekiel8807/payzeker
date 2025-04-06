import { Key } from "react";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
// import User from "../../../model/userModel";
import { connectDB } from "../../../lib/mongodb";
import Request from "../../../model/requestModel";

// // Components
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
// import DepositCard from "@/components/request/DepositCard";
// import WithdrawCard from "@/components/request/WithdrawCard";
import RequestCard from "@/components/cards/RequestCard";

// Fetch requested data on the server
async function getRequests() {
  const token = await getToken();
  if (!token) return redirect("/login");

  if (token.isAdmin != true) {
    return redirect("/dashboard");
  }

  //db connection
  await connectDB();

  // Find user and populate tasks
  const requests = await Request.find();

  // Convert user data to a plain JavaScript object
  return JSON.parse(JSON.stringify(requests));
}

export default async function page() {
  const requests = await getRequests();

  return (
    <Main>
      <SubHeading
        title="Requests"
        desc="Deposit and withdrawal confirmation."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-5 gap-5">
        {requests.map(
          (request: {
            _id: Key | string | null | undefined;
            userId: string;
            type: string;
            username: string;
            fullname: string;
            bankName: string | null | undefined;
            prof: string;
            bankAcctNo: number | null | undefined;
            amount: number;
          }) => (
            <RequestCard key={request._id} requestCardInfo={request} />
          )
        )}
      </div>
    </Main>
  );
}
