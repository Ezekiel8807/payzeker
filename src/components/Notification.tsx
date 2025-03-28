"use client";
import React, { useState } from "react";

export default function Notification() {
  const [noteBox, setNotebox] = useState(false);

  function openCloseNoteBox() {
    setNotebox((prev) => !prev);
  }
  return (
    <div className="relative flex items-center">
      <div className="absolute w-[2px] p-1 left-1 top-0 bg-red-600 rounded-full"></div>
      <svg
        onClick={openCloseNoteBox}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 mx-2 text-[var(--green)]"
      >
        <path
          fillRule="evenodd"
          d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
          clipRule="evenodd"
        />
      </svg>

      {noteBox && (
        <div className="absolute z-10 top-9 md:top-10 -left-56 md:right-0 flex flex-col p-5 gap-2 w-[285px] h-[300px] bg-[var(--gray-05)] overflow-y-scroll rounded shadow-lg border-b-2 border-[var(--green)] transition-transform scale-100 ease-in-out">
          <div className="w-full p-3 bg-[var(--green-trans)] rounded-lg">
            Hello, welcome to payzeker. Start earning by performing your daily
            assigned task on your dashboard.
          </div>

          <div className="w-full p-3 bg-[var(--gray-10)] rounded-lg">
            Hello, welcome to payzeker. Start earning by performing your daily
            assigned task on your dashboard.
          </div>

          <div className="w-full p-3 bg-[var(--green-trans)] rounded-lg">
            Hello, welcome to payzeker. Start earning by performing your daily
            assigned task on your dashboard.
          </div>

          <div className="w-full p-3 bg-[var(--green-trans)] rounded-lg">
            Hello, welcome to payzeker. Start earning by performing your daily
            assigned task on your dashboard.
          </div>
        </div>
      )}
    </div>
  );
}
