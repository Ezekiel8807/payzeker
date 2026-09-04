"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import getUserDailyTask from "@/features/tasks/actions/getDailyTask";
import DailyTaskCard from "@/features/tasks/cards/DailyTaskCard";

export default function DailyTask() {
  const [dailyTask, setDailytask] = useState([]);

  useEffect(() => {
    getUserDailyTask()
      .then((user) => {
        if (!user) redirect("/login");
        setDailytask(user.tasks.filter((e: { state: string }) => e.state === "new"));
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div id="dashboard-daily-tasks" className="card mb-5">
      <h2 className="section-title">Task</h2>
      <small className="section-desc block mb-5">Earn real cash for completing task.</small>
      <div className="grid grid-flow-col justify-start gap-5 overflow-x-scroll no-scrollbar">
        {dailyTask.length > 0 ? (
          dailyTask.map((task: { _id?: string; level?: number; price?: number; socialTarget?: string; media?: { type?: string; content?: string } }) => {
            const { _id, level, media, price, socialTarget } = task;
            return <DailyTaskCard key={_id} userTask={{ _id, level, media, price, socialTarget }} />;
          })
        ) : (
          <p className="flex h-[200px] items-center justify-center">Opps🙈... tasks unavailable</p>
        )}
      </div>
    </div>
  );
}
