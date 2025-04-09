//components
import TransCard from "../cards/TransCard";

export default function UserTrans({
  userId,
  trans,
}: {
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trans: any;
}) {
  const userTrans = trans.filter(
    (tran: { userId: string }) => tran.userId === userId
  );

  return (
    <div className="w-full h-[300px] overflow-y-scroll">
      <div className="flex flex-col gap-2">
        {userTrans.length > 0 ? (
          userTrans.map(
            (el: {
              _id: string;
              type: string;
              amount: number;
              status: string;
            }) => <TransCard key={el._id} transCardInfo={el} />
          )
        ) : (
          <div className="h-[200px] flex items-center justify-center">
            <p className="w-[200px] text-center text-gray-600">
              No transaction yet😎. Try depositing into your account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
