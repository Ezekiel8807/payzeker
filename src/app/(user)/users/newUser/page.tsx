import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";

//components
import SideNav from "@/components/SideNav";
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubHeading from "@/components/SubHeading";
import UserCreationForm from "@/components/form/UserCreationForm";

export default async function page() {
  const token = await getToken();
  if (!token) redirect("/login");
  if (!token.isAdmin) redirect("/dashboard");

  const isLogin = !!token;
  const { username, isAdmin } = token;

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
                title="Create User"
                desc="Setup a new user account."
              />

              <UserCreationForm />
            </Main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
