"use client";
import Button from "@/shared/components/ui/Button";
import PlanDetails from "@/shared/components/ui/PlanDetails";

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
  const isPen = false;
  const { name, rank, minWithdrawal, maxWithdrawal, minEarning, price } = plan;

  return (
    <div className="card">
      <h1 className="font-black text-center uppercase p-3 text-[20px]">
        {name}
      </h1>

      <PlanDetails
        rank={rank}
        minWithdrawal={minWithdrawal}
        maxWithdrawal={maxWithdrawal}
        minEarning={minEarning}
        price={price}
      />

      <div className="text-end">
        <Button
          btnStyle="btn btn-danger py-1 px-3 mx-1 my-3 text-[12px]"
        >
          {isPen ? "Processing..." : "Delete"}
        </Button>
        <Button
          disabled={false}
          btnStyle="btn btn-primary py-1 px-3 mx-2 my-3 text-[12px] disabled:bg-[var(--gray-20)]"
        >
          {isPen ? "Processing..." : "Edit"}
        </Button>
      </div>
    </div>
  );
}
