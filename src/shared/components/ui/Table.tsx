"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useEffect, useState } from "react";

type TableProbs = {
  children: React.ReactNode;
  createLocation?: string;
};

export default function Table({ children, createLocation }: TableProbs) {
  const navigate = useRouter();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (createLocation) setDisabled(false);
  }, [createLocation]);

  function createTaskPage() {
    if (createLocation) navigate.push(createLocation);
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-stretch justify-between gap-3 rounded-t-card border border-b-0 border-slate-100 bg-white p-4 sm:flex-row sm:items-center">
        <Button
          disabled={disabled}
          btnAction={createTaskPage}
          variant="primary"
          size="sm"
          className="w-full sm:w-auto"
        >
          Create
        </Button>
        <Button variant="danger" size="sm" className="w-full sm:w-auto">
          Delete all
        </Button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">{children}</table>
      </div>
      <div className="flex flex-col items-start justify-between gap-3 rounded-b-card border border-t-0 border-slate-100 bg-white px-4 py-3 text-xs font-bold text-ink-muted sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <span>Rows per page</span>
          <select
            name="rows"
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-ink-soft focus:border-[var(--green)] focus:outline-none"
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
          </select>
          <span>1 - 20 of 1000</span>
        </div>
        <div className="text-ink-soft">{"< 1 2 3 4 5 ... >"}</div>
      </div>
    </div>
  );
}
