import React from "react";
import Image from "next/image";
import { Cancel, Continue } from "@/shared/utils/modalFunc";
import Button from "@/shared/components/ui/Button";
import ModalFrame2 from "./ModalFrame2";

type WarningModalProbs = {
  warningMsg?: string;
  setIswarning: React.Dispatch<React.SetStateAction<boolean>>;
  action?: () => void;
};

export default function WarningModal({ warningMsg, setIswarning, action }: WarningModalProbs) {
  function handleCancleClick() { Cancel(setIswarning); }
  function handleContinueClick() { Continue(setIswarning, action); }

  return (
    <ModalFrame2>
      <div className="text-center">
        <Image src="/icons/warn.png" width={110} height={110} className="mx-auto" alt="Confirm msg con" />
        <h1 className="mt-2 text-2xl font-black text-ink">Warning!</h1>
        <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm font-semibold text-amber-700">{warningMsg}</div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button btnAction={handleCancleClick} variant="ghost" fullWidth>
            Cancel
          </Button>
          <Button btnAction={handleContinueClick} variant="primary" fullWidth>
            Continue
          </Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
