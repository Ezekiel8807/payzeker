"use client";
import { useState } from "react";
import TaskFilterTabs from "./TaskFilterTabs";
import UserTaskCard from "@/features/tasks/cards/UserTaskCard";
import EmptyState from "@/shared/components/ui/EmptyState";

type Task = { _id: string; taskName: string; state: string; price: number; };
const filters = ["Pending", "Rejected", "Completed"];

export default function TaskCom1({ userTasks }: { userTasks: Task[] }) {
  const [filter, setFilter] = useState("Pending");

  const pendingTasks = userTasks.filter((t) => t.state === "submitted").reverse();
  const rejectedTasks = userTasks.filter((t) => t.state === "rejected").reverse();
  const completedTasks = userTasks.filter((t) => t.state === "completed").reverse();

  const handleDeleteTask = async (taskId: string) => {
    console.log(taskId);
    alert("Coming Soon...");
  };

  const renderTasks = (tasks: Task[], status: "Pending" | "Rejected" | "Completed", dateLabel: string) => {
    if (tasks.length === 0) return <EmptyState message={`No ${status.toLowerCase()} tasks`} />;
    return tasks.map((task) => (
      <UserTaskCard key={task._id || task.taskName} title={`📢 ${task.taskName}`} status={status} dateLabel={dateLabel}
        dateValue={`#${task.price}`} onDelete={() => handleDeleteTask(task._id!)}
        onActionClick={() => { if (status === "Pending") alert("Coming Soon..."); }} />
    ));
  };

  return (
    <div className="w-full bg-white">
      <TaskFilterTabs filters={filters} active={filter} onChange={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-5 gap-5">
        {filter === "Pending" && renderTasks(pendingTasks, "Pending", "Price")}
        {filter === "Rejected" && renderTasks(rejectedTasks, "Rejected", "Price")}
        {filter === "Completed" && renderTasks(completedTasks, "Completed", "Price")}
      </div>
    </div>
  );
}
