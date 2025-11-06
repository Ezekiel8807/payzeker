//components
import BankInfo from "./BankInfo";
import EarningBal from "./EarningBal";
import AcctBalComLay from "./layout/AcctBalComLay";

type MoneyComProbs = {
  moneyComData: {
    firstname: string;
    lastname: string;
    email: string;
    rank: number;
    balance: number;
    earning: number;
    bankName: string;
    bankAcctNo: string;
    minWithdrawal: number;
    maxWithdrawal: number;
    allTimeWithdrawal: number;
  };
};

export default function MoneyCom({ moneyComData }: MoneyComProbs) {
  const {
    firstname,
    lastname,
    email,
    rank,
    balance,
    earning,
    bankName,
    bankAcctNo,
    minWithdrawal,
    maxWithdrawal,
    allTimeWithdrawal,
  } = moneyComData;
  return (
    <div className="w-full grid grid-flow-col justify-start gap-5 overflow-x-scroll no-scrollbar">
      <div className="w-[300px] h-[130px]">
        <AcctBalComLay
          AcctBalComInfo={{
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
