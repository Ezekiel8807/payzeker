"use client";
import { useState, useEffect } from "react";
import useFormState from "@/shared/hooks/useFormState";
import { fileUpload } from "@/features/tasks/actions/fileUpload";
import { createTask } from "@/features/tasks/actions/taskActions";
import calculateBillingPrice from "@/features/tasks/utils/taskBilling";
import Button from "@/shared/components/ui/Button";
import SuccessModal from "@/shared/components/modals/SuccessModal";
import ErrorModal from "@/shared/components/modals/ErrorModal";

const prices: number[] = [100, 200, 300, 400, 500];

export default function TaskCreationForm() {
  const { isPen, setIspen, isSuc, setIssuc, isErr, setIserr, errMsg, setErrmsg, sucMsg, setSucmsg } = useFormState();
  const [taskName, setTaskname] = useState("");
  const [taskType, setTasktype] = useState("link");
  const [level, setLevel] = useState(1);
  const [duration, setDuration] = useState("7 days");
  const price: number = prices[level - 1];
  const [social, setSocial] = useState("facebook");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File>();
  const [caption, setCaption] = useState("");
  const [instruction, setInstruction] = useState("");
  const billingPrice = calculateBillingPrice(taskType, level, duration);

  async function handleCreateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isPen) return;
    setIspen(true);

    if (!taskName || !level || !price || !duration || !social || !instruction) {
      setErrmsg("Fill all required fields!"); setIserr(true); setIspen(false); return;
    }
    if (taskType === "link" && !link) { setErrmsg("Link field cannot be empty!"); setIserr(true); setIspen(false); return; }
    if (taskType === "image" && (!file || !file.type.startsWith("image/"))) { setErrmsg("Accept image file only!"); setIserr(true); setIspen(false); return; }
    if (taskType === "video" && (!file || !file.type.startsWith("video/"))) { setErrmsg("Accept video file only!"); setIserr(true); setIspen(false); return; }

    let fileUrl = "";
    if (file) {
      const fileUp = await fileUpload(file);
      if (fileUp.error) { setErrmsg(fileUp.msg as string); setIserr(true); setIspen(false); return; }
      fileUrl = fileUp.fileUrl;
    } else if (taskType === "link") {
      fileUrl = link;
    } else { setErrmsg("File or link is required!"); setIserr(true); setIspen(false); return; }

    const res = await createTask({ taskName, level, price, social, fileType: taskType, fileUrl, duration, caption, instruction, billingPrice });
    if (res.error) { setErrmsg(res.msg as string); setIserr(true); setIspen(false); return; }
    setSucmsg(res.msg as string); setIssuc(true); setIspen(false);
  }

  useEffect(() => {
    if (taskType === "image") setLevel(2);
    else if (taskType === "video") setLevel(3);
    else setLevel(1);
  }, [taskType]);

  return (
    <>
      <form onSubmit={handleCreateTask} className="card mb-5">
        <input className="input" type="text" name="taskName" required value={taskName} placeholder="Enter task name" onChange={(e) => setTaskname(e.target.value)} />
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-5 gap-3 sm:gap-5">
          {[
            { value: taskType, onChange: (v: string) => setTasktype(v), options: [["link","Link"],["image","Image"],["video","Video"]] },
          ].map((s, i) => (
            <select key={i} onChange={(e) => s.onChange(e.target.value)} className="input" value={s.value}>
              {s.options.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
            </select>
          ))}
          <select className="input" value={level} onChange={(e) => setLevel(parseInt(e.target.value))}>
            {[1,2,3,4,5].filter((lvl) => lvl >= (taskType === "image" ? 2 : taskType === "video" ? 3 : 1)).map((lvl) => (
              <option key={lvl} value={lvl}>Level: {lvl}</option>
            ))}
          </select>
          <select onChange={(e) => setSocial(e.target.value)} className="input" value={social}>
            {["facebook","instagram","whatsapp","youtube","linkedin","twitter","tiktok"].map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-3 sm:gap-5">
          <select name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="input">
            {["7 days","14 days","1 month","3 months"].map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {taskType == "link" && <input className="input" type="url" name="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://" />}
        </div>
        {taskType != "link" && <input className="input mt-3" type="file" name="file" placeholder="Choose a media file" onChange={(e) => { if (e.target.files) setFile(e.target.files[0]); }} />}
        {taskType != "link" && <textarea rows={2} cols={50} required name="caption" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Task Caption" className="input mt-5" />}
        <textarea rows={5} cols={50} required name="instruction" value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder="Provide Instruction: How to perform task here" className="input mt-5" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-black text-lg"><p>Total Task Cost: </p><span className="text-2xl text-[var(--green)]">{` ₦${billingPrice.toLocaleString()}`}</span></div>
          <div className="sm:text-end">
            <Button btnStyle="w-full sm:w-[200px] btn btn-primary">{isPen ? "Creating..." : "Create Task"}</Button>
          </div>
        </div>
      </form>
      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} direction="/tasks" />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
