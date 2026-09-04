import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";

//components
import AppShell from "@/shared/components/layout/AppShell";
import SideNav from "@/shared/components/layout/SideNav";
import Header from "@/shared/components/layout/Header";
import PayGameCom from "@/features/lucky-spin/components/PayGameCom";

export default async function page() {
  const user = await getToken();
  const isLogin = !!user;
  if (!user) redirect("/login");

  const { username, isAdmin } = user;

  return (
    <>
      <Header />

      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
        <PayGameCom />
      </AppShell>
    </>
  );
}
