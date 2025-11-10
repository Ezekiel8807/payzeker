"use client";

import React from "react";
import { Icon } from "@iconify/react";

type PerformanceProps = {
  Overall: number;
  Completed: number;
};

export default function Performance({ Overall, Completed }: PerformanceProps) {
  const missed = Overall - Completed || 0;
  const overall = Overall || 0;
  const completed = Completed || 0;

  const stats = [
    {
      label: "Tasks Overall",
      value: overall,
      icon: "mdi:clipboard-list-outline",
      color: "text-[var(--green)]",
      bg: "bg-[var(--gray-05)]",
    },
    {
      label: "Tasks Completed",
      value: completed,
      icon: "mdi:check-circle-outline",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Tasks Missed",
      value: missed,
      icon: "mdi:close-circle-outline",
      color: "text-red-500",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="w-full my-5">
      <div className="flex flex-row gap-4 sm:gap-6 bg-white/80 backdrop-blur-sm px-0 sm:px-3 sm:py-5 rounded md:shadow-sm border-none sm:border border-gray-100 overflow-x-scroll no-scrollbar">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-row items-center gap-3 ${stat.bg} hover:scale-[1.05] transition-transform duration-300 rounded-xl px-3 py-2 sm:px-5 sm:py-4 min-w-[130px] sm:min-w-0 sm:flex-1 justify-center`}
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white shadow-inner">
              <Icon
                icon={stat.icon}
                className={`${stat.color} text-xl sm:text-3xl`}
              />
            </div>
            <div className="text-center">
              <span className="block font-extrabold text-lg sm:text-2xl text-gray-800">
                {stat.value}
              </span>
              <p className="text-[10px] sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
