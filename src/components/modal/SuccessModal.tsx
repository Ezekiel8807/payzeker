import ModalFrame2 from "./ModalFrame2";
import Image from "next/image";
import { Continue } from "../../utils/modalFunc";
import Button from "../Button";

//
type SuccessModalProbs = {
  sucMsg?: string;
  setIssuc: React.Dispatch<React.SetStateAction<boolean>>;
  direction?: string;
};

export default function SuccessModal({
  sucMsg,
  setIssuc,
  direction,
}: SuccessModalProbs) {
  //
  function handleClick() {
    if (direction) {
      Continue(setIssuc, undefined, direction);
    } else {
      Continue(setIssuc);
    }
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
        <h1 className="font-black text-[40px] text-center text-black">
          Success!
        </h1>

        <div className="p-5 border-2 border-[#00ff00] bg-[#00ff0020] text-black text-center rounded-lg">
          {sucMsg}
        </div>

        <div className="text-right">
          <Button btnAction={handleClick} btnStyle="mt-5 text-black">
            Continue
          </Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
