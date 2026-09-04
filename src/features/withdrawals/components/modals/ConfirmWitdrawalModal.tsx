import { Cancel, Continue } from "@/shared/utils/modalFunc";

//components
import ModalFrame2 from "@/shared/components/modals/ModalFrame2";
import ConfirmActions from "@/shared/components/ui/ConfirmActions";
import InfoRow from "@/shared/components/ui/InfoRow";
import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";

type ConfirmWitdrawalModalProbs = {
  confirmInfo: {
    fullname: string;
    bankName: string;
    bankAcctNo: string;
    amount: number;
  };
  setIsconwitmodal: React.Dispatch<React.SetStateAction<boolean>>;
  withdrawalFunc: () => void;
  isProcessing?: boolean;
};

export default function ConfirmWitdrawalModal({
  confirmInfo,
  setIsconwitmodal,
  withdrawalFunc,
  isProcessing = false,
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
      <h1 className="font-black p-4 text-2xl bg-slate-50 rounded-xl">
        Confirm Withdrawal!
      </h1>

      <div className="mt-3 mx-auto">
        <InfoRow label="Name">{fullname}</InfoRow>
        <InfoRow label="Bank">{bankName}</InfoRow>
        <InfoRow label="Acct No">{bankAcctNo}</InfoRow>
        <InfoRow label="Amount">
          <CurrencyDisplay amount={amount} showSuffix={false} />
        </InfoRow>
      </div>

      <div className="text-right">
        <ConfirmActions
          onCancel={handleCancleClick}
          onConfirm={handleConfirmClick}
          confirmDisabled={isProcessing}
          className={isProcessing ? "opacity-50 pointer-events-none" : ""}
        />
      </div>
    </ModalFrame2>
  );
}
