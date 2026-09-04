type CurrencyDisplayProps = {
  amount: number;
  className?: string;
  showSuffix?: boolean;
};

export default function CurrencyDisplay({
  amount,
  className = "",
  showSuffix = true,
}: CurrencyDisplayProps) {
  const formatted = amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  return (
    <span className={className}>
      {formatted}
      {showSuffix && <span className="ms-1 text-[var(--green)]">NGN</span>}
    </span>
  );
}
