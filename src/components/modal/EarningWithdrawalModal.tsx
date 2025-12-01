import { useEffect, useState } from "react";
import { EarningWithdrawalAction } from "@/actions/requesAction";

//components
import ModalFrame from "./modalFrame";
import Button from "../Button";

type EarningWithdrawalModalProbs = {
  EarningWithdrawalInfo: {
    isPen: boolean;
    setIspen: React.Dispatch<React.SetStateAction<boolean>>;
    setErrmsg: React.Dispatch<React.SetStateAction<string>>;
    setIserr: React.Dispatch<React.SetStateAction<boolean>>;
    earning: number;
    minWithdrawal: number;
    maxWithdrawal: number;
    allTimeWithdrawal: number;
    setOpenWithdrawModal: React.Dispatch<React.SetStateAction<boolean>>;
  };

  closeModal: () => void;
};

export default function EarningWithdrawalModal({
  EarningWithdrawalInfo,
  closeModal,
}: EarningWithdrawalModalProbs) {
  const {
    isPen,
    setIspen,
    setErrmsg,
    setIserr,
    earning,
    minWithdrawal,
    maxWithdrawal,
    allTimeWithdrawal,
    setOpenWithdrawModal,
  } = EarningWithdrawalInfo;

  //component state
  const [amount, setAmount] = useState(minWithdrawal);
  const [disWithdraw, setDiswithdraw] = useState(true);

  useEffect(() => {
    if (amount <= earning && amount >= minWithdrawal) {
      setDiswithdraw(false);
    } else {
      setDiswithdraw(true);
    }
  }, [earning, amount, minWithdrawal]);

  async function transToBal() {
    const res = await EarningWithdrawalAction(
      earning,
      minWithdrawal,
      allTimeWithdrawal,
      maxWithdrawal,
      amount
    );

    return res;
  }

  //function to handle earning withdrawal form submit
  async function handleWithdrawal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevent multiple submissions
    if (isPen) return;

    //set pending state
    setIspen(true);

    if (amount > earning) {
      setIspen(false);
      setOpenWithdrawModal(false);
      setErrmsg("Insufficient balance");
      setIserr(true);
      return;
    }

    if (amount < minWithdrawal) {
      setIspen(false);
      setOpenWithdrawModal(false);
      setErrmsg(`Minimum withdrawal is ₦${minWithdrawal.toLocaleString()}`);
      setIserr(true);
      return;
    }

    if (amount + allTimeWithdrawal > maxWithdrawal) {
      setIspen(false);
      setOpenWithdrawModal(false);
      setErrmsg("Upgrade account to increase your withdrawal limit");
      setIserr(true);
      return;
    }

    try {
      //backend call
      const res = await transToBal();
      
      setIspen(false);
      setOpenWithdrawModal(false);

      if (res.error) {
        setErrmsg(res.msg);
        setIserr(true);
      } else {
        // Success - show message and reload
        alert(res.msg);
        window.location.reload();
      }
    } catch (error) {
      setIspen(false);
      setOpenWithdrawModal(false);
      setErrmsg(error instanceof Error ? error.message : "An error occurred");
      setIserr(true);
    }
  }

  return (
    <ModalFrame title={"Transfer"} closeModal={closeModal}>
      <form
        onSubmit={handleWithdrawal}
        className="w-[90%] md:w-[70%] my-5 mx-auto"
      >
        <div className="text-right mt-2">
          <small className="block text-gray-400">
            {"Earning: "}
            {earning.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </small>
          <small className="block text-gray-400">
            {"min withdrawal: "}
            {minWithdrawal.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </small>
        </div>

        <input
          className="w-full outline-none p-1 border-2 text-right"
          type="text"
          name="amount"
          value={amount.toString()}
          onChange={(e) => {
            const notNumber = isNaN(Number(e.target.value));
            if (notNumber) return;
            setAmount(Number(e.target.value));
          }}
          placeholder={`Amount(NGN): min- #${minWithdrawal}`}
        />

        <div className="text-right">
          <Button
            disabled={disWithdraw || isPen}
            btnStyle="w-[100px] mt-5 p-1 text-center bg-[var(--green)] disabled:text-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed rounded"
          >
            {isPen ? "Processing..." : "Transfer"}
          </Button>
        </div>
      </form>
    </ModalFrame>
  );
}
