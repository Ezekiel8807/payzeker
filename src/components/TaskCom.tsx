"use client";

import React, { useState } from "react";
import TaskCard from "./cards/TaskCard";
import TaskFilterTabs from "./TaskFilterTabs";
import Link from "next/link";

type Task = {
  _id?: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

type taskType = {
  userTasks: Task[];
};

export default function TaskCom({ userTasks }: taskType) {
  const [filter, setFilter] = useState("Ongoing");

  const now = new Date();

  const ongoingTasks = userTasks.filter(
    (task) =>
      new Date(task.startDate) <= now &&
      new Date(task.endDate) >= now &&
      task.isActive
  );

  const expiredTasks = userTasks.filter((task) => new Date(task.endDate) < now);

  const needReactivation = userTasks.filter(
    (task) => !task.isActive && new Date(task.endDate) >= now
  );

  const renderTasks = (
    tasks: Task[],
    status: "Ongoing" | "Expired" | "Inactive",
    dateLabel: string
  ) => {
    if (tasks.length === 0) {
      return <p className="text-gray-500">No {status.toLowerCase()} tasks.</p>;
    }

    return tasks.map((task) => (
      <TaskCard
        key={task._id || task.name}
        title={`📢 ${task.name}`}
        status={status}
        dateLabel={dateLabel}
        dateValue={
          dateLabel === "Start Date"
            ? task.startDate
            : dateLabel === "End Date"
            ? task.endDate
            : task.startDate
        }
      />
    ));
  };

  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/tasks/newTask"
          className="bg-[var(--green)] hover:bg-[#22b891] text-white font-medium px-4 py-2 rounded-xl"
        >
          + Create Task
        </Link>
      </div>

      <TaskFilterTabs active={filter} onChange={setFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filter === "Ongoing" &&
          renderTasks(ongoingTasks, "Ongoing", "Start Date")}
        {filter === "Expired" &&
          renderTasks(expiredTasks, "Expired", "End Date")}
        {filter === "Reactivate" &&
          renderTasks(needReactivation, "Inactive", "Last Active")}
      </div>
    </div>
  );
}
