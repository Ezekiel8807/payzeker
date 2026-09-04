"use client";
import { useRouter } from "next/navigation";
import UserTaskCard from "@/features/tasks/cards/UserTaskCard";
import Link from "next/link";
import EmptyState from "@/shared/components/ui/EmptyState";

type Task = { _id: string; name: string; state: string; price: number; };

export default function TaskCom3({ alltasks }: { alltasks: Task[] }) {
  const navigate = useRouter();
  const status = "New";

  const handleDeleteTask = async (taskId: string) => {
    console.log(taskId);
    alert("Coming Soon...");
  };

  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between mb-6">
        <Link href="/tasks/newTask" className="btn btn-primary">+ Create Task</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-5 gap-5">
        {alltasks.length === 0 ? (
          <EmptyState message="No tasks" />
        ) : (
          alltasks.map((task) => (
            <UserTaskCard key={task._id || task.name} title={`📢 ${task.name}`} status={status} dateLabel="Price"
              dateValue={`#${task.price}`} onDelete={() => handleDeleteTask(task._id!)}
              onActionClick={() => { if (status === "New") navigate.push(`/tasks/${task._id}`); }} />
          ))
        )}
      </div>
    </div>
  );
}
