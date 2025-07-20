"use client";
import { useState } from "react";

// Layouts
import Main from "./layout/Main";

// components
import SideNav from "./SideNav";
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
  const { username, isAdmin, isLogin, bankName, bankAcctNo } = dashInfo;

  //varables
  //   const fullname = `${dashInfo.lastname} ${dashInfo.firstname}`;
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
  //   const [amount, setAmount] = useState(5000);
  //   const [depAmount, setDepamount] = useState(5000);
  //   const [isConWitModal, setIsconwitmodal] = useState(false);
  // const [isConDepModal, setIscondepmodal] = useState(false);
  // const [bankName, setBankname] = useState(dashInfo.bankName);
  //   const [openDepositModal, setOpenDepositModal] = useState(false);
  //   const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  // const [bankAcctNo, setBankacctno] = useState(dashInfo.bankAcctNo);
  const [balance, setBalance] = useState(Number(dashInfo.balance) || 0);

  return (
    <div className="mx-auto">
      <div className="flex">
        <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
          <SideNav sideNavInfo={{ username, isAdmin, isLogin }} />
        </div>
        <div className="w-[100%] px-5 lg:w-[70%]">
          <Main>
            {!isAdmin && (
              <div className="flex flex-col sm:flex-row items-center justify-end gap-5">
                <AcctBalCom
                  acctInfo={{
                    firstname,
                    lastname,
                    email,
                    rank,
                    balance,
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

            <div className="flex flex-col-reverse sm:flex-row justify-between">
              <div className="w-full sm:w-[30%] my-5">
                <SubHeading
                  title="Mini Game"
                  desc="Your chance to earn more."
                />

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
          </Main>
        </div>
      </div>
    </div>
  );
}
