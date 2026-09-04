import User from "@/shared/models/userModel";
import Plan from "@/features/plans/models/planModel";
import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import { fetchModelsData } from "@/shared/utils/modelFunc";
import { fetchModelById } from "@/shared/utils/modelFunc";

//layouts
import AppShell from "@/shared/components/layout/AppShell";
import Header from "@/shared/components/layout/Header";

// Components
import SideNav from "@/shared/components/layout/SideNav";
import SubHeading from "@/shared/components/ui/SubHeading";
import Upgradecard from "@/features/plans/cards/Upgradecard";

import CurrentSubscription from "@/features/plans/components/CurrentSubscription";

export default async function Subscription() {
  const token = await getToken();
  if (!token) redirect("/login");

  const isLogin = !!token;
  const [plans] = await fetchModelsData(Plan);
  const user = await fetchModelById(User, token.id);

  const { username, isAdmin, planName, subStartDate, subEndDate, subDuration } = user;

  return (
    <>
      <Header />
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>

              <SubHeading
                title="Subscription"
                desc="Upgrade to unlock higher privileges."
              />

              <CurrentSubscription
                subInfo={{ planName, subStartDate, subEndDate, subDuration }}
              />




              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-5">
                {plans.filter((e: { isDefault: boolean }) => !e.isDefault)
                  .map(
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
                      <Upgradecard
                        upgradeInfo={{ ...el, elIndex: 1 + i }}
                        key={el._id}
                      />
                    )
                  )}
              </div>
            </AppShell>
    </>
  );
}
