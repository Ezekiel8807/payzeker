"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { redirect } from "next/navigation";
import { spinWinners } from "@/actions/transactionAction";

type data = {
  amount?: number;
  username?: string;
};

export default function SpinMotivate() {
  const [message, setMessage] = useState("Loading winners...");
  const [winners, setWinners] = useState<data[]>([]);

  // Load winners using Server Action
  useEffect(() => {
    async function loadWinners() {
      const data = await spinWinners(); // ⬅ Server action call
      console.log(data);

      setWinners(data);

      if (data.length > 0) {
        const rnd = Math.floor(Math.random() * data.length);
        const w = data[rnd];
        setMessage(
          `${w.username
          } won #${w.amount.toLocaleString()} from spinning. 💵💵💵`
        );
      }
    }

    loadWinners();
  }, []);

  // Rotate messages every 10 seconds
  useEffect(() => {
    if (winners.length === 0) return;

    const interval = setInterval(() => {
      const rnd = Math.floor(Math.random() * winners.length);
      const w = winners[rnd];
      setMessage(
        `${w.username} won #${w.amount!.toLocaleString()} from spinning. 💵💵💵`
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [winners]);

  function playNow() {
    redirect("/luckySpin");
  }

  return (
    <div id="dashboard-spin" className="w-full border border-[var(--green)] mb-5 text-center rounded-full">
      <div className="flex items-center justify-between gap-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="ml-3 text-start p-1 text-xs md:text-sm"
          >
            {message}
          </motion.div>
        </AnimatePresence>

        <Button
          btnAction={playNow}
          btnStyle="text-[var(--green)] py-2 px-5 text-xs bg-green-100 rounded-full shadow-sm hover:bg-[var(--green)] hover:text-white outline-none"
        >
          Play Now!!!
        </Button>
      </div>
    </div>
  );
}
