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
    minWithdrawal: number;
    maxWithdrawal: number;
    allTimeWithdrawal: number;
  };
};

export default function AcctBalComLay({ AcctBalComInfo }: AcctBalComLayProps) {
  const {
    firstname,
    lastname,
    email,
    rank,
    bankName,
    bankAcctNo,
    minWithdrawal,
    maxWithdrawal,
    allTimeWithdrawal,
  } = AcctBalComInfo;

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
        minWithdrawal,
        maxWithdrawal,
        allTimeWithdrawal,
      }}
    />
  );
}
