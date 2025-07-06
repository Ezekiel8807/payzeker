"use client";
import { useState } from "react";

//components
import Spinner from "./Spinner";
import ResultModal from "./modal/ResultModal";

export default function PayGamer() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<null | string>(null);

  const handleSpin = async () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    // Fake delay for animation
    await new Promise((res) => setTimeout(res, 3000));

    // Simulate backend result
    const rand = Math.random() * 100;

    let outcome = "Try Again";
    if (rand <= 2) outcome = "Jackpot 🎉";
    else if (rand <= 10) outcome = "Big Win";
    else if (rand <= 25) outcome = "Break Even";
    else if (rand <= 50) outcome = "Small Win";

    setResult(outcome);
    setSpinning(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-tr from-green-600 to-black-700 text-white rounded-3xl shadow-2xl">
      <h2 className="text-center text-3xl font-bold mb-4">Lucky Spin 🎰</h2>
      <p className="text-center mb-6">Spin for ₦100. Win up to ₦1000!</p>

      <div className="flex justify-center mb-6">
        <Spinner spinning={spinning} />
      </div>

      <div className="div">
        <div className="flex flex-row ">
          <div>Bal: #500</div>
          <div>
            <input type="text" name="stake" id="" placeholder="Min #100" />
          </div>
        </div>

        <div className="flex flex-row ">
          <div>+100</div>
          <div>+500</div>
          <div>+1000</div>
        </div>

        <div className="flex flex-row ">
          <p>Stake: #2,000</p>
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
          >
            {spinning ? "Spinning..." : "Spin Now"}
          </button>
        </div>
      </div>

      {result && (
        <ResultModal result={result} onClose={() => setResult(null)} />
      )}
    </div>
  );
}
