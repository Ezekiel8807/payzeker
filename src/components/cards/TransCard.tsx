// import Image from "next/image";

export default function TransCard({
  transCardInfo,
}: {
  transCardInfo: {
    _id: string;
    type: string;
    amount: number;
    status: string;
    disc: string;
    date: string;
  };
}) {
  const day = new Date(transCardInfo.date).getDay();
  const mon = new Date(transCardInfo.date).getMonth();
  const yrs = new Date(transCardInfo.date).getFullYear();
  const hrs = new Date(transCardInfo.date).getHours();
  const mins = new Date(transCardInfo.date).getMinutes();
  const date = `${day}/${mon}/${yrs} - ${hrs}:${mins} ${
    hrs > 12 ? "PM" : "AM"
  }`;
  return (
    <div className="w-full p-2 flex flex-row items-center justify-between gap-3 bg-[var(--gray-05)] rounded">
      <div className="flex flex-row gap-2">
        <div className="w-[30px] h-[30px] flex items-center justify-center bg-[var(--green-trans)] text-center rounded">
          B
        </div>
        <div className="font-light text-[10px]">
          <p className="font-black capitalize">
            {transCardInfo.type}- {transCardInfo.disc}
          </p>
          <p className="text-[11px]">{transCardInfo._id}</p>
          <p className="text-[8px]">{date}</p>
        </div>
      </div>
      <div className="text-end">
        <p className="font-black text-[12px]">
          {transCardInfo.type == "credit" && "+ "}
          {transCardInfo.type == "debit" && "- "}
          {transCardInfo.amount.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
        </p>
        <span
          className={`text-[8px] ${
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
