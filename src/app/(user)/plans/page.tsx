import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import Plan from "@/actions/model/planModel";
import { fetchModelsData } from "@/utils/modelFunc";

//layouts
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

//components
import Link from "next/link";
import SubHeading from "@/components/SubHeading";
import PlanCard from "@/components/cards/PlanCard";
import SideNav from "@/components/SideNav";

export default async function page() {
  const user = await getToken();
  const [plans] = await fetchModelsData(Plan);
  const isLogin = !!user;

  if (!user) return redirect("/login");
  const { username, isAdmin } = user;
  if (!isAdmin) return redirect("/dashboard");

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
                title="User Plans"
                desc="Create users plan right here."
              />
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
