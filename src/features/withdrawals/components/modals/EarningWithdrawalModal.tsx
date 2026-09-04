import { useEffect, useState } from "react";
import { EarningWithdrawalAction } from "@/features/requests/actions/requesAction";

//components
import ModalFrame from "@/shared/components/modals/ModalFrame";
import Button from "@/shared/components/ui/Button";
import AmountInput from "@/shared/components/ui/AmountInput";
import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";

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
          <small className="block text-ink-muted">
            {"Earning: "}
            <CurrencyDisplay amount={earning} showSuffix={false} />
          </small>
          <small className="block text-ink-muted">
            {"min withdrawal: "}
            <CurrencyDisplay amount={minWithdrawal} showSuffix={false} />
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
            disabled={disWithdraw || isPen}
            btnStyle="btn btn-primary w-[100px] mt-5 text-center"
          >
            {isPen ? "Processing..." : "Transfer"}
          </Button>
        </div>
      </form>
    </ModalFrame>
  );
}
