import ModalFrame2 from "./ModalFrame2";
import Button from "../Button";
import Image from "next/image";

type SuccessModalProbs = {
  sucMsg?: string;
};

export default function SuccessModal({ sucMsg }: SuccessModalProbs) {
  return (
    <ModalFrame2>
      <div className="p-2">
        <Image
          src="/icons/suc.png"
          width={150}
          height={150}
          className="m-auto"
          alt="Success msg con"
        />
        <h1 className="font-black text-[40px] text-center">Success!</h1>

        <div className="p-5 border-2 border-[#00ff00] bg-[#00ff0020] text-center rounded-lg">
          {sucMsg}
        </div>

        <div className="text-right">
          <Button btnStyle="mt-5">Continue</Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
