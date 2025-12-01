"use client";
import React, { useEffect, useState } from "react";
import {
  updateNotis,
  deleteNotis,
  getNotifications,
} from "@/actions/notifficationAction";

// Components
import DeleteIcon from "./ui/DeleteIcon";
import NotificationIcon from "./ui/NotificationIcon";

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
        <div className="absolute z-10 top-9 md:top-10 -left-56 md:right-0 flex flex-col p-5 gap-2 w-[285px] h-[300px] bg-[var(--gray-05)] overflow-y-scroll rounded shadow-lg border-b-2 border-[var(--green)] transition-transform scale-100 ease-in-out">
          {notisArr.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-gray-500 text-sm">
                No notifications yet 🔔
              </p>
            </div>
          ) : (
            notisArr.map((el) =>
            el.state === "unread" ? (
              <div
                key={el._id}
                className="w-full p-3 bg-[var(--green-trans)] rounded-lg"
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
                className="w-full p-3 bg-[var(--gray-10)] rounded-lg"
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
