import React, { useEffect, useState } from "react";
import ModalFrame from "@/shared/components/modals/ModalFrame";
import Button from "@/shared/components/ui/Button";
import AmountInput from "@/shared/components/ui/AmountInput";
import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";

type WithdrawalModalProbs = {
  withdrawalInfo: {
    isPen: boolean;
    setIspen: React.Dispatch<React.SetStateAction<boolean>>;
    setErrmsg: React.Dispatch<React.SetStateAction<string>>;
    setIserr: React.Dispatch<React.SetStateAction<boolean>>;
    fullname: string;
    bankName: string;
    setBankname: React.Dispatch<React.SetStateAction<string>>;
    bankAcctNo: string;
    setBankacctno: React.Dispatch<React.SetStateAction<string>>;
    balance: number;
    amount: number;
    setAmount: React.Dispatch<React.SetStateAction<number>>;
    minWithdrawal: number;
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
  } = withdrawalInfo;

  //component state
  const [disWithdraw, setDiswithdraw] = useState(true);

  useEffect(() => {
    if (amount <= balance && amount >= minWithdrawal) {
      setDiswithdraw(false);
    } else {
      setDiswithdraw(true);
    }
  }, [balance, amount, minWithdrawal]);

  //function to handle withdrawal form submit
  function handleWithdrawal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //set pending state
    setIspen(true);

    if (amount > balance) {
      setAmount(0);
      setIspen(false);
      setOpenWithdrawModal(false);
      setErrmsg("Insufficient balance");
      setIserr(true);
      return;
    }

    if (amount < minWithdrawal) {
      setAmount(0);
      setIspen(false);
      setOpenWithdrawModal(false);
      setErrmsg(`Opps, minimum withdrawal is #${minWithdrawal}`);
      setIserr(true);
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
          className="input text-right"
          type="text"
          name="fullname"
          readOnly
          disabled
          value={fullname}
          id="fullname"
          placeholder="Fullname"
        />

        <input
          className="input text-right"
          type="text"
          name="bankName"
          value={bankName}
          onChange={(e) => {
            setBankname(e.target.value);
          }}
          placeholder="Bank Name"
        />

        <input
          className="input text-right"
          type="text"
          name="bankAcctNo"
          value={bankAcctNo}
          onChange={(e) => {
            setBankacctno(e.target.value);
          }}
          placeholder="Account No"
        />

        <div className="flex items-center justify-between mt-3">
          <small className="block text-ink-muted">
            {"Min: "}
            <CurrencyDisplay amount={minWithdrawal} showSuffix={false} />
          </small>
          <small className="block text-ink-muted">
            {"Bal: "}
            <CurrencyDisplay amount={balance} showSuffix={false} />
          </small>
        </div>

        <AmountInput
          value={amount}
          onChange={setAmount}
          min={minWithdrawal}
          placeholder={`Amount(NGN): min- #${minWithdrawal}`}
        />

        <div className="text-right">
          <Button
            disabled={disWithdraw}
            btnStyle="btn btn-primary w-[100px] mt-5 text-center"
          >
            {!isPen ? "Withdraw" : "Processing..."}
          </Button>
        </div>
      </form>
    </ModalFrame>
  );
}
