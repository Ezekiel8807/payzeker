"use client";
import { useState } from "react";
import { Cancel } from "@/shared/utils/modalFunc";
import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import { handleSpinAction } from "@/features/lucky-spin/actions/miniGameAction";

//components
import Spinner from "./Spinner";
import ErrorModal from "@/shared/components/modals/ErrorModal";
import ResultModal from "@/shared/components/modals/ResultModal";
import StakeSlector from "./StakeSlector";
import useFormState from "@/shared/hooks/useFormState";
import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";
import ConfirmActions from "@/shared/components/ui/ConfirmActions";

type PayGamerProbs = {
  balance: number;
};

export default function PayGamer({ balance }: PayGamerProbs) {
  const [stake, setStake] = useState(100);
  const [con, setIscon] = useState(false);
  const { isErr, setIserr: setiserr, errMsg, setErrmsg, isPen: isProcessing, setIspen: setIsProcessing } = useFormState();
  const [spinning, setSpinning] = useState(false);
  const [winType, setWinType] = useState("");
  const [amontWon, setAmountWon] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  function confirmSpin(
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    stateSetter(true);
  }

  function cancelConfirmSpin() {
    Cancel(setIscon);
  }

  function onReset() {
    setStake(100);
  }

  async function handlespin() {
    if (isProcessing || spinning) return;
    setIsProcessing(true);

    const isLogin = await getToken();
    if (!isLogin) redirect("/login");

    if (stake > balance || stake < 100) {
      setIscon(false);
      setSpinning(false);
      setIsProcessing(false);
      setErrmsg("Insufficient funds or Invalid Amount!");
      setiserr(true);
      return;
    }

    setIscon(false);
    setSpinning(true);

    const handleSpinActionRes = await handleSpinAction(stake, balance);
    if (handleSpinActionRes.error) {
      setIscon(false);
      setSpinning(false);
      setIsProcessing(false);
      setErrmsg(handleSpinActionRes.msg);
      setiserr(true);
      return;
    }

    // Fake delay for animation
    await new Promise((res) => setTimeout(res, 2000));

    setSpinning(false);
    setWinType(handleSpinActionRes["result"]!.winType);
    setAmountWon(handleSpinActionRes["result"]!.amountWon);
    setResult(handleSpinActionRes["result"]!.outcome);
    setIsProcessing(false);
  }

  return (
    <div className="w-full relative p-5 max-w-md bg-white text-sm rounded-card shadow-card">
      <h2 className="text-2xl font-black text-ink">Lucky Spin 🎰</h2>
      <small className="text-[13px] text-ink-muted">
        One Spin Could Change Everything
      </small>

      <div className="flex justify-center my-5">
        <Spinner spinning={spinning} />
      </div>

      <div className="relative">
        <div className="flex flex-row items-center justify-between mb-2">
          <div className="font-black text-ink">
            Bal:{" "}
            <CurrencyDisplay amount={balance} showSuffix={false} />
          </div>

          <div className="w-[100px]">
            <input
              aria-label="Stake amount input"
              className="input !px-2 !py-1 text-right"
              type="text"
              name=""
              id=""
              value={stake.toString()}
              onChange={(e) => {
                const notNumber = isNaN(Number(e.target.value));
                if (notNumber) return;
                setStake(Number(e.target.value));
              }}
            />
          </div>
        </div>

        <StakeSlector onAdd={setStake} onReset={onReset} />

        <div className="flex flex-row items-center justify-between mt-2 gap-2">
          <p className="text-sm text-ink">
            Stake:{" "}
            <span className="font-bold">
              <CurrencyDisplay amount={stake} showSuffix={false} />
            </span>
          </p>

          <button
            onClick={() => {
              confirmSpin(setIscon);
            }}
            disabled={spinning}
            className={`w-[100px] ${
              spinning
                ? "btn bg-gray-200 text-gray-500"
                : "btn btn-primary"
            }`}
          >
            {spinning ? "Spinning..." : "Spin Now"}
          </button>
        </div>
      </div>

      {con && (
        <div className="w-full absolute bottom-0 left-0 overflow-hidden rounded-card border border-slate-100 bg-white shadow-modal">
          <div className="p-5">
            <p className="text-lg font-black mb-1 text-ink">User stake</p>
            <div className="w-full h-px bg-slate-100"></div>
            <div className="mt-3 flex flex-row items-center justify-between text-ink">
              <div className="font-medium">Total stake:</div>
              <div className="font-black">
                <CurrencyDisplay amount={stake} showSuffix={false} />
              </div>
            </div>
          </div>

          <ConfirmActions
            onCancel={cancelConfirmSpin}
            onConfirm={handlespin}
            cancelLabel="Cancel"
            confirmLabel="Confirm"
            confirmDisabled={isProcessing}
            className="w-full"
          />
        </div>
      )}

      {isErr && <ErrorModal errMsg={errMsg} setIserr={setiserr} />}

      {result && (
        <ResultModal
          result={result}
          typeOfWin={winType}
          amountWon={amontWon}
          onClose={() => setResult(null)}
        />
      )}
    </div>
  );
}
