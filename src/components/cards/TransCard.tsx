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
      <div className="flex flex-row gap-2">
        <div className="w-[30px] h-[30px] flex items-center justify-center bg-[var(--green-trans)] text-center rounded">
          B
        </div>
        <div className="font-light text-[10px]">
          <p className="font-black capitalize">{transCardInfo.type}</p>
          <p className="text-[11px]">{transCardInfo._id}</p>
          <p className="text-[8px]">2/4/2025 7:15pm</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-black text-[12px]">
          {transCardInfo.type != "deposite" && "- "}
          {transCardInfo.amount.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
        </p>
        <span
          className={`text-[8px] float-end ${
            transCardInfo.status == "pending" && "bg-[#ffff00]"
          } ${transCardInfo.status == "successful" && "bg-[#00ff00]"} ${
            transCardInfo.status == "failed" && "bg-[#ff0000]"
          } px-1 text-center rounded-full`}
        >
          {transCardInfo.status}
        </span>
      </div>
    </div>
  );
}
