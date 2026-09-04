"use client";
import { useState } from "react";
import GenAccord from "./GenAccord";
import WorAccord from "./WorAccord";
import BusAccord from "./BusAccord";

const faqState = ["general", "worker", "bussniess"];

export default function Accordion() {
  const [activeFaqSate, setActivefaqstate] = useState(faqState[0]);

  return (
    <>
      <div className="flex flex-row mb-5 items-center justify-center gap-1 sm:gap-2">
        {faqState.map((e: string, i: number) => (
          <div
            className={`w-[70px] sm:w-[100px] sm:text-sm text-[12px] p-2 ${
              activeFaqSate === e ? "bg-[var(--green)] text-white" : "bg-[#BCDFD5]"
            } text-center capitalize rounded-full cursor-pointer`}
            key={e}
            onClick={() => setActivefaqstate(faqState[i])}
          >
            {e}
          </div>
        ))}
      </div>
      {activeFaqSate == faqState[0] && <GenAccord />}
      {activeFaqSate == faqState[1] && <WorAccord />}
      {activeFaqSate == faqState[2] && <BusAccord />}
    </>
  );
}
