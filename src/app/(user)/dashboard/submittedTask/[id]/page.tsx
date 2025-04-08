import React from "react";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import SubmittedTask from "@/model/submittedTaskModel";

//cononents
import Image from "next/image";
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import Button from "@/components/Button";

//function to get submitted tas info
async function getSubmittedTaskInfo(id: string) {
  const token = await getToken();
  if (!token) return redirect("/login");

  // datase connection
  await connectDB();

  // fetch the submittedTask
  //   const subTask = await SubmittedTask.findOne({ _id: id });

  // Convert `taskId` to ObjectId if necessary
  //   const subtaskObjectId = mongoose.Types.ObjectId.isValid(id)
  //     ? new mongoose.Types.ObjectId(id)
  //     : null;

  // Find task in user's tasks
  const subTask = await SubmittedTask.findById(id);

  //   user.find(
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     (task: any) => task._id?.toString() === taskObjectId!.toString()
  //   );

  return await JSON.parse(JSON.stringify(subTask));
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subTask = await getSubmittedTaskInfo(id);

  return (
    <Main>
      <SubHeading
        title="Submitted Details"
        desc="Submitted task full details "
      ></SubHeading>

      <div>
        {subTask.type == "image" && (
          <Image
            src={subTask.content}
            width={500}
            height={500}
            alt="request prof"
            className="w-full h-full md:w-[600px] md:h-[400px]"
          />
        )}

        {subTask.type == "video" && (
          <video
            src={subTask.content}
            width={500}
            height={500}
            controls
            loop
            autoPlay
            muted
            className="w-full h-full md:w-[500px] md:h-[500px]"
          ></video>
        )}

        <h1 className="font-bold uppercase mt-5 text-[14px] md:text-[20px] ">
          {subTask.taskName}
        </h1>
        <p>{subTask.instruction}</p>

        <div className="flex mt-3 items-center justify-end text-[14px] font-black gap-3">
          <Button>Reject</Button>
          <Button btnStyle="w-[100px] p-1 text-white bg-[var(--green)] rounded">
            Verify
          </Button>
        </div>
      </div>
    </Main>
  );
}
