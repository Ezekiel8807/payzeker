import { useState } from "react";
import Button from "../Button";
import ModalFrame from "../modalFrame";

type DepositModalProbs = {
  depositInfo: {
    fullname: string;
    balance: number;
  };
  closeModal: () => void;
};

export default function DepositModal({
  depositInfo,
  closeModal,
}: DepositModalProbs) {
  const { fullname, balance } = depositInfo;
  const [amount, setAmount] = useState<number>();

  return (
    <ModalFrame title="Deposit" closeModal={closeModal}>
      <form className="w-[90%] md:w-[70%] my-5 mx-auto" action="">
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
          name="Amount"
          defaultValue={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
          placeholder={`Amount(NGN): min- #100`}
        />
        <div className="flex flex-row mt-2 items-center justify-between gap-2">
          <div
            onClick={() => {
              setAmount((value = 0) => value + 100);
            }}
            className="p-2 font-black text-[10px] text-center bg-[var(--gray-20)]"
          >
            +100
          </div>
          <div
            onClick={() => {
              setAmount((value = 0) => value + 500);
            }}
            className="p-2 font-black text-[10px] text-center bg-[var(--gray-20)]"
          >
            +500
          </div>
          <div
            onClick={() => {
              setAmount((value = 0) => value + 1000);
            }}
            className="p-2 font-black text-[10px] text-center bg-[var(--gray-20)]"
          >
            +1000
          </div>
          <div
            onClick={() => {
              setAmount((value = 0) => value + 5000);
            }}
            className="p-2 font-black text-[10px] text-center bg-[var(--gray-20)]"
          >
            +5000
          </div>
          <div
            onClick={() => {
              setAmount((value = 0) => value + 10000);
            }}
            className="p-2 font-black text-[10px] text-center bg-[var(--gray-20)]"
          >
            +10000
          </div>
        </div>

        <div className="text-right">
          <Button btnStyle="w-[100px] mt-5 p-1 text-center bg-[var(--green)] rounded">
            Deposit
          </Button>
        </div>
      </form>
    </ModalFrame>
  );
}
