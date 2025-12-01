# Notification System

A modern, responsive notification system with real-time updates and smooth animations.

## Components

### NotificationPanel
Main component that manages the notification state and UI.

**Features:**
- Real-time polling every 5 seconds
- Optimistic updates for immediate UI feedback
- Click outside to close
- Loading states
- Error handling with automatic rollback

### NotificationList
Container component that displays the list of notifications.

**Features:**
- Empty state with friendly message
- Bulk actions (Mark all as read, Clear all)
- Smooth animations with Framer Motion
- Responsive design

### NotificationItem
Individual notification component.

**Features:**
- Immediate delete with smooth animation
- Mark as read functionality
- Timestamp display
- Visual indicators for unread notifications
- Loading states for actions

### NotificationBadge
Badge component showing unread count.

**Features:**
- Animated appearance/disappearance
- Loading state support
- Handles large numbers (99+)
- Smooth count transitions

## Usage

```tsx
import NotificationPanel from "@/components/notifications/NotificationPanel";

// In your component
<NotificationPanel initialNotifications={notifications} />
```

## Key Features

### Immediate UI Updates
All actions (delete, mark as read) update the UI immediately using optimistic updates. If the server request fails, the UI automatically reverts to the previous state.

### Real-time Polling
The system polls for new notifications every 5 seconds to ensure users see updates without refreshing the page.

### Smooth Animations
All interactions include smooth animations:
- Panel open/close
- Notification delete
- Badge count changes
- Loading states

### Error Handling
Robust error handling ensures the UI remains consistent even when server requests fail.

## Utilities

The `notificationUtils.ts` file provides helper functions for:
- Counting unread notifications
- Optimistic state updates
- Notification sorting
- Time formatting
- Change detection

## Styling

Uses CSS custom properties for theming:
- `--green`: Primary color
- `--green-trans`: Transparent green for unread notifications
- `--gray-10`: Background for read notifications
- `--green-dark`: Hover states