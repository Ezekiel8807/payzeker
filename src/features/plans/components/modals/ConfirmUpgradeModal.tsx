import React from "react";
import ModalFrame2 from "@/shared/components/modals/ModalFrame2";
import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";
import ConfirmActions from "@/shared/components/ui/ConfirmActions";
import { Cancel, Continue } from "@/shared/utils/modalFunc";

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
      <h1 className="relative capitalize text-center font-black p-3 text-3xl bg-slate-50">
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
            <CurrencyDisplay amount={price} showSuffix={false} />
          </span>
        </div>
      </div>

      <div className="text-right">
        <ConfirmActions onCancel={handleCancleClick} onConfirm={handleConfirmClick} />
      </div>
    </ModalFrame2>
  );
}
