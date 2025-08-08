import Task from "@/model/taskModel";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { fetchModelById } from "@/utils/modelFunc";

//layout
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

//components
import SideNav from "@/components/SideNav";
import MediaCom from "@/components/MediaCom";
import SubHeading from "@/components/SubHeading";
import Main from "@/components/layout/Main";

interface TaskDetailsPageProps {
  params: { taskId: string };
}

export default async function TaskDetails({ params }: TaskDetailsPageProps) {
  const user = await getToken();
  if (!user) return redirect(`/login?redirectTo=/tasks/${params.taskId}`);

  const isLogin = !!user;
  const { taskId } = params;
  const { username, isAdmin } = user;
  const taskInfo = await fetchModelById(Task, taskId);

  const remainingDays = Math.max(
    Math.ceil(
      (new Date(taskInfo.endDate).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
    ),
    0
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
                title="Task Details"
                desc="More information on how to perform task"
              />

              <section className="bg-white rounded-xl p-5 shadow-md space-y-5">
                {/* Task Title and Level */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{taskInfo.name}</h2>
                  <span className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm">
                    Level: {taskInfo.level}
                  </span>
                </div>

                {/* Status Tags */}
                <div className="flex flex-wrap gap-3">
                  <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    State: {taskInfo.state}
                  </span>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      taskInfo.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    Status: {taskInfo.isActive ? "Active" : "Paused"}
                  </span>
                  <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    Social Target: {taskInfo.socialTarget}
                  </span>
                </div>

                {/* Timeline Info */}
                <div>
                  <h3 className="text-lg font-medium mb-1">Timeline</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>
                      <strong>Remaining Days: </strong> {remainingDays}
                    </li>
                    <li>
                      <strong>Start Date:</strong>{" "}
                      {taskInfo.startDate
                        ? new Date(taskInfo.startDate).toLocaleString()
                        : "Not started"}
                    </li>
                    <li>
                      <strong>Pause Date:</strong>{" "}
                      {taskInfo.pauseDate
                        ? new Date(taskInfo.pauseDate).toLocaleString()
                        : "Never paused"}
                    </li>
                    <li>
                      <strong>End Date:</strong>{" "}
                      {taskInfo.endDate
                        ? new Date(taskInfo.endDate).toLocaleString()
                        : "No end date"}
                    </li>
                  </ul>
                </div>

                {/* Caption */}
                {taskInfo.caption && (
                  <div>
                    <h3 className="text-lg font-medium mb-1">Caption</h3>
                    <p className="bg-gray-100 p-3 rounded text-gray-800 text-sm font-mono whitespace-pre-wrap">
                      {taskInfo.caption}
                    </p>
                  </div>
                )}

                {/* Instruction */}
                <div>
                  <h3 className="text-lg font-medium mb-1">Instruction</h3>
                  <p className="text-gray-700">{taskInfo.instruction}</p>
                </div>
              </section>

              <MediaCom
                type={taskInfo.media.type}
                content={taskInfo.media.type.content}
              />
            </Main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
