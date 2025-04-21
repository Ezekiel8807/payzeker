import React from "react";
import ModalFrame2 from "./ModalFrame2";
import Button from "../Button";
import { Cancel, Continue } from "@/utils/modalFunc";

type ConfirmUpgradeModalProbs = {
  confirmInfo: {
    name: string;
    price: number;
  };
  setIscon: React.Dispatch<React.SetStateAction<boolean>>;
  UpgradeUser: () => void;
};

export default function ConfirmUpgradeModal({
  confirmInfo,
  setIscon,
  UpgradeUser,
}: ConfirmUpgradeModalProbs) {
  const { name, price } = confirmInfo;

  function handleCancleClick() {
    Cancel(setIscon);
  }

  function handleConfirmClick() {
    Continue(setIscon, UpgradeUser);
  }

  return (
    <ModalFrame2>
      <h1 className="relative capitalize text-center font-black p-3 text-3xl bg-[var(--gray-05)]">
        {name}
      </h1>

      <div className="p-5 text-center">
        You are about to subscribe to
        <div className="block">
          <span className="font-black capitalize text-[30px] text-[var(--green)]">
            {name}
          </span>
          plan
        </div>
        <div className="block">
          @
          <span className="font-black text-[30px]">
            {price.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </span>
        </div>
      </div>

      <div className="text-right">
        <div className="flex items-center justify-between">
          <Button
            btnAction={handleCancleClick}
            btnStyle="w-[100px] p-2 rounded font- black bg-[var(--gray-05)]"
          >
            Cancel
          </Button>

          <Button
            btnAction={handleConfirmClick}
            btnStyle="w-[100px] p-2 rounded font- black text-white bg-[var(--green)]"
          >
            Confirm
          </Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
