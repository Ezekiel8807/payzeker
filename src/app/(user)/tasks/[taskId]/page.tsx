import mongoose from "mongoose";
import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";

//layout
// import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

//components
import SideNav from "@/components/SideNav";
import MediaCom from "@/components/MediaCom";
import SubHeading from "@/components/SubHeading";
import TaskSubmissionForm from "@/components/form/TaskSubmissionForm";

async function getTaskInfo(id: string) {
  const token = await getToken();
  if (!token) return redirect("/login");

  // datase connection
  await connectDB();

  // fetch the task
  const user = await User.findOne({ username: token.username }).populate(
    "tasks"
  );

  // Convert `taskId` to ObjectId if necessary
  const taskObjectId = mongoose.Types.ObjectId.isValid(id)
    ? new mongoose.Types.ObjectId(id)
    : null;

  // Find task in user's tasks
  const taskInfo = user.tasks.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (task: any) => task._id?.toString() === taskObjectId!.toString()
  );

  return await JSON.parse(JSON.stringify(taskInfo));
}

export default async function TaskDetails({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const user = await getToken();
  const { taskId } = await params;
  const taskInfo = await getTaskInfo(taskId);

  const isLogin = !!user;
  if (!user) return redirect("/login");
  const { username, isAdmin } = user;

  return (
    <>
      <Header />
      <div className="mx-auto">
        <div className="flex">
          <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
            <SideNav sideNavInfo={{ username, isAdmin, isLogin }} />
          </div>
          <div className="w-[100%] px-5 lg:w-[70%]">
            <SubHeading
              title="Task Details"
              desc="More information on how to perform task"
            />
            <div className="inline-block relative align-top w-[100%] md:w-[60%]">
              <div className="block text-end">
                <div className="w-[80px] md:w-[80px] p-2 md:mx-3 float-end rounded-lg bg-[var(--green)]">
                  <span className="font-bold text-[var(--white)]">Level:</span>
                  <span className="font-bold text-[var(--white)] ms-1">
                    {taskInfo.level}
                  </span>
                </div>
              </div>

              <div className="block mb-5">
                <h2 className="text-md font-bold mt-5 mb-2 md:mt-3 md:mb-3">
                  {taskInfo.name}
                </h2>
                <p className="w-full">{taskInfo.instruction}</p>
              </div>
            </div>
            <MediaCom link={taskInfo.link} media={taskInfo.media} />
            <div className="w-[100%] md:w-[60%] mb-10">
              <SubHeading
                title="Task Submission"
                desc="Submitting proof for Payment"
              />
              <TaskSubmissionForm taskId={taskInfo._id.toString()} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
