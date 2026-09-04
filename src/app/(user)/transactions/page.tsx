import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import Transaction from "@/shared/models/transactionModel";
import { fetchModelsData } from "@/shared/utils/modelFunc";

//layouts
import AppShell from "@/shared/components/layout/AppShell";
import Header from "@/shared/components/layout/Header";

// Components
import SubHeading from "@/shared/components/ui/SubHeading";
import AllTrans from "@/features/transactions/components/AllTrans";
import UserTrans from "@/features/transactions/components/UserTrans";
import SideNav from "@/shared/components/layout/SideNav";

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
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
              <SubHeading
                title="Transactions"
                desc="Transaction history right here."
              />
              {user.isAdmin ? (
                <AllTrans trans={AllTransac} />
              ) : (
                <UserTrans userId={userId} trans={AllTransac} />
              )}
      </AppShell>
    </>
  );
}
