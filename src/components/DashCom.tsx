"use client";
import { useState } from "react";

// components
import AcctBalCom from "./AcctBalCom";
import SubHeading from "./SubHeading";
import PayGamer from "./PayGamer";
import Performance from "./Performance";
import DailyTask from "./DailyTask";
import Link from "next/link";

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
  const [show, setShow] = useState(true);
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

      {show && (
        <div className="bg-[#e6fff7] p-5 rounded-2xl shadow-md mt-6 w-full mx-auto">
          <div className="flex items-start justify-between">
            <h2 className="w-[90%] text-2xl font-bold text-[#29cd9c] mb-3 flex items-center gap-2">
              🔓 Upgrade & Unlock More Features
            </h2>

            <button
              onClick={() => setShow(false)}
              className="text-gray-500 hover:text-red-500 text-xl leading-none"
            >
              &times;
            </button>
          </div>
          <p className="text-gray-700 mb-6">
            Get access to exclusive tasks, increased rewards, and more by
            upgrading your account today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/upgrade"
              className="bg-[#29cd9c] hover:bg-[#22b891] text-white font-medium px-6 py-2 rounded-xl transition-all duration-200"
            >
              Upgrade Now
            </Link>
            <Link
              href="/upgrade"
              className="border border-[#29cd9c] text-[#29cd9c] hover:bg-[#f0fffa] font-medium px-6 py-2 rounded-xl transition-all duration-200"
            >
              View Plans
            </Link>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between md:gap-5">
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
