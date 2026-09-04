import Script from "next/script";
import { useRouter } from "next/navigation";
import { payWithPaystack } from "@/features/withdrawals/utils/paystackFunc";

//components
import Button from "@/shared/components/ui/Button";
import AmountInput from "@/shared/components/ui/AmountInput";
import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";
import QuickAmountSelector from "@/shared/components/ui/QuickAmountSelector";
import ModalFrame from "@/shared/components/modals/ModalFrame";

type DepositModalProbs = {
  depositInfo: {
    isPen: boolean;
    setIspen: React.Dispatch<React.SetStateAction<boolean>>;
    setErrmsg: React.Dispatch<React.SetStateAction<string>>;
    setSucmsg: React.Dispatch<React.SetStateAction<string>>;
    setIserr: React.Dispatch<React.SetStateAction<boolean>>;
    setIssuc: React.Dispatch<React.SetStateAction<boolean>>;
    fullname: string;
    email: string;
    balance: number;
    depAmount: number;
    setDepamount: React.Dispatch<React.SetStateAction<number>>;
    setOpenDepositModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  closeModal: () => void;
};

export default function DepositModal({
  depositInfo,
  closeModal,
}: DepositModalProbs) {
  const router = useRouter();
  const {
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
  } = depositInfo;

  //function to handle deposit form submit
  function handleDepposit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //set pending state
    setIspen(true);

    if (depAmount < 100) {
      setIspen(false);
      setOpenDepositModal(false);
      setErrmsg("Opps, minimum deposit of ₦100");
      setIserr(true);
      return;
    }

    if (fullname === " ") {
      setIspen(false);
      setOpenDepositModal(false);
      setErrmsg("Opps, update your profile to continue!");
      setIserr(true);
      return;
    }

    //initialize paystack payment
    const callbackUrl = `${window.location.origin}/payment/verify`;

    payWithPaystack(
      email,
      depAmount,
      (message) => {
        // Success callback (This might not fire if redirect happens first, which is fine)
        setIspen(false);
        setOpenDepositModal(false);
        setSucmsg(message);
        setIssuc(true);
      },
      (message) => {
        // Error callback
        setIspen(false);
        setOpenDepositModal(false);
        setErrmsg(message);
        setIserr(true);
      },
      () => {
        // Refresh callback - updates UI without page reload
        router.refresh();
      },
      callbackUrl // Pass the callback URL
    );
  }

  return (
    <ModalFrame title="Deposit" closeModal={closeModal}>
      <form
        onSubmit={handleDepposit}
        className="w-[90%] md:w-[70%] my-5 mx-auto"
      >
        {/* ✅ Load Paystack only on client */}
        <Script src="https://js.paystack.co/v1/inline.js"></Script>

        {/*  */}
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
        <div className="text-right mt-2">
          <small className="block text-ink-muted">
            {"Balance: "}
            <CurrencyDisplay amount={balance} showSuffix={false} />
          </small>
        </div>
        <AmountInput
          value={depAmount}
          onChange={setDepamount}
          min={100}
          placeholder={`Amount(NGN): min- #100`}
        />
        <QuickAmountSelector
          amounts={[100, 500, 1000, 5000, 10000]}
          onAdd={(amt) => setDepamount((value) => value + amt)}
        />
        <div className="text-right">
          <Button btnStyle="btn btn-primary w-[100px] mt-5 text-center">
            {isPen ? "Processing..." : "Deposit"}
          </Button>
        </div>
      </form>
    </ModalFrame>
  );
}
