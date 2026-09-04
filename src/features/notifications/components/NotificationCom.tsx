"use client";
import React, { useEffect, useState } from "react";
import {
  updateNotis,
  deleteNotis,
  getNotifications,
} from "@/features/notifications/actions/notifficationAction";

// Components
import DeleteIcon from "@/shared/components/ui/DeleteIcon";
import NotificationIcon from "@/shared/components/ui/NotificationIcon";
import EmptyState from "@/shared/components/ui/EmptyState";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NotificationCom({ notis }: { notis: any[] }) {
  const [notisArr, setNotisarr] = useState(notis);
  const [noteBox, setNotebox] = useState(false);
  const [notiLen, setNotiLen] = useState(0);

  useEffect(() => {
    function unReadNotiCheck() {
      // Count unread notifications and set state
      const unreadCount = notisArr.filter((e) => e.state === "unread").length;
      setNotiLen(unreadCount);
    }

    unReadNotiCheck();
  }, [notisArr]); // Depend on `notisArr` to update properly

  // Poll for new notifications every 5 seconds
  useEffect(() => {
    const pollNotifications = async () => {
      const result = await getNotifications();
      if (!result.error && result.data) {
        // Only update if there are changes to avoid unnecessary re-renders
        if (JSON.stringify(result.data) !== JSON.stringify(notisArr)) {
          setNotisarr(result.data);
        }
      }
    };

    // Poll every 5 seconds for real-time updates
    const interval = setInterval(pollNotifications, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [notisArr]);

  async function openCloseNoteBox() {
    // Fetch latest notifications when opening the box
    if (!noteBox) {
      const result = await getNotifications();
      if (!result.error && result.data) {
        setNotisarr(result.data);
      }
    }

    // Always allow opening the notification box (even if empty)
    setNotebox((prev) => !prev);
  }

  async function deleteNotisDbSt(id: string) {
    // Store previous state in case of failure
    const prevState = notisArr;

    // Optimistically update the UI before making the API call
    setNotisarr((prevNotisArr) => prevNotisArr.filter((e) => e._id !== id));

    const deletedNotisDb = await deleteNotis(id);

    if (deletedNotisDb.error) {
      // If API call fails, revert state change (restore previous state)
      setNotisarr(prevState); // Adjust based on actual object structure
      return;
    }
  }

  async function readNotis(id: string) {
    // Store previous state in case of failure
    const prevState = notisArr;

    //
    setNotisarr((prevNotisArr) =>
      prevNotisArr.map((e) => (e._id === id ? { ...e, state: "read" } : e))
    );

    const updateNotisDb = await updateNotis(id);

    if (updateNotisDb.error) {
      // Revert state if API fails
      setNotisarr(prevState);
      return;
    }
  }

  return (
    <div className="relative flex items-center">
      {notiLen > 0 && (
        <div className="absolute w-[2px] p-1 left-1 top-0 bg-red-600 rounded-full" />
      )}
      <NotificationIcon openCloseNoteBox={openCloseNoteBox} />

      {noteBox && (
        <div className="absolute z-10 top-9 md:top-10 -left-56 md:right-0 flex flex-col p-5 gap-2 w-[285px] h-[300px] bg-white overflow-y-auto rounded-card shadow-xl border border-slate-100 transition-transform scale-100 ease-in-out">
          {notisArr.length === 0 ? (
            <EmptyState message="No notifications yet" className="h-full" />
          ) : (
            notisArr.map((el) =>
            el.state === "unread" ? (
              <div
                key={el._id}
                className="w-full p-3 bg-[var(--green)]/10 rounded-xl border-l-4 border-[var(--green)]"
              >
                {el.message}
                <div className="flex items-center justify-end">
                  <small
                    className="block text-end mt-2 cursor-pointer"
                    onClick={() => readNotis(el._id)}
                  >
                    Mark as read |
                  </small>
                  <DeleteIcon deleteNotis={() => deleteNotisDbSt(el._id)} />
                </div>
              </div>
            ) : (
              <div
                key={el._id}
                className="w-full p-3 bg-slate-50 rounded-xl"
              >
                {el.message}

                <div className="flex items-center justify-end">
                  <small className="block text-end mt-2 cursor-pointer">
                    |
                  </small>
                  <DeleteIcon deleteNotis={() => deleteNotisDbSt(el._id)} />
                </div>
              </div>
            )
            )
          )}
        </div>
      )}
    </div>
  );
}
