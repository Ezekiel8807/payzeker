import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import Transaction from "@/model/transactionModel";
import { fetchModelsData } from "@/utils/modelFunc";

//layouts
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";

// Components
import SubHeading from "@/components/SubHeading";
import AllTrans from "@/components/transactions/AllTrans";
import UserTrans from "@/components/transactions/UserTrans";
import SideNav from "@/components/SideNav";

export default async function Transactions() {
  const user = await getToken();
  const [AllTransac] = await fetchModelsData(Transaction);
  if (!user) return redirect("/login");

  const isLogin = !!user;
  const userId = user.id as string;
  const { username, isAdmin } = user;

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
                title="Transactions"
                desc="Transaction history right here."
              />
              {user.isAdmin ? (
                <AllTrans trans={AllTransac} />
              ) : (
                <UserTrans userId={userId} trans={AllTransac} />
              )}
            </Main>
          </div>
        </div>
      </div>
    </>
  );
}
