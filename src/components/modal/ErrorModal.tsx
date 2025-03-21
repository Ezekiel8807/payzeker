import React from "react";
import Image from "next/image";

//components
import Button from "../Button";
import ModalFrame2 from "./ModalFrame2";

type SuccessModalPProbs = {
  errMsg?: string;
};

export default function ErrorModal({ errMsg }: SuccessModalPProbs) {
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
        <h1 className="font-black text-[40px] text-center">Error!</h1>

        <div className="p-5 border-2 border-[#ff0000] bg-[#ff000020] text-center rounded-lg">
          {errMsg}
        </div>

        <div className="text-right">
          <Button btnStyle="mt-5">Cancel</Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
