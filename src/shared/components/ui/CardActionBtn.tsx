import Button from "./Button";

type CardActionBtnProbs = {
  isCon: boolean;
  isRej: boolean;
  rejectFunc?: () => void;
  confirmFunc?: () => void;
};

export default function CardActionBtn({ isCon, isRej, rejectFunc, confirmFunc }: CardActionBtnProbs) {
  return (
    <div className="mt-4 flex items-center justify-end gap-3 text-sm font-bold">
      <Button btnAction={rejectFunc} variant="danger" size="sm">
        {isRej ? "Rejecting..." : "Reject"}
      </Button>
      <Button btnAction={confirmFunc} variant="primary" size="sm">
        {isCon ? "Confirming..." : "Confirm"}
      </Button>
    </div>
  );
}
