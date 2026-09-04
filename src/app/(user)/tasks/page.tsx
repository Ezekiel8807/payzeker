import Task from "@/features/tasks/models/taskModel";
import SubmittedTask from "@/features/tasks/models/submittedTaskModel";
import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import { fetchModelsData } from "@/shared/utils/modelFunc";

//layouts
import AppShell from "@/shared/components/layout/AppShell";
import Header from "@/shared/components/layout/Header";

// Components
import SideNav from "@/shared/components/layout/SideNav";
import SubHeading from "@/shared/components/ui/SubHeading";
import TaskCom from "@/features/tasks/components/TaskCom";

export default async function page() {
  const user = await getToken();
  if (!user) return redirect("/login");

  const isLogin = !!user;
  const { username, isAdmin } = user;
  const [tasks, subTasks] = await fetchModelsData(Task, SubmittedTask);

  //filter user tasks
  const busniessTasks = tasks.filter(
    (e: { userId: string }) => e.userId == user.id
  );

  //filter user submitted tasks
  const userTasks = subTasks.filter(
    (e: { userId: string }) => e.userId == user.id
  );

  return (
    <>
      <Header />
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
              <SubHeading
                title="Manage Tasks"
                desc="Your Tasks managing page."
              />

              <TaskCom
                isAdmin={isAdmin}
                alltasks={tasks}
                userTasks={userTasks}
                busniessTasks={busniessTasks}
              />
      </AppShell>
    </>
  );
}
