import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import Transaction from "@/shared/models/transactionModel";
import { fetchModelsData } from "@/shared/utils/modelFunc";

// Components
import SubHeading from "@/shared/components/ui/SubHeading";
import AppShell from "@/shared/components/layout/AppShell";
import UserTrans from "@/features/transactions/components/UserTrans";
import SideNav from "@/shared/components/layout/SideNav";
import Header from "@/shared/components/layout/Header";
import MoneyCom from "@/features/withdrawals/components/MoneyCom";

export default async function Account() {
  const token = await getToken();
  if (!token) return redirect("/login");

  const isLogin = !!token;
  const { username, isAdmin } = token;
  const [AllTransac] = await fetchModelsData(Transaction);

  return (
    <>
      <Header />
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
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
      </AppShell>
    </>
  );
}
