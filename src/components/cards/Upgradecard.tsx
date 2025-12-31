"use client";
import { useState } from "react";
import { subToPlan } from "@/actions/planAction";

//components
import Button from "../Button";
import ErrorModal from "../modal/ErrorModal";
import SuccessModal from "../modal/SuccessModal";
import ConfirmUpgradeModal from "../modal/ConfirmUpgradeModal";

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
  const [isPen, setIspen] = useState(false);
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
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
      <div className="bg-[var(--gray-05)] rounded-lg">
        <h1 className="font-black text-center uppercase p-3 text-[20px]">
          {name}
        </h1>

        <div className="p-3 bg-[var(--gray-01)]">
          <ul className="px-5 text-[12px]">
            <li className="list-disc">Rank {rank}</li>
            <li className="list-disc">{rank} task per day </li>
            <li className="list-disc">#{minWithdrawal} min withdral</li>
            <li className="list-disc">#{maxWithdrawal} max withdral</li>
            <li className="list-disc">Min monthly Earning #{minEarning}</li>
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

        <div className="text-center">
          <Button
            btnAction={handleButonClick}
            disabled={false}
            btnStyle="w-[200px] mx-auto my-3 p-2 font-black text-white disabled:bg-[var(--gray-20)] bg-[var(--green)] rounded-lg"
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

{
  /* <div className="text-center">
  <Button
    disabled={true}
    btnStyle="w-[200px] mx-auto my-3 p-2 font-black text-white disabled:bg-[var(--gray-20)] bg-[var(--green)] rounded-lg"
  >
    Subscribe
  </Button>
</div>; */
}
