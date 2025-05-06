import Task from "@/model/taskModel";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { fetchModelsData } from "@/utils/modelFunc";

//layout
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Components
import SideNav from "@/components/SideNav";
import AllTasks from "@/components/AllTasks";
import SubHeading from "@/components/SubHeading";

export default async function page() {
  const user = await getToken();
  const [tasks] = await fetchModelsData(Task);

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
                title="All Tasks"
                desc="Earn real cash for completing task."
              />

              <AllTasks alltasks={tasks} />
            </Main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
