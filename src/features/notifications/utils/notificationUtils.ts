/**
 * Notification Utilities
 * Helper functions for notification management
 */

import type { Notification } from "@/shared/types";

/**
 * Get unread notification count
 */
export function getUnreadCount(notifications: Notification[]): number {
  return notifications.filter((n) => n.state === "unread").length;
}

/**
 * Mark notification as read (optimistic update)
 */
export function markAsRead(
  notifications: Notification[],
  notificationId: string
): Notification[] {
  return notifications.map((n) =>
    n._id === notificationId ? { ...n, state: "read" as const } : n
  );
}

/**
 * Mark all notifications as read (optimistic update)
 */
export function markAllAsRead(notifications: Notification[]): Notification[] {
  return notifications.map((n) => ({ ...n, state: "read" as const }));
}

/**
 * Remove notification (optimistic update)
 */
export function removeNotification(
  notifications: Notification[],
  notificationId: string
): Notification[] {
  return notifications.filter((n) => n._id !== notificationId);
}

/**
 * Sort notifications by creation date (newest first)
 */
export function sortNotifications(notifications: Notification[]): Notification[] {
  return [...notifications].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
}

/**
 * Check if notifications array has changed
 */
export function hasNotificationsChanged(
  current: Notification[],
  previous: Notification[]
): boolean {
  if (current.length !== previous.length) return true;

  return JSON.stringify(current) !== JSON.stringify(previous);
}

/**
 * Format notification time
 */
export function formatNotificationTime(date: Date | string): string {
  const now = new Date();
  const notificationDate = new Date(date);
  const diffInMs = now.getTime() - notificationDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return notificationDate.toLocaleDateString();
}
