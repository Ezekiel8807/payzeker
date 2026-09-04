import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";

//layouts
import AppShell from "@/shared/components/layout/AppShell";
import Header from "@/shared/components/layout/Header";

//components
import SubHeading from "@/shared/components/ui/SubHeading";
import PlanCreationForm from "@/features/plans/forms/PlanCreationForm";
import SideNav from "@/shared/components/layout/SideNav";

export default async function page() {
  const user = await getToken();
  const isLogin = !!user;

  if (!user) return redirect("/login");
  const { username, isAdmin } = user;
  if (!isAdmin) return redirect("/dashboard");

  return (
    <>
      <Header />
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
              <SubHeading
                title="Create Plan"
                desc="creating user subcribtion plan"
              />

              <PlanCreationForm />
      </AppShell>
    </>
  );
}
