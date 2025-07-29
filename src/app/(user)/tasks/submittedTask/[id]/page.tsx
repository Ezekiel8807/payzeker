import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import SubmittedTask from "@/model/submittedTaskModel";
import { fetchModelById } from "@/utils/modelFunc";

//cononents
import SubmittedTaskDetails from "@/components/SubmittedTaskDetails";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getToken();
  const { isAdmin } = user;
  const subTask = await fetchModelById(SubmittedTask, id);

  if (!user) return redirect("/login");
  if (!isAdmin) return redirect("/dashboard");

  return <SubmittedTaskDetails subTask={subTask} />;
}
