"use client";
import React, { useState } from "react";
import Button from "./Button";
import WithdrawalModal from "./modal/WithdrawalModal";
import DepositModal from "./modal/DepositModal";
import ConfirmWitdrawalModal from "./modal/ConfirmWitdrawalModal";

type AcctBalComProps = {
  acctInfo: {
    firstname: string;
    lastname: string;
    rank: number;
    balance: number;
    bankName: string;
    bankAcctNo: number;
    minWithdrawal: number;
    maxWithdrawal: number;
    allTimeWithdrawal: number;
  };
};

export default function AcctBalCom({ acctInfo }: AcctBalComProps) {
  const {
    firstname,
    lastname,
    rank,
    minWithdrawal,
    maxWithdrawal,
    allTimeWithdrawal,
  } = acctInfo;
  const fullname = `${lastname} ${firstname}`;

  const [isPen, setIspen] = useState(false);
  const [witAmount, setWitamount] = useState<number | undefined>();
  const [isConWitModal, setIsconwitmodal] = useState(false);
  const [bankName, setBankname] = useState(acctInfo.bankName);
  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [bankAcctNo, setBankacctno] = useState(acctInfo.bankAcctNo);
  // const [balance, setBalance] = useState(Number(acctInfo.balance) || 0);
  const balance = Number(acctInfo.balance) || 0;

  function openCloseWithdrawModal() {
    setOpenWithdrawModal(!openWithdrawModal);
  }

  function openCloseDepositModal() {
    setOpenDepositModal(!openDepositModal);
  }

  //function to handle withdrawal form submit
  // async function withdrawalAction() {}

  //function to handle withdrawal form submit
  function handleWithdrawal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //set pending state
    setIspen(true);
    const amount = !witAmount ? 0 : witAmount;

    console.log(amount);

    if (amount > balance) {
      console.log(amount);
      setIspen(false);
      return;
    }

    if (amount < minWithdrawal) {
      console.log(amount);
      setIspen(false);
      return;
    }

    if (amount + allTimeWithdrawal > maxWithdrawal) {
      console.log(amount);
      setIspen(false);
      return;
    }
    //se
    setOpenWithdrawModal(false);
    setIsconwitmodal(true);

    //set pending state
    setIspen(false);
  }

  // useEffect(() => {
  //   document.addEventListener("click", () => setOpen(!open));
  // }, [open]);

  return (
    <>
      <div className="w-[100%] h-[130px] md:w-[300px] bg-[var(--gray-10)] p-3 shadow-md rounded-lg">
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
            {`${balance.toFixed(2)}`}
            <span className="ms-1 text-[var(--green)]">NGN</span>
          </h5>
        </div>
        <div className="flex justify-end items-center">
          <Button
            btnAction={openCloseDepositModal}
            btnStyle="font-bold text-[12px] mx-2 px-2 py-1 cursor-pointer text-[var(--white)] bg-[var(--green)] rounded-lg"
          >
            Deposit
          </Button>
          <Button
            btnAction={openCloseWithdrawModal}
            btnStyle="font-bold text-[12px] cursor-pointer hover:text-[var(--green)]"
          >
            Withdraw
          </Button>
        </div>
      </div>

      {openWithdrawModal && (
        <WithdrawalModal
          withdrawalInfo={{
            isPen,
            fullname,
            bankName,
            setBankname,
            bankAcctNo,
            setBankacctno,
            balance,
            witAmount,
            setWitamount,
            minWithdrawal,
            handleWithdrawal,
          }}
          closeModal={openCloseWithdrawModal}
        />
      )}

      {/* confirm withdrawal component */}
      {isConWitModal && (
        <ConfirmWitdrawalModal
          confirmInfo={{ fullname, bankName, bankAcctNo, witAmount }}
          setIsconwitmodal={setIsconwitmodal}
        />
      )}

      {openDepositModal && (
        <DepositModal
          depositInfo={{ fullname, balance }}
          closeModal={openCloseDepositModal}
        />
      )}
    </>
  );
}
