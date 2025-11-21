import { userTransLim5 } from "@/actions/transactionAction";

export default async function SpinHistoryCardCom() {
  const data = await userTransLim5();

  return (
    <div>
      {data.map(
        (h: {
          _id: string;
          userId: string;
          type: string;
          disc: string;
          amount: number;
          date: string;
        }) => (
          <div
            key={h._id}
            className="border border-[var(--gray-05)] shadow-md rounded"
          >
            <div className="w-full flex items-center justify-between">
              <div
                className={`h-full px-2 py-5 ${
                  h.type === "credit" ? "bg-green-300" : "bg-red-300"
                }`}
              >
                <span className="block font-black text-2xl -rotate-90">
                  {h.type === "credit" ? "Win" : "Loss"}
                </span>
              </div>

              <div className="p-2 flex flex-col flex-1 justify-between">
                <h1 className="font-black">{h.disc}</h1>
                <small className="text-xs">{h.date}</small>
                <div className="text-right font-black md:text-xl">
                  {h.amount.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
