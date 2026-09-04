"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NotificationBadge from "./NotificationBadge";
import NotificationList from "./NotificationList";
import NotificationIcon from "@/shared/components/ui/NotificationIcon";
import { updateNotis, deleteNotis } from "@/features/notifications/actions/notifficationAction";
import type { Notification } from "@/shared/types";
import {
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  removeNotification,
  hasNotificationsChanged,
} from "@/features/notifications/utils/notificationUtils";

interface NotificationPanelProps {
  initialNotifications: Notification[];
}

export default function NotificationPanel({
  initialNotifications,
}: NotificationPanelProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Calculate unread count
  const unreadCount = getUnreadCount(notifications);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Poll for new notifications every 5 seconds
  useEffect(() => {
    const pollNotifications = async () => {
      if (isLoading) return;

      try {
        const res = await fetch("/api/notifications");
        const result = await res.json();

        if (!result.error && result.data) {
          // Only update if there are changes
          setNotifications((prev) => {
            if (hasNotificationsChanged(result.data, prev)) {
              return result.data;
            }
            return prev;
          });
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    // Poll every 5 seconds
    const interval = setInterval(pollNotifications, 5000);
    return () => clearInterval(interval);
  }, [isLoading]); // Only depend on isLoading to keep interval stable

  // Toggle panel
  const togglePanel = useCallback(async () => {
    if (!isOpen) {
      // Fetch latest notifications when opening
      setIsLoading(true);
      try {
        const res = await fetch("/api/notifications");
        const result = await res.json();
        if (!result.error && result.data) {
          setNotifications(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsOpen((prev) => !prev);
  }, [isOpen]);

  // Mark notification as read with immediate UI update
  const handleMarkAsRead = useCallback(async (notificationId: string) => {
    // Optimistic update - mark as read immediately
    setNotifications((prev) => markAsRead(prev, notificationId));

    try {
      const result = await updateNotis(notificationId);
      if (result.error) {
        // Revert on error
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId ? { ...n, state: "unread" as const } : n,
          ),
        );
        console.error("Failed to mark notification as read:", result.msg);
      }
    } catch (error) {
      // Revert on error
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, state: "unread" as const } : n,
        ),
      );
      console.error("Failed to mark notification as read:", error);
    }
  }, []);

  // Delete notification with immediate UI update
  const handleDelete = useCallback(
    async (notificationId: string) => {
      // Optimistic update - remove immediately from UI
      const previousNotifications = notifications;
      setNotifications((prev) => removeNotification(prev, notificationId));

      try {
        const result = await deleteNotis(notificationId);
        if (result.error) {
          // Revert on error - restore previous state
          setNotifications(previousNotifications);
          console.error("Failed to delete notification:", result.msg);
        }
      } catch (error) {
        // Revert on error - restore previous state
        setNotifications(previousNotifications);
        console.error("Failed to delete notification:", error);
      }
    },
    [notifications],
  );

  // Mark all as read
  const handleMarkAllAsRead = useCallback(async () => {
    const unreadNotifications = notifications.filter(
      (n) => n.state === "unread",
    );

    // Optimistic update - mark all as read immediately
    setNotifications((prev) => markAllAsRead(prev));

    try {
      // Mark all unread notifications as read
      const results = await Promise.allSettled(
        unreadNotifications.map((n) => updateNotis(n._id)),
      );

      // Check if any failed
      const hasErrors = results.some(
        (result) => result.status === "fulfilled" && result.value.error,
      );

      if (hasErrors) {
        // Refresh notifications on error
        try {
          const res = await fetch("/api/notifications");
          const refreshResult = await res.json();
          if (!refreshResult.error && refreshResult.data) {
            setNotifications(refreshResult.data);
          }
        } catch (e) {
          console.error("Failed to refresh notifications:", e);
        }
      }
    } catch (error) {
      // Refresh on error
      try {
        const res = await fetch("/api/notifications");
        const result = await res.json();
        if (!result.error && result.data) {
          setNotifications(result.data);
        }
      } catch (e) {
        console.error("Failed to refresh notifications:", e);
      }
      console.error("Failed to mark all as read:", error);
    }
  }, [notifications]);

  // Clear all notifications
  const handleClearAll = useCallback(async () => {
    const allNotifications = [...notifications];

    // Optimistic update - clear all immediately
    setNotifications([]);

    try {
      // Delete all notifications
      const results = await Promise.allSettled(
        allNotifications.map((n) => deleteNotis(n._id)),
      );

      // Check if any failed
      const hasErrors = results.some(
        (result) => result.status === "fulfilled" && result.value.error,
      );

      if (hasErrors) {
        // Refresh notifications on error
        try {
          const res = await fetch("/api/notifications");
          const refreshResult = await res.json();
          if (!refreshResult.error && refreshResult.data) {
            setNotifications(refreshResult.data);
          }
        } catch (e) {
          console.error("Failed to refresh notifications:", e);
        }
      }
    } catch (error) {
      // Refresh on error
      try {
        const res = await fetch("/api/notifications");
        const result = await res.json();
        if (!result.error && result.data) {
          setNotifications(result.data);
        }
      } catch (e) {
        console.error("Failed to refresh notifications:", e);
      }
      console.error("Failed to clear all notifications:", error);
    }
  }, [notifications]);

  return (
    <div className="relative">
      {/* Notification Button */}
      <div
        ref={buttonRef}
        onClick={togglePanel}
        className="relative cursor-pointer h-10 w-10 p-2 bg-slate-100 mr-2 md:mr-0 rounded-full transition-colors"
        aria-label="Notifications"
      >
        <NotificationIcon />
        <NotificationBadge count={unreadCount} isLoading={isLoading} />
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-12 -right-4 md:right-0 w-80 max-w-[90vw] h-96 bg-white rounded-card shadow-xl border border-slate-100 overflow-hidden"
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--green)]"></div>
              </div>
            ) : (
              <NotificationList
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
                onMarkAllAsRead={handleMarkAllAsRead}
                onClearAll={handleClearAll}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
