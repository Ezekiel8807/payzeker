"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import getUserDailyTask from "@/actions/getDailyTask";

//components
import TaskCard from "./cards/DailyTaskCard";

export default function DailyTask() {
  const [dailyTask, setDailytask] = useState([]);

  useEffect(() => {
    getUserDailyTask()
      .then((user) => {
        if (!user) redirect("/login");

        // set filter tasks that have new state
        setDailytask(
          user.tasks.filter((e: { state: string }) => e.state === "new")
        );
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="bg-[var(--gray-01)] h-[250px] p-5 my-5 rounded">
      <div className="grid grid-flow-col justify-start gap-5 overflow-x-scroll no-scrollbar">
        {dailyTask.length > 0 ? (
          dailyTask.map(
            (task: {
              _id?: string;
              level?: number;
              price?: number;
              socialTarget?: string;
              media?: {
                type?: "image" | "video" | "others";
                content?: string;
              };
            }) => {
              const { _id, level, media, price, socialTarget } = task;
              return (
                <TaskCard
                  key={_id}
                  userTask={{
                    _id,
                    level,
                    media,
                    price,
                    socialTarget,
                  }}
                />
              );
            }
          )
        ) : (
          <p className="flex h-[200px] items-center justify-center">
            Opps🙈... tasks unavailable
          </p>
        )}
      </div>
    </div>
  );
}
