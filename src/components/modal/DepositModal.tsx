import Script from "next/script";
import { payWithPaystack } from "@/utils/payWithPaystack";

//components
import Button from "../Button";
import ModalFrame from "./modalFrame";

type DepositModalProbs = {
  depositInfo: {
    isPen: boolean;
    setIspen: React.Dispatch<React.SetStateAction<boolean>>;
    setErrmsg: React.Dispatch<React.SetStateAction<string>>;
    setSucmsg: React.Dispatch<React.SetStateAction<string>>;
    setIserr: React.Dispatch<React.SetStateAction<boolean>>;
    setIssuc: React.Dispatch<React.SetStateAction<boolean>>;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
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
  const {
    isPen,
    setIspen,
    setErrmsg,
    setSucmsg,
    setIserr,
    setIssuc,
    setBalance,
    fullname,
    email,
    balance,
    depAmount,
    setDepamount,
    setOpenDepositModal,
  } = depositInfo;

  //function to handle withdrawal form submit
  async function handleDepposit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //set pending state
    setIspen(true);

    if (depAmount < 1000) {
      setIspen(false);
      setOpenDepositModal(false);
      setErrmsg("Opps, minimum deposit of #1,000");
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
    await payWithPaystack(
      email,
      depAmount,
      setErrmsg,
      setIserr,
      setIssuc,
      setSucmsg,
      setBalance
    );

    //set pending state
    setIspen(false);
    setOpenDepositModal(false);
  }

  return (
    <ModalFrame title="Deposit" closeModal={closeModal}>
      <>
        {/* ✅ Load Paystack only on client */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />

        <form
          onSubmit={handleDepposit}
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

          <div className="text-right mt-2">
            <small className="block text-gray-400">
              {"Balance(NGN): "} {`#${balance.toFixed(2)}`}
            </small>
          </div>

          <input
            className="w-full outline-none p-1 border-2 text-right"
            type="number"
            name="depAmount"
            value={depAmount}
            onChange={(e) => {
              setDepamount(Number(e.target.value));
            }}
            placeholder={`Amount(NGN): min- #100`}
          />

          <div className="flex flex-row mt-2 items-center justify-between gap-2">
            <div
              onClick={() => {
                setDepamount((value) => value + 100);
              }}
              className="p-2 font-black text-[10px] text-center bg-[var(--gray-20)]"
            >
              +100
            </div>
            <div
              onClick={() => {
                setDepamount((value) => value + 500);
              }}
              className="p-2 font-black text-[10px] text-center bg-[var(--gray-20)]"
            >
              +500
            </div>
            <div
              onClick={() => {
                setDepamount((value) => value + 1000);
              }}
              className="p-2 font-black text-[10px] text-center bg-[var(--gray-20)]"
            >
              +1000
            </div>
            <div
              onClick={() => {
                setDepamount((value) => value + 5000);
              }}
              className="p-2 font-black text-[10px] text-center bg-[var(--gray-20)]"
            >
              +5000
            </div>
            <div
              onClick={() => {
                setDepamount((value) => value + 10000);
              }}
              className="p-2 font-black text-[10px] text-center bg-[var(--gray-20)]"
            >
              +10000
            </div>
          </div>

          <div className="text-right">
            <Button btnStyle="w-[100px] mt-5 p-1 text-center bg-[var(--green)] rounded">
              {isPen ? "Processing..." : "Deposit"}
            </Button>
          </div>
        </form>
      </>
    </ModalFrame>
  );
}
