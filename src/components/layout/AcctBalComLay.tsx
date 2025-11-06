"use client";
import { useState } from "react";

//components
import AcctBalCom from "../AcctBalCom";

type AcctBalComLayProps = {
  AcctBalComInfo: {
    firstname: string;
    lastname: string;
    email: string;
    rank: number;
    balance: number;
    bankName: string;
    bankAcctNo: string;
  };
};

export default function AcctBalComLay({ AcctBalComInfo }: AcctBalComLayProps) {
  const { firstname, lastname, email, rank, bankName, bankAcctNo } =
    AcctBalComInfo;

  const [balance, setBalance] = useState(Number(AcctBalComInfo.balance) || 0);

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
