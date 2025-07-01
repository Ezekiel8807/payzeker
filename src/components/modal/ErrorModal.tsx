import React from "react";
import Image from "next/image";
import { Cancel } from "@/utils/modalFunc";

//components
import Button from "../Button";
import ModalFrame2 from "./ModalFrame2";

type SuccessModalProbs = {
  errMsg?: string;
  setIserr: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ErrorModal({ errMsg, setIserr }: SuccessModalProbs) {
  //
  function handleClick() {
    Cancel(setIserr);
  }
  return (
    <ModalFrame2>
      <div className="p-2">
        <Image
          src="/icons/err.png"
          width={150}
          height={150}
          className="m-auto"
          alt="Error msg con"
        />
        <h1 className="font-black text-[40px] text-center text-black">
          Error!
        </h1>

        <div className="p-5 border-2 border-[#ff0000] bg-[#ff000020] text-black text-center rounded-lg">
          {errMsg}
        </div>

        <div className="text-right">
          <Button btnAction={handleClick} btnStyle="mt-5 text-black">
            Cancel
          </Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
