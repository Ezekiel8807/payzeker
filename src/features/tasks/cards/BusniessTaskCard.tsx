"use client";
import { Icon } from "@iconify/react";
import StatusBadge from "@/shared/components/ui/StatusBadge";

interface TaskCardProps {
  title: string;
  status: "Ongoing" | "Expired" | "Inactive";
  dateLabel: string;
  dateValue: string;
  onActionClick?: () => void;
  onDelete?: () => void;
  onPause?: () => void;
}

export default function BusniessTaskCard({ title, status, dateLabel, dateValue, onActionClick, onDelete, onPause }: TaskCardProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-100 relative">
      <h2 className="font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">Status: <StatusBadge status={status} /></p>
      <p className="text-sm text-gray-500">{dateLabel}: {dateValue}</p>
      <div className="flex mt-3 items-center justify-between">
        <div>
          {status === "Expired" ? (
            <button className="mt-3 btn btn-danger cursor-not-allowed" disabled>Expired</button>
          ) : (
            <button onClick={onActionClick} className="mt-3 btn btn-primary">
              {status === "Ongoing" ? "View Details" : "Reactivate"}
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {onPause && status === "Ongoing" && (
            <button onClick={onPause} title="Pause Task" className="p-2 rounded-full hover:bg-yellow-100 text-yellow-500 transition">
              <Icon icon="mdi:pause-circle" width="20" height="20" />
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} title="Delete Task" className="p-2 rounded-full hover:bg-red-100 text-red-500 transition">
              <Icon icon="mdi:trash-can-outline" width="20" height="20" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
