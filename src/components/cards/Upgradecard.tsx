//components
import Button from "../Button";

//type
type UpgradecardProbs = {
  upgradeInfo: {
    name: string;
    rank: number;
    numOfTask: number;
    minWid: number | string;
    maxWid: number;
    minEarning: number;
    price: number | string;
    userRank: number;
    elIndex: number;
  };
};

export default function Upgradecard({ upgradeInfo }: UpgradecardProbs) {
  return (
    <div className="bg-[var(--gray-05)] rounded-lg">
      <h1 className="font-black text-center p-3 text-[30px]">
        {upgradeInfo.name}
      </h1>

      <div className="p-3 bg-[var(--gray-01)]">
        <ul className="px-5">
          <li className="list-disc">Rank {upgradeInfo.rank}</li>
          <li className="list-disc">{upgradeInfo.numOfTask} task per day </li>
          <li className="list-disc">{upgradeInfo.minWid}k min withdral </li>
          <li className="list-disc">{upgradeInfo.maxWid}k max withdral </li>
          <li className="list-disc">
            Min monthly Earning {upgradeInfo.minEarning}k
          </li>
        </ul>
        <div className="w-[200px] flex items-center justify-center gap-2">
          <span className="font-black text-[15px]">Price:</span>
          <h2 className="font-black text-center text-[25px] text-[var(--green)]">
            {typeof upgradeInfo.price == typeof ""
              ? upgradeInfo.price
              : upgradeInfo.price.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
          </h2>
        </div>
      </div>

      {upgradeInfo.userRank >= upgradeInfo.elIndex ? (
        <div className="text-center">
          <Button
            disabled={true}
            btnStyle="w-[200px] mx-auto my-3 p-2 font-black text-white disabled:bg-[var(--gray-20)] bg-[var(--green)] rounded-lg"
          >
            Subscribe
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <Button
            disabled={false}
            btnStyle="w-[200px] mx-auto my-3 p-2 font-black text-white disabled:bg-[var(--gray-20)] bg-[var(--green)] rounded-lg"
          >
            Subscribe
          </Button>
        </div>
      )}
    </div>
  );
}
