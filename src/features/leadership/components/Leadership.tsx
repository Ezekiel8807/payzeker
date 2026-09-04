"use client";

//components
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";

type Leader = {
  username: string;
  rank: number;
  completedTask: number;
  account: {
    earning: number;
  };
};

type LeadershipProbs = {
  leaders: Leader[];
};

export default function Leadership({ leaders }: LeadershipProbs) {
  const brand = "#29cd9c";
  const medalColors = ["text-yellow-400", "text-gray-300", "text-orange-400"];
  const bgColors = [
    "border-[#29cd9c]/60 bg-white/20 shadow-[#29cd9c]/30",
    "border-gray-300 bg-white/15 shadow-gray-300/30",
    "border-orange-300 bg-white/15 shadow-orange-300/30",
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:py-10">
      {/* 🌊 Animated Payzeker Gradient Background */}
      <div className="absolute inset-0 animate-[pulse_10s_infinite] bg-gradient-to-b from-[#f9f9f9] to-[#eefdfa]"></div>

      {/* ✨ Soft particles/confetti overlay */}
      <div className="absolute inset-0 pointer-events-none bg-cover opacity-10 animate-pulse"></div>

      {/* 🏆 Header */}
      <div className="relative text-center mb-6 sm:mb-8 w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-[var(--green)] drop-shadow-md"
        >
          🏆 Payzeker Leaderboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-black mt-2 text-sm sm:text-base"
        >
          Meet the top earners on{" "}
          <span className="font-semibold text-black">Payzeker</span> 🚀
        </motion.p>
      </div>

      {/* 🥇 Leaderboard */}
      <div className="relative w-full max-w-xl mx-auto rounded-3xl backdrop-blur-xl bg-white/90 p-4 sm:p-6 border border-[var(--green)] shadow-2xl">
        <AnimatePresence>
          {leaders.map(
            (
              user: {
                username: string;
                rank: number;
                completedTask: number;
                account: {
                  earning: number;
                };
              },
              index
            ) => (
              <motion.div
                key={user.username}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 mb-3 rounded-2xl transition-all hover:scale-[1.03] hover:shadow-lg ${
                  index < 3
                    ? bgColors[index] // top 3 with special background
                    : "bg-white border border-slate-100 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  {index < 3 ? (
                    <Icon
                      icon="mdi:medal"
                      className={`${medalColors[index]} text-2xl sm:text-3xl drop-shadow`}
                    />
                  ) : (
                    <span className="text-gray-800 font-bold text-lg sm:text-xl">
                      #{index + 1}
                    </span>
                  )}

                  <div className="relative">
                    <Image
                      src="/icons/user-139.svg"
                      alt={user.username}
                      width={45}
                      height={45}
                      className="rounded-full border-2 border-[var(--green)] bg-white shadow-md object-cover sm:w-[50px] sm:h-[50px]"
                    />
                    {index === 0 && (
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Icon
                          icon="mdi:crown"
                          className="absolute -top-3 -right-2 text-yellow-400 text-xl sm:text-2xl drop-shadow-lg"
                        />
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.completedTask} tasks completed
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p className="font-bold text-lg text-[var(--green)]">
                    <CurrencyDisplay amount={user.account.earning} />
                  </p>
                  <p className="text-xs text-gray-500">Rank {user.rank}</p>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>

        {leaders.length === 0 && (
          <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
            No leaders yet — be the first to climb the board! 🚀
          </p>
        )}
      </div>

      {/* 📢 CTA Footer */}
      <div className="relative mt-8 sm:mt-10 text-center px-2 sm:px-4 max-w-md">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-ink-soft text-xs sm:text-sm md:text-base leading-relaxed"
        >
          🌟 Complete your daily tasks to boost your rank and earn more rewards
          on{" "}
          <span className="font-semibold" style={{ color: brand }}>
            Payzeker
          </span>
          !
        </motion.p>
      </div>
    </div>
  );
}
