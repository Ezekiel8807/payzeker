import React from "react";
import Image from "next/image";
import { Cancel } from "@/shared/utils/modalFunc";
import Button from "@/shared/components/ui/Button";
import ModalFrame2 from "./ModalFrame2";

type ErrorModalProbs = {
  errMsg?: string;
  setIserr: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ErrorModal({ errMsg, setIserr }: ErrorModalProbs) {
  function handleClick() { Cancel(setIserr); }

  return (
    <ModalFrame2>
      <div className="text-center">
        <Image src="/icons/err.png" width={110} height={110} className="mx-auto" alt="Error msg con" />
        <h1 className="mt-2 text-2xl font-black text-ink">Error!</h1>
        <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">{errMsg}</div>
        <div className="mt-5">
          <Button btnAction={handleClick} variant="ghost" fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
