import User from "@/shared/models/userModel";
import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import { fetchModelById } from "@/shared/utils/modelFunc";

//components
import PayGamer from "./PayGamer";
import SpinMotivate from "./SpinMotivate";
import SpinHistoryCardCom from "./SpinHistoryCardCom";

export default async function PayGameCom() {
  const token = await getToken();
  if (!token) return redirect("/login");

  const user = await fetchModelById(User, token.id);
  const { balance } = user.account;

  return (
    <>
      <SpinMotivate />

      <div className="card flex flex-col md:flex-row items-start justify-center gap-3 mb-5">
        <PayGamer balance={balance} />

        <div className="w-full p-3">
          <h1 className="font-black text-2xl mb-3">History</h1>

          <div className="flex flex-col gap-3">
            <SpinHistoryCardCom />
          </div>
        </div>
      </div>
    </>
  );
}
