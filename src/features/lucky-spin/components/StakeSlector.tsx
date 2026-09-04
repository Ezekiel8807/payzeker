"use client";

import QuickAmountSelector from "@/shared/components/ui/QuickAmountSelector";

export default function StakeSlector({
  onAdd,
  onReset,
}: {
  onAdd: React.Dispatch<React.SetStateAction<number>>;
  onReset: () => void;
}) {
  return (
    <QuickAmountSelector
      amounts={[100, 500, 1000, 5000]}
      onAdd={(amount) => onAdd((prev) => prev + amount)}
      onReset={onReset}
      variant="add"
      className="my-3"
    />
  );
}
