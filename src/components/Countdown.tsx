"use client";
import { useEffect, useState } from "react";
import { isLaunchDate } from "@/utils/launch";

//componenets
import SubscriberForm from "./form/SubscriberForm";
import PayzekerLive from "./PayzekerLive";

function getTimeRemaining() {
  const launchDate = new Date("2025-10-01T00:00:00").getTime();
  const now = Date.now();
  const distance = launchDate - now;

  return {
    total: distance,
    days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
    hours: Math.max(0, Math.floor((distance / (1000 * 60 * 60)) % 24)),
    minutes: Math.max(0, Math.floor((distance / 1000 / 60) % 60)),
    seconds: Math.max(0, Math.floor((distance / 1000) % 60)),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] =
    useState<ReturnType<typeof getTimeRemaining>>();

  useEffect(() => {
    setTimeLeft(getTimeRemaining());
    const interval = setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null; // render nothing until mounted

  if (isLaunchDate()) return <PayzekerLive />;

  return (
    <div
      id="countdown"
      className="bg-[var(--green)] text-white py-16 px-6 text-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-wide">
        🚀 Payzeker
      </h2>
      <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide">
        Launching Soon!!!
      </h3>
      <p className="mb-3 text-lg">Launching on October 1st, 2025</p>

      <div className="flex justify-center gap-4 flex-wrap text-center max-w-sm md:max-w-3xl mx-auto">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div
            key={unit}
            className="bg-black bg-opacity-30 shadow-lg backdrop-blur-md border border-white border-opacity-10 rounded-xl p-6 w-24 md:w-28"
          >
            <p className="text-3xl md:text-4xl font-extrabold">
              {String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, "0")}
            </p>
            <span className="uppercase text-xs mt-2 block tracking-widest text-gray-300">
              {unit}
            </span>
          </div>
        ))}
      </div>

      <SubscriberForm />

      <p className="mt-8 text-sm italic">
        Be the first to experience the future of digital tasks & rewards ✨
      </p>
    </div>
  );
}
