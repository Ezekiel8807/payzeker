import { Cancel } from "@/utils/modalFunc";

//components
import Button from "../Button";
import ModalFrame2 from "./ModalFrame2";

type ConfirmWitdrawalModalProbs = {
  confirmInfo: {
    fullname: string;
    bankName: string;
    bankAcctNo: number;
    witAmount: number | undefined;
  };
  setIsconwitmodal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConfirmWitdrawalModal({
  confirmInfo,
  setIsconwitmodal,
}: ConfirmWitdrawalModalProbs) {
  const { fullname, bankName, bankAcctNo, witAmount } = confirmInfo;

  function handleCancleClick() {
    Cancel(setIsconwitmodal);
  }

  //   function handleConfirmClick() {
  //   }

  //
  return (
    <ModalFrame2>
      <h1 className="relative font-black p-3 text-3xl bg-[var(--gray-05)]">
        Confirm Withdrawal!
      </h1>

      <div className="mt-3 mx-auto">
        <div className="flex p-2 items-center justify-between">
          <span className="">Name:</span>
          <span className="text-right">{fullname}</span>
        </div>
        <div className="flex p-2 items-center justify-between">
          <span className="">Bank:</span>
          <span className="text-right">{bankName}</span>
        </div>
        <div className="flex p-2 items-center justify-between">
          <span className="">Acct No:</span>
          <span className="text-right">{bankAcctNo}</span>
        </div>
        <div className="flex p-2 items-center justify-between">
          <span className="">Amount:</span>
          <span className="text-right">{`#${witAmount}`}</span>
        </div>
      </div>

      <div className="text-right">
        <div className="flex items-center justify-between">
          <Button
            btnAction={handleCancleClick}
            btnStyle="w-[100px] p-2 rounded font- black bg-[var(--gray-05)]"
          >
            Cancel
          </Button>

          <Button btnStyle="w-[100px] p-2 rounded font- black text-white bg-[var(--green)]">
            Confirm
          </Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
