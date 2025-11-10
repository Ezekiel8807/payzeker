"use client";

//components
import AcctBalCom from "../AcctBalCom";

type AcctBalComLayProps = {
  AcctBalComInfo: {
    firstname: string;
    lastname: string;
    email: string;
    rank: number;
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    bankName: string;
    bankAcctNo: string;
  };
};

export default function AcctBalComLay({ AcctBalComInfo }: AcctBalComLayProps) {
  const {
    firstname,
    lastname,
    email,
    rank,
    balance,
    setBalance,
    bankName,
    bankAcctNo,
  } = AcctBalComInfo;

  //
  return (
    <AcctBalCom
      acctInfo={{
        firstname,
        lastname,
        email,
        rank,
        balance,
        setBalance,
        bankName,
        bankAcctNo,
      }}
    />
  );
}
