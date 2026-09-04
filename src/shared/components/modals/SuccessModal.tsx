import ModalFrame2 from "./ModalFrame2";
import Image from "next/image";
import { Continue } from "@/shared/utils/modalFunc";
import Button from "@/shared/components/ui/Button";

type SuccessModalProbs = {
  sucMsg?: string;
  setIssuc: React.Dispatch<React.SetStateAction<boolean>>;
  direction?: string;
};

export default function SuccessModal({ sucMsg, setIssuc, direction }: SuccessModalProbs) {
  function handleClick() {
    if (direction) {
      Continue(setIssuc, undefined, direction);
    } else {
      Continue(setIssuc);
    }
  }

  return (
    <ModalFrame2>
      <div className="text-center">
        <Image src="/icons/suc.png" width={110} height={110} className="mx-auto" alt="Success msg con" />
        <h1 className="mt-2 text-2xl font-black text-ink">Success!</h1>
        <div className="mt-4 rounded-xl bg-[var(--green)]/10 p-4 text-sm font-semibold text-[var(--green-dark)]">
          {sucMsg}
        </div>
        <div className="mt-5">
          <Button btnAction={handleClick} variant="primary" fullWidth>
            Continue
          </Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
