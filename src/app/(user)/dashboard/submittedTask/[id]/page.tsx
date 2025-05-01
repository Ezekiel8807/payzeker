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
  const subTask = await fetchModelById(SubmittedTask, id);

  return <SubmittedTaskDetails subTask={subTask} />;
}
