"use client";
import { useState } from "react";
import { fileUpload } from "@/actions/fileUpload";
import { createTask } from "@/actions/taskActions";
import calculateBillingPrice from "../../utils/taskBilling";

//components
import Button from "../Button";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";

const prices: number[] = [100, 200, 300, 400, 500];

export default function TaskCreationForm() {
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
  const [isPen, setIspen] = useState(false);
  const [taskName, setTaskname] = useState("");
  const [taskType, setTasktype] = useState("link");
  const [level, setLevel] = useState(1);
  const [duration, setDuration] = useState("7");
  const price: number = prices[level - 1];
  const [social, setSocial] = useState("facebook");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileurl] = useState("");
  const [fileType, setFiletype] = useState("");
  const [caption, setCaption] = useState("");
  const [instruction, setInstruction] = useState("");

  //billing price
  const billingPrice = calculateBillingPrice(taskType, level, duration);

  async function handleCreateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIspen(true);

    if (!taskName || !level || !price || !duration || !social || !instruction) {
      setErrmsg("Fill all required field!");
      setIserr(true);
      setIspen(false);
      return;
    }

    //set file url
    if (file) {
      if (file.type.startsWith("image/")) {
        setFiletype("image");
      }

      if (file.type.startsWith("video/")) {
        setFiletype("video");
      }

      const fileUp = await fileUpload(file);

      if (fileUp.error != false) {
        setErrmsg(fileUp.msg as string);
        setIserr(true);
        setIspen(false);
        return;
      }

      setFileurl(fileUp.fileUrl);
    }

    const res = await createTask({
      taskName,
      level,
      price,
      social,
      link,
      fileType,
      fileUrl,
      duration,
      caption,
      instruction,
      billingPrice,
    });

    if (res.error) {
      setErrmsg(res.msg as string);
      setIserr(true);
      setIspen(false);
      return;
    }

    setSucmsg(res.msg as string);
    setIssuc(true);
    setIspen(false);

    setTaskname("");
    setTasktype("link");
    setLevel(1);
    setDuration("7");
    setSocial("facebook");
    setLink("");
    setFile(undefined);
    setFileurl("");
    setFiletype("");
    setCaption("");
    setInstruction("");
  }

  return (
    <>
      <form
        onSubmit={handleCreateTask}
        className="p-5 mb-5 bg-[var(--gray-10)]"
      >
        <input
          className="w-full h-full block p-2 outline-none"
          type="text"
          name="taskName"
          id="taskName"
          required
          value={taskName}
          placeholder="Enter task name"
          onChange={(e) => setTaskname(e.target.value)}
        />

        <div className="flex mt-5 items-center justify-between gap-5">
          <select
            onChange={(e) => setTasktype(e.target.value)}
            className="w-full p-2 outline-none"
            name="taskType"
            value={taskType}
          >
            <option value="link">Link</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>

          <select
            className="w-full p-2 outline-none"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((lvl) => (
              <option key={lvl} value={lvl}>
                Level: {lvl}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSocial(e.target.value)}
            className="w-full p-2 outline-none"
            name="social"
            value={social}
          >
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="youtube">Youtube</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter</option>
            <option value="tiktok">Tiktok</option>
          </select>
        </div>

        <div className="flex mt-5 items-center justify-between gap-5">
          <select
            name="duration"
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 outline-none form-select"
          >
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">1 Month</option>
            <option value="90">3 Months</option>
          </select>

          {taskType == "link" && (
            <input
              className="w-full h-full block p-2 outline-none"
              type="url"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://"
            />
          )}
        </div>

        {taskType != "link" && (
          <input
            className="w-full p-2 mt-3 outline-none"
            type="file"
            name="file"
            placeholder="Choose a media file"
            onChange={(e) => {
              if (!e.target.files) return;
              setFile(e.target.files[0]);
            }}
          />
        )}

        {taskType != "link" && (
          <textarea
            rows={2}
            cols={50}
            required
            name="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Task Caption"
            className="w-full h-full block p-2 mt-5 outline-none"
          ></textarea>
        )}

        <textarea
          rows={5}
          cols={50}
          required
          name="instruction"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Provide Instruction: How to perform task here"
          className="w-full h-full block p-2 mt-5 outline-none"
        ></textarea>

        <div className="flex fleflex-row items-center justify-between">
          <div className="font-black text-lg">
            <p>
              Total Task Cost:
              <span className="text-2xl text-[var(--green)]">
                {` ₦${billingPrice.toLocaleString()}`}
              </span>
            </p>
          </div>

          <div className="mt-5 text-end">
            <Button btnStyle="w-full sm:w-[200px] p-2 font-black text-white bg-[var(--green)]">
              {isPen ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </div>
      </form>

      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
