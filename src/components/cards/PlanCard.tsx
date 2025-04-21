"use client";
import React, { useState } from "react";
import Button from "../Button";

type PlanCardProbs = {
  plan: {
    _id: string;
    name: string;
    rank: number;
    subDuration: string;
    minWithdrawal: number;
    maxWithdrawal: number;
    minEarning: number;
    price: number;
  };
};

export default function PlanCard({ plan }: PlanCardProbs) {
  const [isPen, setIspen] = useState(false);
  const { name, rank, minWithdrawal, maxWithdrawal, minEarning, price } = plan;

  return (
    <div className="bg-[var(--gray-05)] rounded-lg">
      <h1 className="font-black text-center uppercase p-3 text-[20px]">
        {name}
      </h1>

      <div className="p-3  bg-[var(--gray-01)]">
        <ul className="px-5 text-[12px]">
          <li className="list-disc">Rank {rank}</li>
          <li className="list-disc">{rank} task per day </li>
          <li className="list-disc">#{minWithdrawal} min withdral</li>
          <li className="list-disc">#{maxWithdrawal} max withdral</li>
          <li className="list-disc"> Min monthly Earning #{minEarning}</li>
        </ul>
        <div className="w-[200px] flex items-center justify-center gap-2">
          <span className="font-black text-[12px]">Price:</span>
          <h2 className="font-black text-center text-[16px] text-[var(--green)]">
            {price
              ? price.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })
              : "Free"}
          </h2>
        </div>
      </div>

      <div className="text-end">
        <Button
          // btnAction={handleButonClick}
          btnStyle="py-1 px-3 mx-1 my-3  text-[12px] font-black text-white bg-red-600 rounded-lg"
        >
          {isPen ? "Processing..." : "Delete"}
        </Button>
        <Button
          // btnAction={handleButonClick}
          disabled={false}
          btnStyle="py-1 px-3 mx-2 my-3 text-[12px] font-black text-white disabled:bg-[var(--gray-20)] bg-[var(--green)] rounded-lg"
        >
          {isPen ? "Processing..." : "Edit"}
        </Button>
      </div>
    </div>
  );
}
