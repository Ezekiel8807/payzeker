import React, { useEffect, useState } from "react";
import ModalFrame from "../modalFrame";
import Button from "../Button";

type WithdrawalModalProbs = {
  withdrawalInfo: {
    isPen: boolean;
    setIspen: React.Dispatch<React.SetStateAction<boolean>>;
    fullname: string;
    bankName: string;
    setBankname: React.Dispatch<React.SetStateAction<string>>;
    bankAcctNo: number;
    setBankacctno: React.Dispatch<React.SetStateAction<number>>;
    balance: number;
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    minWithdrawal: number;
    maxWithdrawal: number;
    allTimeWithdrawal: number;
    setIsconwitmodal: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenWithdrawModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  closeModal: () => void;
};

export default function WithdrawalModal({
  withdrawalInfo,
  closeModal,
}: WithdrawalModalProbs) {
  const {
    isPen,
    setIspen,
    fullname,
    bankName,
    setBankname,
    bankAcctNo,
    setBankacctno,
    balance,
    amount,
    setAmount,
    minWithdrawal,
    maxWithdrawal,
    allTimeWithdrawal,
    setIsconwitmodal,
    setOpenWithdrawModal,
  } = withdrawalInfo;

  //component state
  const [disWithdraw, setDiswithdraw] = useState(true);

  useEffect(() => {
    if (amount <= balance && amount >= minWithdrawal) {
      setDiswithdraw(false);
    } else {
      setDiswithdraw(true);
    }
  }, [balance, minWithdrawal, amount]);

  //function to handle withdrawal form submit
  function handleWithdrawal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //set pending state
    setIspen(true);

    if (amount > balance) {
      setAmount(0);
      setIspen(false);
      return;
    }

    if (amount < minWithdrawal) {
      setAmount(0);
      setIspen(false);
      return;
    }

    if (amount + allTimeWithdrawal > maxWithdrawal) {
      setAmount(0);
      setIspen(false);
      return;
    }

    //set pending state
    setIspen(false);

    //se
    setOpenWithdrawModal(false);
    setIsconwitmodal(true);
  }

  return (
    <ModalFrame title={"Withdraw"} closeModal={closeModal}>
      <form
        onSubmit={handleWithdrawal}
        className="w-[90%] md:w-[70%] my-5 mx-auto"
      >
        <input
          className="w-full outline-none bg-none p-1 border-b-2 text-right"
          type="text"
          name="fullname"
          readOnly
          disabled
          value={fullname}
          id="fullname"
          placeholder="Fullname"
        />

        <input
          className="w-full outline-none bg-none p-1 border-b-2 text-right"
          type="text"
          name="bankName"
          value={bankName}
          onChange={(e) => {
            setBankname(e.target.value);
          }}
          placeholder="Bank Name"
        />

        <input
          className="w-full outline-none bg-none p-1 border-b-2 text-right"
          type="number"
          name="bankAcctNo"
          value={bankAcctNo}
          onChange={(e) => {
            setBankacctno(Number(e.target.value));
          }}
          placeholder="Account No"
        />

        <div className="text-right mt-2">
          <small className="block text-gray-400">
            {"Balance(NGN): "} {`#${balance.toFixed(2)}`}
          </small>
          <small className="block text-gray-400">
            {"min withdrawal(NGN): "} {`#${minWithdrawal.toFixed(2)}`}
          </small>
        </div>

        <input
          className="w-full outline-none p-1 border-2 text-right"
          type="number"
          name="amount"
          defaultValue={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
          placeholder={`Amount(NGN): min- #${minWithdrawal}`}
        />

        <div className="text-right">
          <Button
            disabled={disWithdraw}
            btnStyle="w-[100px] mt-5 p-1 text-center bg-[var(--green)] disabled:text-gray-300 disabled:bg-gray-200 rounded"
          >
            {!isPen ? "Withdraw" : "Processing..."}
          </Button>
        </div>
      </form>
    </ModalFrame>
  );
}
