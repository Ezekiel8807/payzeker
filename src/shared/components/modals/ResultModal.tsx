import React from "react";

interface ResultModalProps {
  result: string | null;
  typeOfWin?: string;
  amountWon?: number;
  onClose: () => void;
}

export default function ResultModal({ result, typeOfWin, amountWon, onClose }: ResultModalProps) {
  const getContent = () => {
    switch (result) {
      case "win":
        return {
          title: "Congratulations!",
          message: "You've won this round. Well done!",
          details: (
            <>
              <p className="text-gray-700 font-medium flex items-center gap-2">🏅 {typeOfWin || "Big win"}</p>
              <p className="text-black text-2xl font-bold mt-1">💰 ₦{amountWon?.toLocaleString() || "0"}</p>
            </>
          ),
        };
      case "lose":
        return {
          title: "Oops!",
          message: "You didn't win this time.",
          details: <p className="text-red-600 font-medium text-base">❌ Better luck next time!</p>,
        };
      case "break-even":
        return {
          title: "Break Even",
          message: "You neither won nor lost.",
          details: <p className="text-yellow-600 font-medium text-base">⚖️ You broke even.</p>,
        };
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-2xl p-6 bg-[#e9fff9] shadow-xl text-center space-y-4">
        <div className="text-3xl font-semibold text-black flex flex-col items-center gap-1">
          <span>🎉</span>
          <h2>{content.title}</h2>
        </div>
        <p className="text-gray-600">{content.message}</p>
        <div className="rounded-xl bg-white p-4 shadow-md space-y-1">{content.details}</div>
        <button
          onClick={onClose}
          className="w-full mt-2 py-2 rounded-full bg-[#29cd9c] hover:bg-[#25b994] text-white font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
