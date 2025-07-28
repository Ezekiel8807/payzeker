// components/TaskCard.tsx
import React from "react";

interface TaskCardProps {
  title: string;
  status: "Ongoing" | "Expired" | "Inactive";
  dateLabel: string;
  dateValue: string;
  onActionClick?: () => void;
}

export default function TaskCard({
  title,
  status,
  dateLabel,
  dateValue,
  onActionClick,
}: TaskCardProps) {
  const statusColor = {
    Ongoing: "text-green-600",
    Expired: "text-red-500",
    Inactive: "text-yellow-500",
  };

  const getActionButton = () => {
    if (status === "Expired") {
      return (
        <button
          className="mt-3 bg-red-500 text-white text-sm px-4 py-2 rounded-xl cursor-not-allowed"
          disabled
        >
          Expired
        </button>
      );
    }

    return (
      <button
        onClick={onActionClick}
        className="mt-3 bg-[#29cd9c] hover:bg-[#22b891] text-white text-sm px-4 py-2 rounded-xl"
      >
        {status === "Ongoing" ? "View Details" : "Reactivate"}
      </button>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-100">
      <h2 className="font-semibold text-gray-800 mb-1">{title}</h2>
      <p className="text-sm text-gray-600">
        Status:{" "}
        <span className={`${statusColor[status]} font-medium`}>{status}</span>
      </p>
      <p className="text-sm text-gray-500">
        {dateLabel}: {dateValue}
      </p>
      {getActionButton()}
    </div>
  );
}
