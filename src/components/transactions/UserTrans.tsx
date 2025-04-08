import React from "react";
import TransCard from "../cards/TransCard";

export default function UserTrans() {
  return (
    <div className="flex flex-col md:flex-row my-3">
      <div className="w-full h-[300px] py-3 overflow-y-scroll">
        <TransCard />
        <TransCard />
        <TransCard />
        <TransCard />
        <TransCard />
      </div>
    </div>
  );
}
