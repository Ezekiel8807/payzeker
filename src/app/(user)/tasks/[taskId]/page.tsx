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
import Main from "@/components/layout/Main";

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
            <Main>
              <SubHeading
                title="Task Details"
                desc="More information on how to perform task"
              />

              {/* General Instructions */}
              <section className="bg-white rounded-xl mb-5">
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  General Instructions
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Please ensure your submission is clear and accurate.
                  Submissions must meet the task requirements to be approved.
                  Avoid fake screenshots or incomplete proofs, as that could
                  lead to disqualification or ban. If you have any technical
                  issues, contact support using the help button.
                </p>
              </section>

              {/* Task Details */}
              <section className="bg-white rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg md:text-xl font-semibold">
                    Task Details
                  </h2>
                  <span className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm">
                    Level: {taskInfo.level}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>{taskInfo.name}</strong>
                  <br />
                  {taskInfo.instruction}
                </p>

                {taskInfo.caption && (
                  <div>
                    <h3 className="text-lg font-medium">Caption</h3>
                    <p className="bg-gray-100 p-3 rounded text-gray-800 text-sm font-mono">
                      {taskInfo.caption}
                    </p>
                  </div>
                )}
              </section>

              <MediaCom media={taskInfo.media} />

              <div className="w-[100%] md:w-[60%] mb-10">
                <SubHeading
                  title="Task Submission"
                  desc="Submitting proof for Payment"
                />
                <TaskSubmissionForm taskId={taskInfo._id.toString()} />
              </div>

              {/* Task Submission */}
              {/* <section className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Task Submission</h2>
                <p className="text-gray-600 mb-2">
                  Upload an image or video record for task verification
                </p>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    className="border px-4 py-2 rounded-md w-full"
                  />
                  <button className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600">
                    Submit
                  </button>
                </div>
              </section> */}
            </Main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
