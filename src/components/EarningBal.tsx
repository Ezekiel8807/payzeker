import React from "react";
import Button from "./Button";

type EarningBalPobs = {
  earning: number;
};

export default function EarningBal({ earning }: EarningBalPobs) {
  return (
    <div className="w-full bg-gradient-to-b from-[#f9f9f9] to-[#eefdfa] p-3 shadow-md rounded-lg">
      <div className="text-left">
        <h4 className="font-semibold text-xl">Earning:</h4>
        <h5 className="font-black text-2xl my-1">
          {earning.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
          <span className="ms-1 text-[var(--green)]">NGN</span>
        </h5>
      </div>
      <div className="flex justify-end items-center">
        <Button btnStyle="w-[100px] p-2 font-bold text-[12px] cursor-pointer bg-[var(--green)] hover:text-[var(--green)] rounded">
          Withdraw
        </Button>
      </div>
    </div>
  );
}
