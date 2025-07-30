"use client";
import { useState } from "react";
import { confirmSpin, cancelConfirmSpin, handleSpin } from "@/utils/miniGame";

//components
import Spinner from "./Spinner";
import ErrorModal from "./modal/ErrorModal";
import ResultModal from "./modal/ResultModal";
import StakeSlector from "./StakeSlector";

type PayGamerProbs = {
  gameInfo: {
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
  };
};

export default function PayGamer({ gameInfo }: PayGamerProbs) {
  const { balance, setBalance } = gameInfo;

  const [stake, setStake] = useState(100);
  const [con, setIscon] = useState(false);
  const [isErr, setiserr] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [winType, setWinType] = useState("");
  const [amontWon, setAmountWon] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  function onReset() {
    setStake(100);
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
            Bal:
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
              onChange={(e) => setStake(Number(e.target.value))}
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
            className={`w-[100px] p-1 font-black rounded-lg transition-all duration-200 ${
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
              className="w-full font-black block p-2 bg-[var(--gray-10)] cursor"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleSpin(
                  balance,
                  stake,
                  spinning,
                  setErrmsg,
                  setiserr,
                  setIscon,
                  setBalance,
                  setSpinning,
                  setWinType,
                  setAmountWon,
                  setResult
                );
              }}
              className="w-full font-black block p-2 bg-[var(--green)] cursor shadow-xl"
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
