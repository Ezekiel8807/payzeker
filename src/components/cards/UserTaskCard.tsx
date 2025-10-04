"use client";
import React from "react";
import { Trash2 } from "lucide-react";

interface TaskCardProps {
  title: string;
  status: "Pending" | "Rejected" | "Completed";
  dateLabel: string;
  dateValue: string;
  onActionClick?: () => void;
  onDelete?: () => void;
}

export default function UserTaskCard({
  title,
  status,
  dateLabel,
  dateValue,
  onActionClick,
  onDelete,
}: TaskCardProps) {
  const statusColor = {
    Completed: "text-green-600",
    Rejected: "text-red-500",
    Pending: "text-yellow-500",
  };

  const getActionButton = () => {
    if (status === "Rejected") {
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
        {status === "Pending" ? "View Details" : "Reactivate"}
      </button>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-100 relative">
      <h2 className="font-semibold text-gray-800">{title}</h2>

      <p className="text-sm text-gray-600 mt-1">
        Status:
        <span
          className={`${statusColor[status]} font-medium`}
        >{` ${status}`}</span>
      </p>
      <p className="text-sm text-gray-500">
        {dateLabel}: {dateValue}
      </p>

      <div className="flex mt-3 items-center justify-between">
        <div>{getActionButton()}</div>
        <div className="flex gap-2">
          {onDelete && (
            <button
              onClick={onDelete}
              title="Delete Task"
              className="p-2 rounded-full hover:bg-red-100 text-red-500 transition"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
