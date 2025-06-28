import React from "react";

export default function ResultModal({
  result,
  onClose,
}: {
  result: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 text-center max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">🎉 Result</h2>
        <p className="text-xl font-semibold text-purple-700">{result}</p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
