"use client";
import React, { useEffect, useState } from "react";

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

  function openCloseNoteBox() {
    setNotebox((prev) => !prev);
  }

  function deleteNotis(id: string) {
    setNotisarr((prevNotisArr) => prevNotisArr.filter((e) => e._id !== id));
  }

  function readNotis(id: string) {
    setNotisarr((prevNotisArr) =>
      prevNotisArr.map((e) => (e._id === id ? { ...e, state: "read" } : e))
    );
  }

  return (
    <div className="relative flex items-center">
      {notiLen > 0 && (
        <div className="absolute w-[2px] p-1 left-1 top-0 bg-red-600 rounded-full" />
      )}
      <NotificationIcon openCloseNoteBox={openCloseNoteBox} />

      {noteBox && (
        <div className="absolute z-10 top-9 md:top-10 -left-56 md:right-0 flex flex-col p-5 gap-2 w-[285px] h-[300px] bg-[var(--gray-05)] overflow-y-scroll rounded shadow-lg border-b-2 border-[var(--green)] transition-transform scale-100 ease-in-out">
          {notisArr.map((el) =>
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
                  <DeleteIcon deleteNotis={() => deleteNotis(el._id)} />
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
                  <DeleteIcon deleteNotis={() => deleteNotis(el._id)} />
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
