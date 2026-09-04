import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import User from "@/shared/models/userModel";
import { fetchModelById } from "@/shared/utils/modelFunc";

//components
import BankInfo from "./BankInfo";
import EarningBal from "./EarningBal";
import AcctBalCom from "./AcctBalCom";

export default async function MoneyCom() {
  const token = await getToken();
  if (!token) return redirect("/login");

  const user = await fetchModelById(User, token.id);

  const { firstname, lastname, email, rank } = user;
  const balance = user.account.balance as number;
  const earning = user.account.earning as number;
  const {
    bankName = "bankName",
    bankAcctNo = 12346790,
    minWithdrawal = 5000,
    maxWithdrawal,
    allTimeWithdrawal,
  } = user.account.withdrawal;

  return (
    <div className="w-full grid grid-flow-col justify-start gap-2 md:gap-5 overflow-x-scroll no-scrollbar">
      <div className="w-[300px] h-[130px]">
        <AcctBalCom
          acctInfo={{
            firstname,
            lastname,
            email,
            rank,
            balance,
            bankName,
            bankAcctNo,
          }}
        />
      </div>

      <div className="w-[300px] h-[130px]">
        <EarningBal
          earning={earning}
          minWithdrawal={minWithdrawal}
          maxWithdrawal={maxWithdrawal}
          allTimeWithdrawal={allTimeWithdrawal}
        />
      </div>

      <div className="w-[300px] h-[130px]">
        <BankInfo BankInfo={{ firstname, lastname, bankName, bankAcctNo }} />
      </div>
    </div>
  );
}
