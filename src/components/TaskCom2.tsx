"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { pauseTask, deleteTask, reactivateTask } from "@/actions/taskActions";

//components
import Link from "next/link";
import TaskFilterTabs from "./TaskFilterTabs";
import BusniessTaskCard from "./cards/BusniessTaskCard";

type Task = {
  _id?: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

type taskType = {
  busniessTasks: Task[];
};

const filters = ["Ongoing", "Reactivate", "Expired"];

export default function TaskCom2({ busniessTasks }: taskType) {
  const [filter, setFilter] = useState("Ongoing");

  const now = new Date();

  const navigate = useRouter();

  const ongoingTasks = busniessTasks
    .filter(
      (task) =>
        new Date(task.startDate) <= now &&
        new Date(task.endDate) >= now &&
        task.isActive
    )
    .reverse();

  const expiredTasks = busniessTasks.filter(
    (task) => new Date(task.endDate) < now
  );

  const needReactivation = busniessTasks.filter(
    (task) => !task.isActive && new Date(task.endDate) >= now
  );

  const handleDeleteTask = async (taskId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) return;

    try {
      const res = await deleteTask(taskId);

      if (res.error) alert("Failed to delete task");

      // Optionally, refresh task list or remove from state
      alert(res.msg);
      // Refresh UI logic here
    } catch (error) {
      console.error(error);
      alert("Error deleting task");
    }
  };

  const handlePauseTask = async (taskId: string) => {
    const confirm = window.confirm("Are you sure you want to pause this task?");
    if (!confirm) return;

    try {
      const res = await pauseTask(taskId);

      if (res.error) alert("Failed to pause task");

      alert(res.msg);
      // Refresh UI logic here
    } catch (error) {
      console.error(error);
      alert("Error pausing task");
    }
  };

  const handleReactivateTask = async (taskId: string) => {
    const confirm = window.confirm("Reactivate this task?");
    if (!confirm) return;

    try {
      const res = await reactivateTask(taskId); // You must create this in taskActions.ts
      if (res.error) return alert("Failed to reactivate task");
      alert(res.msg);
      // Refresh logic
    } catch (error) {
      console.error(error);
      alert("Error reactivating task");
    }
  };

  const renderTasks = (
    tasks: Task[],
    status: "Ongoing" | "Expired" | "Inactive",
    dateLabel: string
  ) => {
    if (tasks.length === 0) {
      return <p className="text-gray-500">No {status.toLowerCase()} tasks.</p>;
    }

    return tasks.map((task) => (
      <BusniessTaskCard
        key={task._id || task.name}
        title={`📢 ${task.name}`}
        status={status}
        dateLabel={dateLabel}
        dateValue={dateLabel === "Start Date" ? task.startDate : task.endDate}
        onDelete={() => handleDeleteTask(task._id!)}
        onPause={
          status === "Ongoing" ? () => handlePauseTask(task._id!) : undefined
        }
        onActionClick={() => {
          if (status === "Ongoing") {
            // handle view details (maybe navigate or show modal)
            navigate.push(`/tasks/${task._id}`);

            //
          } else if (status === "Inactive") {
            // handle reactivation
            handleReactivateTask(task._id!);
          }
        }}
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

      <TaskFilterTabs filters={filters} active={filter} onChange={setFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-5 gap-5">
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
