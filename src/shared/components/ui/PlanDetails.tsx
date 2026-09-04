import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";

type PlanDetailsProps = {
  rank: number;
  minWithdrawal: number;
  maxWithdrawal: number;
  minEarning: number;
  price: number | null;
  tasksPerDay?: number;
  className?: string;
};

export default function PlanDetails({
  rank,
  minWithdrawal,
  maxWithdrawal,
  minEarning,
  price,
  tasksPerDay,
  className = "",
}: PlanDetailsProps) {
  return (
    <div className={`p-3 bg-slate-50 rounded-xl ${className}`}>
      <ul className="px-5 text-[12px]">
        <li className="list-disc">Rank {rank}</li>
        <li className="list-disc">{tasksPerDay ?? rank} task{rank !== 1 ? "s" : ""} per day</li>
        <li className="list-disc">#{minWithdrawal.toLocaleString()} min withdrawal</li>
        <li className="list-disc">#{maxWithdrawal.toLocaleString()} max withdrawal</li>
        <li className="list-disc">#{minEarning.toLocaleString()} min monthly earning</li>
      </ul>
      <div className="w-[200px] flex items-center justify-center gap-2">
        <span className="font-black text-[12px]">Price:</span>
        <h2 className="font-black text-center text-[16px] text-[var(--green)]">
          {price != null ? (
            <CurrencyDisplay amount={price} showSuffix={false} />
          ) : (
            "Free"
          )}
        </h2>
      </div>
    </div>
  );
}
