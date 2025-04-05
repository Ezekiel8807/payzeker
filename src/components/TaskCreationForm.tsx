"use client";
import { useState } from "react";
import { fileUpload } from "@/actions/fileUpload";
import { createTask } from "@/actions/taskActions";

//components
import Button from "./Button";
import SuccessModal from "./modal/SuccessModal";
import ErrorModal from "./modal/ErrorModal";

export default function TaskCreationForm() {
  const prices: number[] = [100, 200, 300, 400, 500];

  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
  const [isPen, setIspen] = useState(false);
  const [taskName, setTaskname] = useState("");
  const [level, setLevel] = useState(1);
  const price: number = prices[level - 1];
  const [social, setSocial] = useState("");
  const [link, setLink] = useState("");
  const [startDate, setStartdate] = useState("");
  const [endDate, setEnddate] = useState("");
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileurl] = useState("");
  const [fileType, setFiletype] = useState("");
  const [instruction, setInstruction] = useState("");

  async function handleCreateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIspen(true);

    if (
      !taskName ||
      !level ||
      !price ||
      !social ||
      !startDate ||
      !endDate ||
      !instruction
    ) {
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
      startDate,
      endDate,
      instruction,
    });

    if (res.error != false) {
      setErrmsg(res.msg as string);
      setIserr(true);
      setIspen(false);
      return;
    }

    setSucmsg(res.msg as string);
    setIssuc(true);
    setIspen(false);
  }

  return (
    <>
      <form onSubmit={handleCreateTask} className="p-5 bg-[var(--gray-10)]">
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
            onChange={(e) => setLevel(+e.target.value)}
            className="w-full p-2 outline-none"
            name="level"
            value={level}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
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

        <input
          className="w-full h-full block p-2 mt-5 outline-none"
          type="url"
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://"
        />

        <div className="flex flex-col sm:flex-row mt-5 items-center justify-between gap-5">
          <input
            className="w-full p-2 outline-none"
            type="date"
            name="startDate"
            value={startDate}
            required
            onChange={(e) => setStartdate(e.target.value)}
          />

          <input
            className="w-full p-2 outline-none"
            type="date"
            name="endDate"
            value={endDate}
            required
            onChange={(e) => setEnddate(e.target.value)}
          />
        </div>

        <input
          className="p-2 mt-3 outline-none"
          type="file"
          name="file"
          placeholder="Choose a media file"
          onChange={(e) => {
            if (!e.target.files) return;
            setFile(e.target.files[0]);
          }}
        />

        <textarea
          rows={5}
          cols={50}
          required
          name="instruction"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Provide task instruction here"
          className="w-full h-full block p-2 mt-3 outline-none"
        ></textarea>

        <div className="mt-5 text-end">
          <Button btnStyle="w-full sm:w-[200px] p-2 font-black text-white bg-[var(--green)]">
            {isPen ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </form>

      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
