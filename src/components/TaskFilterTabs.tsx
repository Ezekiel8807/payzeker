// components/TaskFilterTabs.tsx
import React from "react";

interface Props {
  filters: string[];
  active: string;
  onChange: (val: string) => void;
}

export default function TaskFilterTabs({ filters, active, onChange }: Props) {
  return (
    <div className="w-full flex gap-3 mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`px-4 py-2 rounded-xl text-[12px] font-medium ${
            active === filter
              ? "bg-[#29cd9c] text-white"
              : "border border-[#29cd9c] text-[#29cd9c]"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
