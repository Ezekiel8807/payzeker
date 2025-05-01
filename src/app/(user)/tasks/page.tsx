import Task from "@/model/taskModel";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { fetchModelsData } from "@/utils/modelFunc";

// Components
import SubHeading from "@/components/SubHeading";
import Main from "@/components/layout/Main";
import AllTasks from "@/components/AllTasks";

// Fetch user data on the server
const fetchData = await fetchModelsData(Task);

export default async function page() {
  const user = await getToken();

  if (!user.isAdmin) {
    return redirect("/dashboard");
  }
  const [tasks] = fetchData;

  return (
    <Main>
      <SubHeading
        title="All Tasks"
        desc="Earn real cash for completing task."
      />

      <AllTasks alltasks={tasks} />
    </Main>
  );
}
