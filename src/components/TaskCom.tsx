"use client";

import React, { useState } from "react";
import TaskCard from "./cards/TaskCard";
import TaskFilterTabs from "./TaskFilterTabs";
import Link from "next/link";

export default function TaskCom() {
  const [filter, setFilter] = useState("Ongoing");

  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between mb-6">
        {/* <h1 className="text-2xl md:text-3xl font-bold text-[#29cd9c]">
          Manage Your Tasks
        </h1> */}
        <Link
          href="/tasks/newTask"
          className="bg-[var(--green)] hover:bg-[#22b891] text-white font-medium px-4 py-2 rounded-xl"
        >
          + Create Task
        </Link>
      </div>

      <TaskFilterTabs active={filter} onChange={setFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filter === "Ongoing" && (
          <TaskCard
            title="📢 Promote our product"
            status="Ongoing"
            dateLabel="Start Date"
            dateValue="2025-07-25"
          />
        )}
        {filter === "Expired" && (
          <TaskCard
            title="📤 Share campaign on social media"
            status="Expired"
            dateLabel="End Date"
            dateValue="2025-07-20"
          />
        )}
        {filter === "Reactivate" && (
          <TaskCard
            title="✍️ Write a blog post"
            status="Inactive"
            dateLabel="Last Active"
            dateValue="2025-07-15"
          />
        )}
      </div>
    </div>
  );
}
