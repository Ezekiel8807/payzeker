import User from "@/model/userModel";
import Plan from "@/model/planModel";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { fetchModelsData } from "@/utils/modelFunc";
import { fetchModelById } from "@/utils/modelFunc";

//layouts
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";

// Components
import SideNav from "@/components/SideNav";
import SubHeading from "@/components/SubHeading";
import Upgradecard from "@/components/cards/Upgradecard";

import CurrentSubscription from "@/components/CurrentSubscription";

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
      <div className="mx-auto">
        <div className="flex">
          <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
            <SideNav sideNavInfo={{ username, isAdmin, isLogin }} />
          </div>
          <div className="w-[100%] p-5 lg:w-[70%]">
            <Main>

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
            </Main>
          </div>
        </div>
      </div>
    </>
  );
}
