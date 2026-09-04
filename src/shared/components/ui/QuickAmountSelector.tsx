"use client";

type QuickAmountSelectorProps = {
  amounts: number[];
  onAdd: (amount: number) => void;
  onReset?: () => void;
  variant?: "add" | "set";
  className?: string;
};

export default function QuickAmountSelector({
  amounts,
  onAdd,
  onReset,
  variant = "add",
  className = "",
}: QuickAmountSelectorProps) {
  const prefix = variant === "add" ? "+" : "";

  return (
    <div className={`flex flex-row items-center justify-between gap-2 ${className}`}>
      {amounts.map((amt) => (
        <button
          key={amt}
          type="button"
          onClick={() => onAdd(amt)}
          className="badge badge-gray font-black cursor-pointer hover:bg-slate-200 transition-colors"
        >
          {prefix}{amt.toLocaleString()}
        </button>
      ))}
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="badge bg-red-500 text-white font-black cursor-pointer hover:bg-red-600 transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
}
