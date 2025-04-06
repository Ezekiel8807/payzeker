"use client";
// import { use } from "react";
// import { Key } from "react";
import { useState } from "react";

//components
import Search from "./Search";
import SubmittedTaskCard from "./cards/SubmittedTaskCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SubmittedTaskCom({ subTaskArr }: { subTaskArr: any }) {
  const [allSubmittedTask, setAllsubmittedtask] = useState(subTaskArr);
  return (
    <div>
      <Search />

      {allSubmittedTask.length > 0 ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        allSubmittedTask.map((subTask: any) => (
          <SubmittedTaskCard key={subTask._id} subTask={subTask} />
        ))
      ) : (
        <div className="h-[200px] flex items-center justify-center">
          <p className="w-[200px] text-center text-gray-600">
            No submitted tasks. Check back later.
          </p>
        </div>
      )}
    </div>
  );
}
