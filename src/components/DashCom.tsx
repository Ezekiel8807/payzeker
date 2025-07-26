"use client";
import { useState } from "react";

// components
import AcctBalCom from "./AcctBalCom";
import SubHeading from "./SubHeading";
import PayGamer from "./PayGamer";
import Performance from "./Performance";
import DailyTask from "./DailyTask";

type DashComProps = {
  dashInfo: {
    username: string;
    firstname: string;
    lastname: string;
    isAdmin: boolean;
    isLogin: boolean;
    email: string;
    rank: number;
    completedTask: number;
    overallTask: number;
    balance: number;
    bankName: string;
    bankAcctNo: number;
    minWithdrawal: number;
    maxWithdrawal: number;
    allTimeWithdrawal: number;
  };
};

export default function DashCom({ dashInfo }: DashComProps) {
  const { isAdmin, bankName, bankAcctNo } = dashInfo;

  //varables
  const firstname = dashInfo.firstname;
  const lastname = dashInfo.lastname;
  const email = dashInfo.email;
  const rank = dashInfo.rank;
  const completedTask = dashInfo.completedTask;
  const overallTask = dashInfo.overallTask;
  const minWithdrawal = dashInfo.minWithdrawal;
  const maxWithdrawal = dashInfo.maxWithdrawal;
  const allTimeWithdrawal = dashInfo.allTimeWithdrawal;

  //state
  const [balance, setBalance] = useState(Number(dashInfo.balance) || 0);

  return (
    <>
      {!isAdmin && (
        <div className="flex flex-col sm:flex-row items-center justify-end gap-5">
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
          <Performance Overall={overallTask} Completed={completedTask} />
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row justify-between md:gap-5">
        <div className="w-full sm:w-[30%] my-5">
          <SubHeading title="Mini Game" desc="Your chance to earn more." />
          <PayGamer gameInfo={{ balance, setBalance }} />
        </div>

        <div className="w-full sm:w-[70%]">
          <div className="mt-5">
            <SubHeading
              title="Tasks"
              desc="Earn real cash for completing task."
            />

            <DailyTask />
          </div>
        </div>
      </div>
    </>
  );
}
