// components/Countdown.tsx
"use client";
import { useEffect, useState } from "react";
import SubscriberForm from "./form/SubscriberForm";

//lauch date
const launchDate = new Date("2025-10-01T00:00:00").getTime();

//function to get remaining time
function getTimeRemaining() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / 1000 / 60) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function Countdown() {
  const [hasMounted, setHasMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/*bg-gradient-to-br from-bg-[var(--green)] via-green-300 to-bg-[var(--green)] */}
      <div
        id="countdown"
        className="bg-[var(--green)] text-white py-16 px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
          🚀Payzeker
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-wide">
          Launching Soon!!!
        </h3>
        <p className="mb-3 text-lg text-white">
          Launching on October 1st, 2025
        </p>

        <div className="flex justify-center gap-4 flex-wrap text-center max-w-sm md:max-w-3xl  mx-auto">
          {["days", "hours", "minutes", "seconds"].map((unit, i) => (
            <div
              key={i}
              className="bg-black bg-opacity-30 shadow-lg backdrop-blur-md border border-white border-opacity-10 rounded-xl p-6 w-24 md:w-28"
            >
              {hasMounted && (
                <p className="text-3xl md:text-4xl font-extrabold text-white">
                  {String(timeLeft[unit as keyof typeof timeLeft]).padStart(
                    2,
                    "0"
                  )}
                </p>
              )}

              <span className="uppercase text-xs mt-2 block tracking-widest text-gray-300">
                {unit}
              </span>
            </div>
          ))}
        </div>

        <SubscriberForm />

        <p className="mt-8 text-white text-sm italic">
          Be the first to experience the future of digital tasks & rewards ✨
        </p>
      </div>
    </>
  );
}
