import { getToken } from "@/actions/action";

import { Cancel } from "@/utils/modalFunc";
import { redirect } from "next/navigation";
import { handleSpinAction } from "@/actions/miniGameAction";

export function confirmSpin(
  stateSetter: React.Dispatch<React.SetStateAction<boolean>>
) {
  stateSetter(true);
}

export function cancelConfirmSpin(
  stateSetter: React.Dispatch<React.SetStateAction<boolean>>
) {
  Cancel(stateSetter);
}

export async function handleSpin(
  balance: number,
  stake: number,
  spinning: boolean,
  setErrmsg: React.Dispatch<React.SetStateAction<string>>,
  setiserr: React.Dispatch<React.SetStateAction<boolean>>,
  setIscon: React.Dispatch<React.SetStateAction<boolean>>,
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  setSpinning: React.Dispatch<React.SetStateAction<boolean>>,
  setResult: React.Dispatch<React.SetStateAction<null | string>>
) {
  const isLogin = await getToken();

  if (spinning) return;
  setSpinning(true);

  if (!isLogin) redirect("/login");

  setIscon(false);

  const handleSpinActionRes = await handleSpinAction(stake, balance);
  if (handleSpinActionRes.error) {
    setSpinning(false);
    setIscon(false);
    setErrmsg(handleSpinActionRes.msg);
    setiserr(true);
    return;
  }

  // Fake delay for animation
  await new Promise((res) => setTimeout(res, 2000));

  setBalance(handleSpinActionRes!.result!.finalBalance);
  setResult(handleSpinActionRes!.result!.outcome);
  setSpinning(false);
}
