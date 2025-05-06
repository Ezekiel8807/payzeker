import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";

//layout
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// import Button from "@/components/Button";
import SideNav from "@/components/SideNav";
import SubHeading from "@/components/SubHeading";
import TaskCreationForm from "@/components/form/TaskCreationForm";

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
          <div className="w-[100%] px-5 lg:w-[70%]">
            <Main>
              <SubHeading
                title="Create Task"
                desc="Where you get your task up runing."
              />

              <TaskCreationForm />
            </Main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
