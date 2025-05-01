import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import Transaction from "@/model/transactionModel";
import { fetchModelById, fetchModelsData } from "@/utils/modelFunc";

// Components
import BankInfo from "@/components/BankInfo";
import AcctBalCom from "@/components/AcctBalCom";
import SubHeading from "@/components/SubHeading";
import Main from "@/components/layout/Main";
import UserTrans from "@/components/transactions/UserTrans";

export default async function Account() {
  const token = await getToken();
  const user = await fetchModelById(User, token.id);
  const [AllTransac] = await fetchModelsData(Transaction);

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
