import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";

//layouts
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

//components
import SubHeading from "@/components/SubHeading";
import PlanCreationForm from "@/components/form/PlanCreationForm";
import SideNav from "@/components/SideNav";

export default async function page() {
  const user = await getToken();
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
          <div className="w-[100%] p-5 lg:w-[70%]">
            <Main>
              <SubHeading
                title="Create Plan"
                desc="creating user subcribtion plan"
              />

              <PlanCreationForm />
            </Main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
