"use client";
import { useState } from "react";
import { Cancel } from "@/utils/modalFunc";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { handleSpinAction } from "@/actions/miniGameAction";

//components
import Spinner from "./Spinner";
import ErrorModal from "./modal/ErrorModal";
import ResultModal from "./modal/ResultModal";
import StakeSlector from "./StakeSlector";

type PayGamerProbs = {
  balance: number;
};

export default function PayGamer({ balance }: PayGamerProbs) {
  const [stake, setStake] = useState(100);
  const [con, setIscon] = useState(false);
  const [isErr, setiserr] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [winType, setWinType] = useState("");
  const [amontWon, setAmountWon] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  function confirmSpin(
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    stateSetter(true);
  }

  function cancelConfirmSpin(
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    Cancel(stateSetter);
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
    <div className="relative p-5 max-w-md bg-[var(--gray-10)] text-sm rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#2D3436]">Lucky Spin 🎰</h2>
      <small className="text-[13px] text-[#636e72]">
        One Spin Could Change Everything
      </small>

      <div className="flex justify-center my-5">
        <Spinner spinning={spinning} />
      </div>

      <div className="relative">
        <div className="flex flex-row items-center justify-between mb-2">
          <div className="font-black text-[#2D3436]">
            Bal:{" "}
            {balance.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </div>

          <div className="w-[100px] p-1 text-right outline-none border rounded bg-white text-[#2D3436]">
            <input
              aria-label="Stake amount input"
              className="w-full text-right outline-none"
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
          <p className="text-sm text-[#2D3436]">
            Stake:{" "}
            <span className="font-bold">
              {stake.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })}
            </span>
          </p>

          <button
            onClick={() => {
              confirmSpin(setIscon);
            }}
            disabled={spinning}
            className={`w-[100px] px-3 py-2 font-black rounded-lg transition-all duration-200 ${
              spinning
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[var(--green)] hover:bg-[#019875] text-white"
            }`}
          >
            {spinning ? "Spinning..." : "Spin Now"}
          </button>
        </div>
      </div>

      {con && (
        <div className="w-full absolute bottom-0 left-0 bg-[var(--green)] rounded">
          <div className="p-5">
            <p className="text-lg font-black mb-1">User stake</p>
            <div className="w-full p-[2px] bg-[var(--gray-10)]"></div>
            <div className="mt-3 flex flex-row items-center justify-between">
              <div className="font-medium">Total stake:</div>
              <div className="font-black">
                {stake.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => {
                cancelConfirmSpin(setIscon);
              }}
              className="w-full font-black block p-3 bg-[var(--gray-10)] cursor"
            >
              Cancel
            </button>
            <button
              onClick={handlespin}
              disabled={isProcessing}
              className="w-full font-black block p-3 bg-[var(--green)] cursor shadow-xl"
            >
              Comfirm
            </button>
          </div>
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
