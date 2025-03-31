import { Cancel, Continue } from "@/utils/modalFunc";

//components
import Button from "../Button";
import ModalFrame2 from "./ModalFrame2";

type ConfirmWitdrawalModalProbs = {
  confirmInfo: {
    fullname: string;
    bankName: string;
    bankAcctNo: number;
    amount: number;
  };
  setIsconwitmodal: React.Dispatch<React.SetStateAction<boolean>>;
  withdrawalFunc: () => void;
};

export default function ConfirmWitdrawalModal({
  confirmInfo,
  setIsconwitmodal,
  withdrawalFunc,
}: ConfirmWitdrawalModalProbs) {
  const { fullname, bankName, bankAcctNo, amount } = confirmInfo;

  function handleCancleClick() {
    Cancel(setIsconwitmodal);
  }

  function handleConfirmClick() {
    Continue(setIsconwitmodal, withdrawalFunc);
  }

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
          <span className="text-right">{`#${amount}`}</span>
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

          <Button
            btnAction={handleConfirmClick}
            btnStyle="w-[100px] p-2 rounded font- black text-white bg-[var(--green)]"
          >
            Confirm
          </Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
