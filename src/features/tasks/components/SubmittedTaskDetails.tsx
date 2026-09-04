"use client";
import { useState } from "react";
import { rejectTask, verifyTask } from "@/features/tasks/actions/taskActions";
import Image from "next/image";
import SubHeading from "@/shared/components/ui/SubHeading";
import CardActionBtn from "@/shared/components/ui/CardActionBtn";
import ErrorModal from "@/shared/components/modals/ErrorModal";
import WarningModal from "@/shared/components/modals/WarningModal";
import SuccessModal from "@/shared/components/modals/SuccessModal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SubmittedTaskDetails({ subTask }: { subTask: any }) {
  const [isCon, setIscon] = useState(false);
  const [isRej, setIsrej] = useState(false);
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
  const [rejWarningMsg, setRejwarningmsg] = useState("");
  const [conWarningMsg, setConwarningmsg] = useState("");
  const [IsRejWarning, setIsrejwarning] = useState(false);
  const [IsConWarning, setIsconwarning] = useState(false);

  async function cancelSubTaskAction() {
    setIsrej(true);
    const response = await rejectTask(subTask.userId, subTask._id);
    if (response.error) { setErrmsg(response.msg as string); setIserr(true); return; }
    setSucmsg(response.msg as string); setIssuc(true); setIsrej(false);
  }

  async function confirmSubTaskAction() {
    setIscon(true);
    const response = await verifyTask(subTask.userId, subTask._id);
    if (response.error) { setErrmsg(response.msg as string); setIserr(true); return; }
    setSucmsg(response.msg as string); setIssuc(true); setIscon(false);
  }

  function cancelSubTask() { setIsrej(true); setRejwarningmsg("Rejection of task performed action cannot be revised!"); setIsrejwarning(true); setIsrej(false); }
  function confirmSubTask() { setIscon(true); setConwarningmsg("Confirm Task has been performed before taking this action!"); setIsconwarning(true); setIscon(false); }

  return (
    <>
      <div className="relative px-5 sm:px-10 md:px-20 py-5 sm:py-10">
        <SubHeading title="Submitted Details" desc="Submitted task full details" />
        {subTask.type == "image" && <Image src={subTask.content} width={500} height={500} alt="request prof" className="w-full h-full md:w-[500px] md:h-[500px]" />}
        {subTask.type == "video" && <video src={subTask.content} width={500} height={500} controls loop autoPlay muted className="w-full h-full md:w-[500px] md:h-[500px]" />}
        <h1 className="font-bold uppercase mt-5 text-[14px] md:text-[20px]">{subTask.taskName}</h1>
        <p>{subTask.instruction}</p>
        <div className="my-5"><CardActionBtn isCon={isCon} isRej={isRej} rejectFunc={cancelSubTask} confirmFunc={confirmSubTask} /></div>
      </div>
      {IsRejWarning && <WarningModal setIswarning={setIsrejwarning} warningMsg={rejWarningMsg} action={cancelSubTaskAction} />}
      {IsConWarning && <WarningModal setIswarning={setIsconwarning} warningMsg={conWarningMsg} action={confirmSubTaskAction} />}
      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} direction="/dashboard" />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
