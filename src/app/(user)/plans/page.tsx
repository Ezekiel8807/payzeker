import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import Plan from "@/model/planModel";
import { fetchModelsData } from "@/utils/scripting";

import Link from "next/link";
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import PlanCard from "@/components/cards/PlanCard";

const result = await fetchModelsData(Plan);

export default async function page() {
  const user = await getToken();

  if (!user.isAdmin) {
    return redirect("/dashboard");
  }

  const [plans] = result;

  return (
    <Main>
      <SubHeading title="User Plans" desc="Create users plan right here." />
      <div className="flex py-3 px-5 mb-5 items-center justify-between bg-[var(--gray-05)] shadow-md">
        <h2 className="font-black text-[18px]">Plans</h2>

        <Link
          className="w-[100px]  p-2 text-[12px] font-black text-center text-white bg-[var(--green)] rounded-2xl"
          href="/plans/newPlan"
        >
          Create Plan
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {plans.map(
          (plan: {
            _id: string;
            name: string;
            rank: number;
            subDuration: string;
            minWithdrawal: number;
            maxWithdrawal: number;
            minEarning: number;
            price: number;
          }) => (
            <PlanCard key={plan._id} plan={plan} />
          )
        )}
      </div>
    </Main>
  );
}
