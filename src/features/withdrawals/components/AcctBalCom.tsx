"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { withdrawPaystack } from "@/features/withdrawals/utils/paystackFunc";

//components
import Button from "@/shared/components/ui/Button";
import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";
import WithdrawalModal from "./modals/WithdrawalModal";
import DepositModal from "./modals/DepositModal";
import ConfirmWitdrawalModal from "./modals/ConfirmWitdrawalModal";
import SuccessModal from "@/shared/components/modals/SuccessModal";
import ErrorModal from "@/shared/components/modals/ErrorModal";

//hooks
import useFormState from "@/shared/hooks/useFormState";

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
  const router = useRouter();
  const { firstname, lastname, email, rank, balance } = acctInfo;

  const { isPen, setIspen, isSuc, setIssuc, isErr, setIserr, errMsg, setErrmsg, sucMsg, setSucmsg } = useFormState();
  const [isProcessing, setIsProcessing] = useState(false);

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
    // Prevent opening modal if any operation is processing
    if (isProcessing || isPen) return;
    setOpenWithdrawModal(!openWithdrawModal);
  }

  function openCloseDepositModal() {
    // Prevent opening modal if any operation is processing
    if (isProcessing || isPen) return;
    setOpenDepositModal(!openDepositModal);
  }

  //function to handle withdrawal form submit
  async function withdrawalFunc() {
    // Prevent multiple calls
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      const result = await withdrawPaystack(amount);

      if (result.error) {
        setErrmsg(result.message);
        setIserr(true);
      } else {
        setSucmsg(result.message);
        setIssuc(true);
        setIsconwitmodal(false); // Close the confirmation modal on success
        // Refresh the UI to show updated balance
        router.refresh();
      }
    } catch (error) {
      setIserr(true);
      setErrmsg("An unexpected error occurred");
      console.error("Withdrawal error:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
      <div id="dashboard-balance" className="w-full bg-white p-3 shadow-card rounded-card">
        <div className="flex justify-between items-center">
          {firstname != "" ? (
            <h3 className="font-bold text-[14px]">{`${fullname}`}</h3>
          ) : (
            <h3 className="font-bold text-[14px]">How’re you doing today?</h3>
          )}

          <div className="badge badge-gray">
            <span className="font-bold">Rank: {rank}</span>
          </div>
        </div>
        <div className="text-left">
          <h4 className="text-[14px]">Balance:</h4>
          <h5 className="font-black text-lg my-1">
            <CurrencyDisplay amount={balance} />
          </h5>
        </div>
        <div className="flex justify-end items-center">
          <button
            id="payBtn"
            onClick={openCloseDepositModal}
            disabled={isProcessing || isPen}
            className={`btn btn-primary text-[12px] px-3 py-1.5 mx-2 ${isProcessing || isPen
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
              }`}
          >
            {isPen ? "Processing..." : "Deposit"}
          </button>
          <Button
            btnAction={openCloseWithdrawModal}
            btnStyle={`btn btn-ghost text-[12px] px-3 py-1.5 ${isProcessing || isPen
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
              }`}
            disabled={isProcessing || isPen}
          >
            {isProcessing ? "Processing..." : "Withdraw"}
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
          isProcessing={isProcessing}
        />
      )}

      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
