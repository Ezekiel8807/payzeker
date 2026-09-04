import Plan from "@/features/plans/models/planModel";
import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import { fetchModelsData } from "@/shared/utils/modelFunc";

//layouts
import AppShell from "@/shared/components/layout/AppShell";
import Header from "@/shared/components/layout/Header";

//components
import SubHeading from "@/shared/components/ui/SubHeading";
import PlanCard from "@/features/plans/cards/PlanCard";
import SideNav from "@/shared/components/layout/SideNav";

export default async function page() {
  const user = await getToken();
  if (!user) return redirect("/login");

  const isLogin = !!user;
  const { username, isAdmin } = user;
  const [plans] = await fetchModelsData(Plan);

  //filter business plans
  const plansInfo = plans.filter(
    (e: { isDefault: boolean }) => !e.isDefault
  );

  return (
    <>
      <Header />
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
              <SubHeading
                title="Plans"
                desc="Here are available plans."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-5">
                {plansInfo.map(
                  (el: {
                    _id: string;
                    name: string;
                    rank: number;
                    subDuration: string;
                    minWithdrawal: number;
                    maxWithdrawal: number;
                    minEarning: number;
                    price: number;
                  }) => (
                    <PlanCard plan={el} key={el._id} />
                  )
                )}
              </div>
      </AppShell>
    </>
  );
}
