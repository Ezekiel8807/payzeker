"use client";
import { useRouter } from "next/navigation";

//components
import Button from "./Button";

type TableProbs = {
  disabled?: boolean;
  children: React.ReactNode;
};

export default function Table({ children, disabled = true }: TableProbs) {
  const navigate = useRouter();

  function createTaskPage() {
    navigate.push("/tasks/newTask");
  }

  return (
    <div className="flex flex-col items-center justify-between ">
      <div className="w-full p-5 flex flex-row items-center justify-between bg-[var(--gray-10)]">
        <div className="w-[20%]">
          <Button
            disabled={disabled}
            btnAction={createTaskPage}
            btnStyle="w-[50px] md:w-[100px] font-black text-white text-[10px] md:text-[14px] p-2 bg-[var(--green)] rounded disabled:bg-[var(--gray-05)]"
          >
            Create
          </Button>
        </div>
        <div className="w-[80%] text-end">
          <Button
            disabled={disabled}
            btnStyle="w-[50px] md:w-[100px] font-black text-white text-[10px] md:text-[14px] mx-2 p-2 rounded bg-[var(--green)] disabled:bg-[var(--gray-05)]"
          >
            Edit
          </Button>
          <Button btnStyle="w-[70px] md:w-[100px] font-black text-white text-[10px] md:text-[14px] p-2 bg-red-600 rounded disabled:bg-[var(--gray-05)]">
            Delete all
          </Button>
        </div>
      </div>
      <div>{children}</div>
      <div className="w-full px-5 py-2 flex flex-row items-center justify-between bg-[var(--gray-10)]">
        <div>
          Rows per page
          <select>
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
