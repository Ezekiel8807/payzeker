"use client";
import { fileUpload } from "@/actions/fileUpload";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { subTask } from "@/actions/taskActions";

// images
import subImage from "../../../public/img/b.jpg";
import Button from "../Button";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";

type TaskSubmissionForm = {
  taskId: string;
};

export default function TaskSubmissionForm({ taskId }: TaskSubmissionForm) {
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
  const [isPen, setIspen] = useState(false);
  const [video, setVideo] = useState("");
  const [image, setImage] = useState<StaticImageData | string>(subImage);
  const [file, setFile] = useState<File | null>(null);
  const [taskFileType, setTaskfileType] = useState("");

  function setAndDispalyFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile); // Store the file object

      const reader = new FileReader();
      reader.onload = (e) => {
        if (selectedFile.type.startsWith("video/")) {
          setTaskfileType("video");
          setVideo(e.target?.result as string);
          //
        } else if (selectedFile.type.startsWith("image/")) {
          setTaskfileType("image");
          setImage(e.target?.result as string);
          setVideo("");
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleGetFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIspen(true);

    if (!file) {
      setErrmsg("Submit proof for verification");
      setIserr(true);
      setIspen(false);
      return;
    }

    const response = await fileUpload(file);
    if (response.error) {
      setErrmsg(response.msg as string);
      setIserr(true);
      setIspen(false);
      return;
    }

    const taskFileLink = response.fileUrl;

    const submitting = await subTask({ taskId, taskFileType, taskFileLink });
    if (submitting.error) {
      setErrmsg(submitting.msg);
      setIserr(true);
      setIspen(false);
      return;
    }

    setSucmsg(submitting.msg as string);
    setIspen(false);
    setIssuc(true);
  }

  //
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="w-full">
          {!video && (
            <Image
              width={500}
              height={500}
              src={image}
              alt="Task submission image"
              className="w-full h-[250px]"
            />
          )}
          {video && (
            <video
              muted
              controls
              autoPlay
              src={video}
              width={500}
              height={500}
              className="w-full h-[250px]"
            ></video>
          )}
        </div>
        <div className="w-full">
          <form
            onSubmit={handleGetFile}
            className="w-full h-[250px] bg-[var(--green-trans)]"
          >
            <p className="font-black px-5 py-8 text-center">
              Upoad an image or video record for your task verification
            </p>

            <input
              required
              id="upload"
              type="file"
              name="file"
              className="w-full px-5"
              accept="image/*,video/*"
              placeholder="Select an image or video"
              onChange={setAndDispalyFile}
            />

            <div className="p-5 text-center">
              <Button btnStyle="w-full p-2 bg-[var(--green)] font-black shadow-md rounded text-[var(--white)]">
                {isPen ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {isSuc && (
        <SuccessModal
          setIssuc={setIssuc}
          sucMsg={sucMsg}
          direction="/dashboard"
        />
      )}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
