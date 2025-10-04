"use client";
import { useState } from "react";
// import { useRouter } from "next/navigation";

//components
import TaskFilterTabs from "./TaskFilterTabs";
import UserTaskCard from "./cards/UserTaskCard";

type Task = {
  _id: string;
  taskName: string;
  state: string;
  price: number;
};

type taskType = {
  userTasks: Task[];
};

const filters = ["Pending", "Rejected", "Completed"];

export default function TaskCom1({ userTasks }: taskType) {
  // const navigate = useRouter();
  const [filter, setFilter] = useState("Pending");

  const pendingTasks = userTasks
    .filter((task) => task.state === "submitted")
    .reverse();

  const rejectedTasks = userTasks
    .filter((task) => task.state === "rejected")
    .reverse();

  const completedTasks = userTasks
    .filter((task) => task.state === "completed")
    .reverse();

  const handleDeleteTask = async (taskId: string) => {
    // const confirm = window.confirm("Are you sure you want to delete?");
    // if (!confirm) return;

    try {
      // const res = await deleteTask(taskId);

      // if (res.error) alert("Failed to delete task");

      // Optionally, refresh task list or remove from state
      // alert(`Deleted: ${taskId}`);
      console.log(taskId);
      alert("Coming Soon...");

      // Refresh UI logic here
    } catch (error) {
      console.error(error);
      alert("Error deleting task");
    }
  };

  const renderTasks = (
    tasks: Task[],
    status: "Pending" | "Rejected" | "Completed",
    dateLabel: string
  ) => {
    if (tasks.length === 0) {
      return <p className="text-gray-500">No {status.toLowerCase()} tasks.</p>;
    }

    return tasks.map((task) => (
      <UserTaskCard
        key={task._id || task.taskName}
        title={`📢 ${task.taskName}`}
        status={status}
        dateLabel={dateLabel}
        dateValue={`#${task.price}`}
        onDelete={() => handleDeleteTask(task._id!)}
        onActionClick={() => {
          if (status === "Pending") {
            // handle view details (maybe navigate or show modal)
            // navigate.push(`/tasks/${task._id}`);
            alert("Coming Soon...");

            //
          }
        }}
      />
    ));
  };

  return (
    <div className="w-full bg-white">
      <TaskFilterTabs filters={filters} active={filter} onChange={setFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-5 gap-5">
        {filter === "Pending" && renderTasks(pendingTasks, "Pending", "Price")}
        {filter === "Rejected" &&
          renderTasks(rejectedTasks, "Rejected", "Price")}
        {filter === "Completed" &&
          renderTasks(completedTasks, "Completed", "Price")}
      </div>
    </div>
  );
}
