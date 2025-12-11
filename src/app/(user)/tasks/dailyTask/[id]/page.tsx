import React from "react";
import mongoose from "mongoose";
import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SideNav from "@/components/SideNav";
import MediaCom from "@/components/MediaCom";
import SubHeading from "@/components/SubHeading";
import TaskSubmissionForm from "@/components/form/TaskSubmissionForm";
import Main from "@/components/layout/Main";

type DailyTaskPageProps = {
  params: Promise<{ id: string }>;
};

async function getTaskInfo(id: string, username: string) {
  await connectDB();

  const user = await User.findOne({ username }).populate("tasks");

  const taskObjectId = mongoose.Types.ObjectId.isValid(id)
    ? new mongoose.Types.ObjectId(id)
    : null;

  const taskInfo = user?.tasks.find(
    (task: { _id: string }) => task._id?.toString() === taskObjectId?.toString()
  );

  return taskInfo ? JSON.parse(JSON.stringify(taskInfo)) : null;
}

export default async function Page({ params }: DailyTaskPageProps) {
  const { id } = await params;
  const user = await getToken();
  if (!user) return redirect("/login");

  const taskInfo = await getTaskInfo(id, user.username);
  if (!taskInfo) redirect("/tasks");

  const isLogin = true;

  return (
    <>
      <Header />
      <div className="mx-auto">
        <div className="flex">
          <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
            <SideNav
              sideNavInfo={{
                username: user.username,
                isAdmin: user.isAdmin,
                isLogin,
              }}
            />
          </div>
          <div className="w-[100%] p-5 lg:w-[70%]">
            <Main>
              <SubHeading
                title="Task Details"
                desc="More information on how to perform task"
              />

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

              <section className="bg-white rounded-xl">
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

              <MediaCom
                type={taskInfo.media.type}
                content={taskInfo.media.content}
              />

              <div className="w-[100%] md:w-[60%] mb-10">
                <SubHeading
                  title="Task Submission"
                  desc="Submitting proof for Payment"
                />

                {/* <section className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Task Submission</h2>
                <p className="text-gray-600 mb-2">
                    Upload an image or video record for task verification
                </p>
                <div className="flex items-center space-x-4">
                    <input type="file" className="border px-4 py-2 rounded-md w-full" />
                    <button className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600">
                    Submit
                    </button>
                </div>
            </section>; */}

                <TaskSubmissionForm taskId={taskInfo._id.toString()} />
              </div>
            </Main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
