"use client";
import { useEffect, useState } from "react";

//components
import TaskCom2 from "./TaskCom2";
import TaskCom1 from "./TaskCom1";
import TaskCom3 from "./TaskCom3";

type TaskComTypeProbs = {
  isAdmin: boolean;

  alltasks: { _id: string; name: string; state: string; price: number }[];

  userTasks: {
    _id: string;
    taskName: string;
    state: string;
    price: number;
  }[];

  busniessTasks: {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
  }[];
};

export default function TaskCom({
  isAdmin,
  alltasks,
  userTasks,
  busniessTasks,
}: TaskComTypeProbs) {
  const [activeTab, setActiveTab] = useState("user");

  function changeToTasks() {
    setActiveTab("tasks");
  }

  function changeToUser() {
    setActiveTab("user");
  }

  function changeToBusniess() {
    setActiveTab("busniess");
  }

  useEffect(() => {
    if (isAdmin) {
      setActiveTab("tasks");
    } else {
      setActiveTab("user");
    }
  }, [isAdmin]);

  return (
    <>
      <div className="w-full ">
        <div className="flex mb-5 items-center justify-end">
          <div className="flex gap-2">
            {isAdmin && (
              <div
                className={`w-[100px] p-1 shadow-md rounded-full text-center cursor-pointer ${
                  activeTab === "tasks"
                    ? "bg-[var(--green)]"
                    : "bg-white border border-[var(--green)]"
                }`}
                onClick={changeToTasks}
              >
                Tasks
              </div>
            )}

            <div
              className={`w-[100px] p-1 shadow-md rounded-full text-center cursor-pointer ${
                activeTab === "user"
                  ? "bg-[var(--green)]"
                  : "bg-white border border-[var(--green)]"
              }`}
              onClick={changeToUser}
            >
              User
            </div>
            <div
              className={`w-[100px] p-1 shadow-md rounded-full text-center cursor-pointer ${
                activeTab === "busniess"
                  ? "bg-[var(--green)]"
                  : "bg-white border border-[var(--green)]"
              }`}
              onClick={changeToBusniess}
            >
              Busniess
            </div>
          </div>
        </div>

        {activeTab == "tasks" && <TaskCom3 alltasks={alltasks} />}
        {activeTab == "user" && <TaskCom1 userTasks={userTasks} />}
        {activeTab == "busniess" && <TaskCom2 busniessTasks={busniessTasks} />}
      </div>
    </>
  );
}
