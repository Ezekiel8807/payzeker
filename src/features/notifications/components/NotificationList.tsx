"use client";
import { AnimatePresence } from "framer-motion";
import NotificationItem from "./NotificationItem";
import EmptyState from "@/shared/components/ui/EmptyState";
import type { Notification } from "@/shared/types";

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
        <div className="flex items-center justify-between p-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <span className="badge badge-green">
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
          <EmptyState
            message="No notifications yet"
            description="You'll see updates and alerts here"
            className="h-full"
          />
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
