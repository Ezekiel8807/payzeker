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
import TaskCom from "@/components/TaskCom";

export default async function page() {
  const user = await getToken();
  if (!user) return redirect("/login");

  const isLogin = !!user;
  const { username, isAdmin } = user;
  const [tasks] = await fetchModelsData(Task);

  //filter user tasks
  const userTasks = tasks.filter(
    (e: { userId: string }) => e.userId == user.id
  );

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
                title="Manage Tasks"
                desc="Your Tasks managing page."
              />

              {isAdmin && <AllTasks alltasks={tasks} />}
              {!isAdmin && <TaskCom userTasks={userTasks} />}
            </Main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
