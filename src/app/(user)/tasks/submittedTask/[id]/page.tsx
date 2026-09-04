import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import SubmittedTask from "@/features/tasks/models/submittedTaskModel";
import { fetchModelById } from "@/shared/utils/modelFunc";

//cononents
import SubmittedTaskDetails from "@/features/tasks/components/SubmittedTaskDetails";
import AppShell from "@/shared/components/layout/AppShell";
import Header from "@/shared/components/layout/Header";
import SideNav from "@/shared/components/layout/SideNav";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getToken();
  if (!user) return redirect("/login");

  const isLogin = !!user;
  const { username, isAdmin } = user;
  if (!isAdmin) return redirect("/dashboard");

  const subTask = await fetchModelById(SubmittedTask, id);

  return (
    <>
      <Header />
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
        <SubmittedTaskDetails subTask={subTask} />
      </AppShell>
    </>
  );
}
