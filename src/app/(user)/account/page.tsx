import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import Transaction from "@/model/transactionModel";
import { fetchModelsData } from "@/utils/modelFunc";

// Components
import SubHeading from "@/components/SubHeading";
import Main from "@/components/layout/Main";
import UserTrans from "@/components/transactions/UserTrans";
import SideNav from "@/components/SideNav";
import Header from "@/components/layout/Header";
import MoneyCom from "@/components/MoneyCom";

export default async function Account() {
  const token = await getToken();
  if (!token) return redirect("/login");

  const isLogin = !!token;
  const { username, isAdmin } = token;
  const [AllTransac] = await fetchModelsData(Transaction);

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
              {/* //account details */}
              <MoneyCom />

              {/* auto scroll element */}
              <div className="w-full mt-5 mx-auto">
                <SubHeading
                  title="Transaction"
                  desc="Transaction history right here."
                />

                <div className="w-full h-screen scroll-smooth overflow-y-scroll">
                  <UserTrans userId={token.id as string} trans={AllTransac} />
                </div>
              </div>
            </Main>
          </div>
        </div>
      </div>
    </>
  );
}
