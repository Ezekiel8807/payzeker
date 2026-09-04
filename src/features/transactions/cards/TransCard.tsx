import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";
import StatusBadge from "@/shared/components/ui/StatusBadge";

export default function TransCard({ transCardInfo }: {
  transCardInfo: { _id: string; type: string; amount: number; status: string; disc: string; date: string };
}) {
  const d = new Date(transCardInfo.date);
  const date = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()} ${d.getHours() > 12 ? "PM" : "AM"}`;

  return (
    <div className="w-full p-3 flex flex-row items-center justify-between gap-3 bg-white border border-slate-100 shadow-sm rounded-xl">
      <div className="flex flex-row gap-2">
        <div className="w-8 h-8 flex items-center justify-center bg-[var(--green)]/10 text-[var(--green-dark)] rounded-lg">B</div>
        <div className="font-light text-xs">
          <p className="font-black capitalize">{transCardInfo.type}- {transCardInfo.disc}</p>
          <p className="text-[10px] text-ink-muted">{transCardInfo._id}</p>
          <p className="text-[10px] text-ink-muted">{date}</p>
        </div>
      </div>
      <div className="text-end">
        <p className="font-black text-sm">
          {transCardInfo.type == "credit" && "+ "}
          {transCardInfo.type == "debit" && "- "}
          <CurrencyDisplay amount={transCardInfo.amount} showSuffix={false} />
        </p>
        <StatusBadge status={transCardInfo.status} className="text-[10px]" />
      </div>
    </div>
  );
}
