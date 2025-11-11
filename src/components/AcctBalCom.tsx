"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { withdrawalAction } from "@/actions/requesAction";

//components
import Button from "./Button";
import WithdrawalModal from "./modal/WithdrawalModal";
import DepositModal from "./modal/DepositModal";
import ConfirmWitdrawalModal from "./modal/ConfirmWitdrawalModal";
import SuccessModal from "./modal/SuccessModal";
import ErrorModal from "./modal/ErrorModal";

type AcctBalComProps = {
  acctInfo: {
    firstname: string;
    lastname: string;
    email: string;
    rank: number;
    balance: number;
    bankName: string;
    bankAcctNo: string;
  };
};

export default function AcctBalCom({ acctInfo }: AcctBalComProps) {
  const { firstname, lastname, email, rank, balance } = acctInfo;

  const [isPen, setIspen] = useState(false);
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);

  const minWithdrawal = 100;
  const fullname = `${lastname} ${firstname}`;
  const [amount, setAmount] = useState(100);
  const [depAmount, setDepamount] = useState(100);
  const [bankName, setBankname] = useState(acctInfo.bankName);
  const [bankAcctNo, setBankacctno] = useState(acctInfo.bankAcctNo);

  const [isConWitModal, setIsconwitmodal] = useState(false);
  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  function openCloseWithdrawModal() {
    setOpenWithdrawModal(!openWithdrawModal);
  }

  function openCloseDepositModal() {
    setOpenDepositModal(!openDepositModal);
  }

  //function to handle withdrawal form submit
  async function withdrawalFunc() {
    const user = await getToken();
    if (!user) redirect("/login");

    const res = await withdrawalAction(balance, minWithdrawal, amount);

    if (res.error) {
      setIserr(true);
      setErrmsg(res.msg);
      return;
    }

    setIssuc(true);
    setSucmsg(res.msg);
  }

  return (
    <>
      <div className="w-full bg-[var(--gray-10)] p-3 shadow-md rounded-lg">
        <div className="flex justify-between items-center">
          {firstname != "" ? (
            <h3 className="font-bold text-[14px]">{`${fullname}`}</h3>
          ) : (
            <h3 className="font-bold text-[14px]">How’re you doing today?</h3>
          )}

          <div className="rounded-lg  text-[10px] bg-[var(--white)]">
            <span className="font-bold p-2 ">Rank: {rank}</span>
          </div>
        </div>
        <div className="text-left">
          <h4 className="text-[14px]">Balance:</h4>
          <h5 className="font-black text-lg my-1">
            {balance.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
            <span className="ms-1 text-[var(--green)]">NGN</span>
          </h5>
        </div>
        <div className="flex justify-end items-center">
          <button
            id="payBtn"
            onClick={openCloseDepositModal} //payWithPaystack("ayebidunezekiel@gmail.com", 5000)
            className="font-bold text-[12px] mx-2 px-2 py-1 cursor-pointer text-[var(--white)] bg-[var(--green)] rounded-lg"
          >
            Deposit
          </button>
          <Button
            btnAction={openCloseWithdrawModal}
            btnStyle="font-bold text-[12px] cursor-pointer hover:text-[var(--green)]"
          >
            Withdraw
          </Button>
        </div>
      </div>

      {openDepositModal && (
        <DepositModal
          depositInfo={{
            isPen,
            setIspen,
            setErrmsg,
            setSucmsg,
            setIserr,
            setIssuc,
            fullname,
            email,
            balance,
            depAmount,
            setDepamount,
            setOpenDepositModal,
          }}
          closeModal={openCloseDepositModal}
        />
      )}

      {openWithdrawModal && (
        <WithdrawalModal
          withdrawalInfo={{
            isPen,
            setIspen,
            setErrmsg,
            setIserr,
            fullname,
            bankName,
            setBankname,
            bankAcctNo,
            setBankacctno,
            balance,
            amount,
            setAmount,
            minWithdrawal,
            setIsconwitmodal,
            setOpenWithdrawModal,
          }}
          closeModal={openCloseWithdrawModal}
        />
      )}

      {/* confirm withdrawal component */}
      {isConWitModal && (
        <ConfirmWitdrawalModal
          confirmInfo={{ fullname, bankName, bankAcctNo, amount }}
          withdrawalFunc={withdrawalFunc}
          setIsconwitmodal={setIsconwitmodal}
        />
      )}

      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
