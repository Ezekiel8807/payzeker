import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";

//components
import SideNav from "@/shared/components/layout/SideNav";
import AppShell from "@/shared/components/layout/AppShell";
import Header from "@/shared/components/layout/Header";
import SubHeading from "@/shared/components/ui/SubHeading";
import UserCreationForm from "@/features/users/forms/UserCreationForm";

export default async function page() {
  const token = await getToken();
  if (!token) redirect("/login");
  if (!token.isAdmin) redirect("/dashboard");

  const isLogin = !!token;
  const { username, isAdmin } = token;

  return (
    <>
      <Header />

      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
              <SubHeading
                title="Create User"
                desc="Setup a new user account."
              />

              <UserCreationForm />
      </AppShell>
    </>
  );
}
