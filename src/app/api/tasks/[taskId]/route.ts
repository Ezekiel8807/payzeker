import Task from "@/model/taskModel";

//task data model
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;

  //fetch data from database
  const taskInfo = await Task.find({ _id: taskId });

  //respond with data
  return Response.json(taskInfo);
}
