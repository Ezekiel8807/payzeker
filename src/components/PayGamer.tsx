"use client";
import { useState } from "react";
import { comfirmSpin, cancelConfirmSpin } from "@/utils/miniGame";

//components
import Spinner from "./Spinner";
import ErrorModal from "./modal/ErrorModal";
import ResultModal from "./modal/ResultModal";

type PayGamerProbs = {
  gameInfo: {
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
  };
};

export default function PayGamer({ gameInfo }: PayGamerProbs) {
  const { balance } = gameInfo;

  const [stake, setStake] = useState(100);
  const [con, setIscon] = useState(false);
  const [isErr, setiserr] = useState(false);
  const spinning = false;
  const [result, setResult] = useState<null | string>(null);

  // bg-[#F7F9FA]

  return (
    <div className="relative max-w-md bg-[var(--gray-10)] text-sm rounded-lg shadow-lg">
      <div className="p-5">
        <h2 className="text-xl font-bold text-[#2D3436]">Lucky Spin 🎰</h2>
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
              {stake}
            </div>
          </div>

          <div className="flex flex-row my-3 items-center justify-between gap-2">
            {["100", "500", "1000", "5000"].map((val) => (
              <div
                key={val}
                className="w-[60px] p-1 text-center font-black bg-[var(--green)] hover:bg-[#019875] text-white text-[12px] rounded cursor-pointer"
                onClick={() => setStake((e) => (e += parseInt(val)))}
              >
                +{val}
              </div>
            ))}

            <div
              className="w-[60px] p-1 text-center font-black bg-[#FF6B6B] hover:bg-red-500 text-white text-[12px] rounded cursor-pointer"
              onClick={() => setStake(100)}
            >
              Reset
            </div>
          </div>

          <div className="flex flex-row items-center justify-between mt-2">
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
                comfirmSpin(setIscon);
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
            <div className="p-3">
              <p className="text-lg font-black">User stake</p>
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
                className="w-full block p-2 bg-[var(--gray-10)] cursor"
              >
                Cancel
              </button>
              <button className="w-full block p-2 bg-[var(--green)] cursor shadow-xl">
                Comfirm
              </button>
            </div>
          </div>
        )}

        {isErr && <ErrorModal errMsg={"Hello there"} setIserr={setiserr} />}

        {result && (
          <ResultModal result={result} onClose={() => setResult(null)} />
        )}
      </div>
    </div>
  );
}
