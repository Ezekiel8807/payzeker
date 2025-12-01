"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import DeleteIcon from "../ui/DeleteIcon";
import type { Notification } from "@/types";
import { formatNotificationTime } from "@/utils/notificationUtils";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMarkingRead, setIsMarkingRead] = useState(false);

  const handleMarkAsRead = async () => {
    if (notification.state === "read") return;

    setIsMarkingRead(true);
    try {
      await onMarkAsRead(notification._id);
    } finally {
      setIsMarkingRead(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Small delay to show the deleting animation before removal
    setTimeout(async () => {
      try {
        await onDelete(notification._id);
      } catch {
        setIsDeleting(false);
      }
    }, 150);
  };

  const isUnread = notification.state === "unread";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{
        opacity: isDeleting ? 0 : 1,
        y: 0,
        scale: isDeleting ? 0.95 : 1,
        x: isDeleting ? -20 : 0,
      }}
      exit={{
        opacity: 0,
        x: -100,
        scale: 0.8,
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
      transition={{
        duration: isDeleting ? 0.15 : 0.2,
        ease: "easeInOut",
      }}
      className={`w-full p-3 rounded-lg transition-all duration-200 ${
        isUnread
          ? "bg-[var(--green-trans)] border-l-4 border-[var(--green)]"
          : "bg-[var(--gray-10)]"
      } ${isDeleting ? "pointer-events-none" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm flex-1 leading-relaxed">{notification.message}</p>

        {isUnread && (
          <div className="w-2 h-2 bg-[var(--green)] rounded-full flex-shrink-0 mt-1" />
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {notification.createdAt && (
            <span className="text-xs text-gray-400">
              {formatNotificationTime(notification.createdAt)}
            </span>
          )}
          {isUnread && (
            <button
              onClick={handleMarkAsRead}
              disabled={isMarkingRead}
              className="text-xs text-[var(--green)] hover:text-[var(--green-dark)] font-medium transition-colors disabled:opacity-50"
            >
              {isMarkingRead ? "Marking..." : "Mark as read"}
            </button>
          )}
        </div>

        <div
          className={`flex items-center gap-1 ${
            isDeleting ? "opacity-50" : ""
          }`}
        >
          <DeleteIcon deleteNotis={handleDelete} />
        </div>
      </div>
    </motion.div>
  );
}
