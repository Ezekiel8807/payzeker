import React from "react";

type SubHeadingPProbs = {
  title: string;
  desc: string;
};

export default function SubHeading({ title, desc }: SubHeadingPProbs) {
  return (
    <div className="mb-5">
      <h1 className="font-black text-[20px] sm:text-[25px] md:text-[30px]">
        {title}
      </h1>
      <p className="text-[10px] sm:text-[12px] md:text-[14px]">{desc}</p>
    </div>
  );
}
