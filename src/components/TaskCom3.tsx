"use client";
import { useRouter } from "next/navigation";

//components
import UserTaskCard from "./cards/UserTaskCard";
import Link from "next/link";

type Task = {
  _id: string;
  name: string;
  state: string;
  price: number;
};

type taskType = {
  alltasks: Task[];
};

const status = "New";

export default function TaskCom3({ alltasks }: taskType) {
  const navigate = useRouter();

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-5 gap-5">
        {alltasks.length === 0 ? (
          <p className="text-gray-500">No tasks.</p>
        ) : (
          alltasks.map((task) => (
            <UserTaskCard
              key={task._id || task.name}
              title={`📢 ${task.name}`}
              status={status}
              dateLabel="Price"
              dateValue={`#${task.price}`}
              onDelete={() => handleDeleteTask(task._id!)}
              onActionClick={() => {
                if (status === "New") {
                  // handle view details (maybe navigate or show modal)
                  navigate.push(`/tasks/${task._id}`);
                }
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
