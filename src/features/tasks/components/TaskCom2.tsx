"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { pauseTask, deleteTask, reactivateTask } from "@/features/tasks/actions/taskActions";
import Link from "next/link";
import TaskFilterTabs from "./TaskFilterTabs";
import BusniessTaskCard from "@/features/tasks/cards/BusniessTaskCard";
import EmptyState from "@/shared/components/ui/EmptyState";

type Task = { _id?: string; name: string; startDate: string; endDate: string; isActive: boolean; };
const filters = ["Ongoing", "Reactivate", "Expired"];

export default function TaskCom2({ busniessTasks }: { busniessTasks: Task[] }) {
  const [filter, setFilter] = useState("Ongoing");
  const now = new Date();
  const navigate = useRouter();

  const ongoingTasks = busniessTasks.filter((t) => new Date(t.startDate) <= now && new Date(t.endDate) >= now && t.isActive).reverse();
  const expiredTasks = busniessTasks.filter((t) => new Date(t.endDate) < now);
  const needReactivation = busniessTasks.filter((t) => !t.isActive && new Date(t.endDate) >= now);

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    const res = await deleteTask(taskId);
    alert(res.error ? "Failed to delete task" : res.msg);
  };

  const handlePauseTask = async (taskId: string) => {
    if (!window.confirm("Are you sure you want to pause this task?")) return;
    const res = await pauseTask(taskId);
    alert(res.error ? "Failed to pause task" : res.msg);
  };

  const handleReactivateTask = async (taskId: string) => {
    if (!window.confirm("Reactivate this task?")) return;
    const res = await reactivateTask(taskId);
    if (res.error) return alert("Failed to reactivate task");
    alert(res.msg);
  };

  const renderTasks = (tasks: Task[], status: "Ongoing" | "Expired" | "Inactive", dateLabel: string) => {
    if (tasks.length === 0) return <EmptyState message={`No ${status.toLowerCase()} tasks`} />;
    return tasks.map((task) => (
      <BusniessTaskCard key={task._id || task.name} title={`📢 ${task.name}`} status={status} dateLabel={dateLabel}
        dateValue={dateLabel === "Start Date" ? task.startDate : task.endDate}
        onDelete={() => handleDeleteTask(task._id!)}
        onPause={status === "Ongoing" ? () => handlePauseTask(task._id!) : undefined}
        onActionClick={() => {
          if (status === "Ongoing") navigate.push(`/tasks/${task._id}`);
          else if (status === "Inactive") handleReactivateTask(task._id!);
        }} />
    ));
  };

  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between mb-6">
        <Link href="/tasks/newTask" className="btn btn-primary">+ Create Task</Link>
      </div>
      <TaskFilterTabs filters={filters} active={filter} onChange={setFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-5 gap-5">
        {filter === "Ongoing" && renderTasks(ongoingTasks, "Ongoing", "Start Date")}
        {filter === "Expired" && renderTasks(expiredTasks, "Expired", "End Date")}
        {filter === "Reactivate" && renderTasks(needReactivation, "Inactive", "Last Active")}
      </div>
    </div>
  );
}
