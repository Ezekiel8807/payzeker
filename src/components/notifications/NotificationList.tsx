"use client";
import { AnimatePresence } from "framer-motion";
import NotificationItem from "./NotificationItem";
import type { Notification } from "@/types";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onMarkAllAsRead?: () => Promise<void>;
  onClearAll?: () => Promise<void>;
}

export default function NotificationList({
  notifications,
  onMarkAsRead,
  onDelete,
  onMarkAllAsRead,
  onClearAll,
}: NotificationListProps) {
  const unreadCount = notifications.filter((n) => n.state === "unread").length;
  const hasNotifications = notifications.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header with actions */}
      {hasNotifications && (
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-[var(--green)] text-white text-xs px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {unreadCount > 0 && onMarkAllAsRead && (
              <button
                onClick={onMarkAllAsRead}
                className="text-xs text-[var(--green)] hover:text-[var(--green-dark)] font-medium"
              >
                Mark all read
              </button>
            )}
            
            {hasNotifications && onClearAll && (
              <button
                onClick={onClearAll}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto">
        {!hasNotifications ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 01-7.5-7.5H7.5"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm font-medium">No notifications yet 🔔</p>
            <p className="text-gray-400 text-xs mt-1">
              You'll see updates and alerts here
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            <AnimatePresence mode="popLayout">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  onMarkAsRead={onMarkAsRead}
                  onDelete={onDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}