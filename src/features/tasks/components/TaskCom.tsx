"use client";
import { useEffect, useState } from "react";
import TaskCom2 from "./TaskCom2";
import TaskCom1 from "./TaskCom1";
import TaskCom3 from "./TaskCom3";

type TaskComTypeProbs = {
  isAdmin: boolean;
  alltasks: { _id: string; name: string; state: string; price: number }[];
  userTasks: { _id: string; taskName: string; state: string; price: number }[];
  busniessTasks: { _id: string; name: string; startDate: string; endDate: string; isActive: boolean }[];
};

export default function TaskCom({ isAdmin, alltasks, userTasks, busniessTasks }: TaskComTypeProbs) {
  const [activeTab, setActiveTab] = useState("user");

  useEffect(() => {
    setActiveTab(isAdmin ? "tasks" : "user");
  }, [isAdmin]);

  const tabClass = (tab: string) =>
    `w-[100px] p-1 rounded-full text-center cursor-pointer font-bold transition-colors ${activeTab === tab ? "bg-[var(--green)] text-white shadow-soft" : "bg-white border border-[var(--green)] text-[var(--green)]"}`;

  return (
    <div className="w-full">
      <div className="flex mb-5 items-center justify-end">
        <div className="flex gap-2">
          {isAdmin && <div className={tabClass("tasks")} onClick={() => setActiveTab("tasks")}>Tasks</div>}
          <div className={tabClass("user")} onClick={() => setActiveTab("user")}>User</div>
          <div className={tabClass("busniess")} onClick={() => setActiveTab("busniess")}>Busniess</div>
        </div>
      </div>
      {activeTab == "tasks" && <TaskCom3 alltasks={alltasks} />}
      {activeTab == "user" && <TaskCom1 userTasks={userTasks} />}
      {activeTab == "busniess" && <TaskCom2 busniessTasks={busniessTasks} />}
    </div>
  );
}
