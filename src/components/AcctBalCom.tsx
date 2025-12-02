"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { withdrawPaystack } from "@/utils/paystackFunc";

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
  const router = useRouter();
  const { firstname, lastname, email, rank, balance } = acctInfo;

  const [isPen, setIspen] = useState(false);
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
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
            onClick={openCloseDepositModal}
            disabled={isProcessing || isPen}
            className={`font-bold text-[12px] mx-2 px-2 py-1 rounded-lg ${
              isProcessing || isPen
                ? "opacity-50 cursor-not-allowed bg-gray-400 text-gray-600"
                : "cursor-pointer text-[var(--white)] bg-[var(--green)]"
            }`}
          >
            {isPen ? "Processing..." : "Deposit"}
          </button>
          <Button
            btnAction={openCloseWithdrawModal}
            btnStyle={`font-bold text-[12px] ${
              isProcessing || isPen
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:text-[var(--green)]"
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
