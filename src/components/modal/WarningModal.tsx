import React from "react";
import Image from "next/image";
import { Cancel } from "@/utils/modalFunc";
import { Continue } from "@/utils/modalFunc";

//components
import Button from "../Button";
import ModalFrame2 from "./ModalFrame2";

type SuccessModalProbs = {
  warningMsg?: string;
  setIswarning: React.Dispatch<React.SetStateAction<boolean>>;
  action?: () => void;
};

export default function WarningModal({
  warningMsg,
  setIswarning,
  action,
}: SuccessModalProbs) {
  //
  function handleCancleClick() {
    Cancel(setIswarning);
  }

  //
  function handleContinueClick() {
    Continue(setIswarning, action);
  }

  return (
    <ModalFrame2>
      <div className="p-2">
        <Image
          src="/icons/warn.png"
          width={150}
          height={150}
          className="m-auto"
          alt="Confirm msg con"
        />
        <h1 className="font-black text-[40px] text-center">Warning!</h1>

        <div className="p-5 border-2 border-[#ffff00] bg-[#ffff0020] text-center rounded-lg">
          {warningMsg}
        </div>

        <div className="flex items-center justify-between">
          <Button btnAction={handleCancleClick} btnStyle="mt-5">
            Cancel
          </Button>

          <Button btnAction={handleContinueClick} btnStyle="mt-5">
            Continue
          </Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
