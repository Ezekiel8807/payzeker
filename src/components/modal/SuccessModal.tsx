import ModalFrame2 from "./ModalFrame2";
import Image from "next/image";
import { Continue } from "../../utils/modalFunc";
import Button from "../Button";

//
type SuccessModalProbs = {
  sucMsg?: string;
  setIssuc: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SuccessModal({ sucMsg, setIssuc }: SuccessModalProbs) {
  //
  function handleClick() {
    Continue(setIssuc);
  }
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
          <Button btnAction={handleClick} btnStyle="mt-5">
            Continue
          </Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
