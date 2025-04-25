//components
import Button from "./Button";

type CardActionBtnProbs = {
  isCon: boolean;
  isRej: boolean;
  rejectFunc?: () => void;
  confirmFunc?: () => void;
};

export default function CardActionBtn({
  isCon,
  isRej,
  rejectFunc,
  confirmFunc,
}: CardActionBtnProbs) {
  return (
    <div className="flex mt-3 items-center justify-end text-[14px] font-black gap-3">
      <Button btnAction={rejectFunc}>
        {isRej ? "Rejecting..." : "Reject"}
      </Button>
      <Button
        btnAction={confirmFunc}
        btnStyle=" p-1 text-white bg-[var(--green)] rounded"
      >
        {isCon ? "Confirming..." : "Confirm"}
      </Button>
    </div>
  );
}
