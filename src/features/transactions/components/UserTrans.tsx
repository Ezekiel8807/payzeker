import TransCard from "@/features/transactions/cards/TransCard";

export default function UserTrans({ userId, trans }: {
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trans: any;
}) {
  const userTrans = trans.filter((tran: { userId: string }) => tran.userId === userId).reverse();

  return (
    <div className="w-full mb-5 overflow-y-auto slim-scroll">
      <div className="flex flex-col gap-2">
        {userTrans.length > 0 ? (
          userTrans.map((el: { _id: string; type: string; amount: number; status: string; disc: string; date: string }) => (
            <TransCard key={el._id} transCardInfo={el} />
          ))
        ) : (
          <div className="h-[200px] flex items-center justify-center">
            <p className="w-[200px] text-center text-ink-muted">No transaction yet😎. Try depositing into your account.</p>
          </div>
        )}
      </div>
    </div>
  );
}
