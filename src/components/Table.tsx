"use client";
// import { useState } from "react";
import { useRouter } from "next/navigation";

//components
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
    if (createLocation) {
      setDisabled(false);
    }
  }, [createLocation]);

  function createTaskPage() {
    if (createLocation) {
      navigate.push(createLocation);
    }
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-row p-5 items-center justify-between bg-[var(--gray-10)]">
        <Button
          disabled={disabled}
          btnAction={createTaskPage}
          btnStyle="w-[50px] md:w-[100px] font-black text-white text-[10px] md:text-[14px] p-2 bg-[var(--green)] rounded disabled:bg-[var(--gray-05)]"
        >
          Create
        </Button>
        <Button btnStyle="w-[70px] md:w-[100px] font-black text-white text-[10px] md:text-[14px] p-2 bg-red-600 rounded disabled:bg-[var(--gray-05)]">
          Delete all
        </Button>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="table overflow-hidden">{children}</table>
      </div>
      <div className="w-full px-5 py-2 flex flex-row items-center justify-between bg-[var(--gray-10)]">
        <div>
          Rows per page
          <select name="rows">
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>15</option>
          </select>
          1 - 20 of 1000
        </div>
        <div>{"< 1 2 3 4 5 ... >"}</div>
      </div>
    </div>
  );
}
