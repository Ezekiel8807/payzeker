/* -eslint-disable @typescript-eslint/no-explicit-any- */
import Plan from "@/model/planModel";
// import { redirect } from "next/navigation";
// import { getToken } from "@/actions/action";
// import { connectDB } from "../../../lib/mongodb";
import { fetchModelsData } from "@/utils/scripting";

// Components
import SubHeading from "@/components/SubHeading";
import Upgradecard from "@/components/cards/Upgradecard";
import Main from "@/components/layout/Main";

const fetchData = await fetchModelsData(Plan);

// const upgrade = [
//   {
//     name: "IRON",
//     rank: 1,
//     numOfTask: 1,
//     minWid: 15,
//     maxWid: 30,
//     minEarning: 3,
//     price: "Free",
//   },
//   {
//     name: "BRASS",
//     rank: 2,
//     numOfTask: 2,
//     minWid: 15,
//     maxWid: 50,
//     minEarning: 12,
//     price: 5000,
//   },
//   {
//     name: "SILVER",
//     rank: 3,
//     numOfTask: 3,
//     minWid: 10,
//     maxWid: 80,
//     minEarning: 27,
//     price: 15000,
//   },
//   {
//     name: "GOLD",
//     rank: 4,
//     numOfTask: 4,
//     minWid: 5,
//     maxWid: 150,
//     minEarning: 48,
//     price: 30000,
//   },
//   {
//     name: "DIAMOND",
//     rank: 5,
//     numOfTask: 5,
//     minWid: "No",
//     maxWid: 200,
//     minEarning: 75,
//     price: 50000,
//   },
// ];

export default async function Upgrade() {
  const [plans] = fetchData;

  return (
    <Main>
      <SubHeading title="User Upgrade" desc="Heigher previledges upgrading." />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-5">
        {plans.map(
          (
            el: {
              _id: string;
              name: string;
              rank: number;
              subDuration: string;
              minWithdrawal: number;
              maxWithdrawal: number;
              minEarning: number;
              price: number;
            },
            i: number
          ) => (
            <Upgradecard upgradeInfo={{ ...el, elIndex: 1 + i }} key={el._id} />
          )
        )}
      </div>
    </Main>
  );
}
