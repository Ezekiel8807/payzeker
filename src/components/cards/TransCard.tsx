// import Image from "next/image";

export default function TransCard({
  transCardInfo,
}: {
  transCardInfo: {
    _id: string;
    type: string;
    amount: number;
    status: string;
  };
}) {
  return (
    <div className="w-full p-2 flex flex-row items-center justify-between gap-3 bg-[var(--gray-05)] rounded">
      <div className="flex flex-row justify-start gap-2">
        <div className="w-[30px] h-[30px] flex items-center justify-center bg-[var(--green-trans)] text-center rounded">
          B
        </div>
        <div className="font-light text-[10px]">
          <p className="font-black">{transCardInfo.type}</p>
          <p className="text-[11px]">{transCardInfo._id}</p>
          <p className="text-[8px]">2/4/2025 7:15pm</p>
        </div>
      </div>
      <div>
        <p className="font-black text-[12px]">{`#${transCardInfo.amount}`}</p>
        <span
          className={`text-[9px] ${
            transCardInfo.status == "pending" && "bg-[#ffff00]"
          } ${transCardInfo.status == "successful" && "bg-[#00ff00]"} ${
            transCardInfo.status == "failed" && "bg-[#ff0000]"
          } px-1 rounded-full`}
        >
          {transCardInfo.status}
        </span>
      </div>
    </div>
  );
}
