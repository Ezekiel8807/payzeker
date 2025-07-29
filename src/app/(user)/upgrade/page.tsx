import Plan from "@/model/planModel";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { fetchModelsData } from "@/utils/modelFunc";

//layouts
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Components
import SideNav from "@/components/SideNav";
import SubHeading from "@/components/SubHeading";
import Upgradecard from "@/components/cards/Upgradecard";

export default async function Upgrade() {
  const user = await getToken();
  const [plans] = await fetchModelsData(Plan);
  const isLogin = !!user;

  if (!user) return redirect("/login");
  const { username, isAdmin } = user;

  return (
    <>
      <Header />
      <div className="mx-auto">
        <div className="flex">
          <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
            <SideNav sideNavInfo={{ username, isAdmin, isLogin }} />
          </div>
          <div className="w-[100%] px-5 lg:w-[70%]">
            <Main>
              <SubHeading
                title="User Upgrade"
                desc="Heigher previledges upgrading."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-5">
                {plans
                  .filter((e: { isDefault: boolean }) => !e.isDefault)
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
      <Footer />
    </>
  );
}
