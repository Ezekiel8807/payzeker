"use client";
import Button from "@/shared/components/ui/Button";

type ConfirmActionsProps = {
  onCancel: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmDisabled?: boolean;
  className?: string;
};

export default function ConfirmActions({
  onCancel,
  onConfirm,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  confirmDisabled = false,
  className = "",
}: ConfirmActionsProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Button btnAction={onCancel} variant="ghost" size="sm" className="min-w-[7rem]!">
        {cancelLabel}
      </Button>
      <Button btnAction={onConfirm} disabled={confirmDisabled} variant="primary" size="sm" className="min-w-[7rem]!">
        {confirmLabel}
      </Button>
    </div>
  );
}
