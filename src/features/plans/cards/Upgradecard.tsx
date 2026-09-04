"use client";
import { useState } from "react";
import { subToPlan } from "@/features/plans/actions/planAction";

//components
import Button from "@/shared/components/ui/Button";
import ErrorModal from "@/shared/components/modals/ErrorModal";
import SuccessModal from "@/shared/components/modals/SuccessModal";
import ConfirmUpgradeModal from "@/features/plans/components/modals/ConfirmUpgradeModal";
import useFormState from "@/shared/hooks/useFormState";
import PlanDetails from "@/shared/components/ui/PlanDetails";

//type
type UpgradecardProbs = {
  upgradeInfo: {
    _id: string;
    name: string;
    rank: number;
    subDuration: string;
    minWithdrawal: number;
    maxWithdrawal: number;
    minEarning: number;
    price: number;
    elIndex: number;
  };
};

export default function Upgradecard({ upgradeInfo }: UpgradecardProbs) {
  const { isPen, setIspen, isSuc, setIssuc, errMsg, setErrmsg, sucMsg, setSucmsg, isErr, setIserr } = useFormState();
  const [isCon, setIscon] = useState(false);

  const { name, rank, minWithdrawal, maxWithdrawal, minEarning, price } =
    upgradeInfo;

  //function to Upgrade User
  async function UpgradeUser() {
    setIspen(true);
    const response = await subToPlan(upgradeInfo._id);

    if (response.error) {
      setErrmsg(response.msg as string);
      setIserr(true);
      setIspen(false);
      return;
    }

    setSucmsg(response.msg as string);
    setIssuc(true);
    setIspen(false);
  }

  function handleButonClick() {
    setIscon(true);
  }

  //
  return (
    <>
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

        <div className="text-center">
          <Button
            btnAction={handleButonClick}
            disabled={false}
            btnStyle="w-[200px] mx-auto my-3 btn btn-primary disabled:bg-[var(--gray-20)]"
          >
            {isPen ? "Processing..." : "Subscribe"}
          </Button>
        </div>
      </div>

      {isCon && (
        <ConfirmUpgradeModal
          confirmInfo={{ name, price }}
          setIscon={setIscon}
          UpgradeUser={UpgradeUser}
        />
      )}
      {isSuc && (
        <SuccessModal
          setIssuc={setIssuc}
          sucMsg={sucMsg}
          direction="/dashboard"
        />
      )}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
