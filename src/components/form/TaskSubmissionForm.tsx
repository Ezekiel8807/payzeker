"use client";
import { fileUpload } from "@/actions/fileUpload";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";

// images
import subImage from "../../../public/img/b.jpg";
import Button from "../Button";

export default function TaskSubmissionForm() {
  // const { err, setErr } = useState(false);
  const [image, setImage] = useState<StaticImageData | string>(subImage);
  const [video, setVideo] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  async function handleGetFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fileUpload(file);
    //
    console.log(response);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="w-full h-[200px]">
        {!video && (
          <Image
            width={200}
            height={200}
            src={image}
            alt="Task submission image"
            className="w-full h-[200px]"
          />
        )}
        {video && (
          <video
            muted
            controls
            autoPlay
            src={video}
            width={200}
            height={200}
            className="w-full h-[200px]"
          ></video>
        )}
      </div>
      <div className="w-full h-[200px]">
        <form
          onSubmit={handleGetFile}
          className="w-full h-[200px] bg-[var(--green-trans)]"
        >
          <input
            required
            id="upload"
            type="file"
            name="image/video"
            className="hidden"
            accept="image/*,video/*"
            placeholder="Select an image or video"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                const selectedFile = e.target.files[0];
                setFile(selectedFile); // Store the file object

                const reader = new FileReader();
                reader.onload = (e) => {
                  if (selectedFile.type.startsWith("video/")) {
                    setVideo(e.target?.result as string);
                  } else {
                    setImage(e.target?.result as string);
                    setVideo(undefined);
                  }
                };
                reader.readAsDataURL(selectedFile);
              }
            }}
          />
          <p className="font-black p-5 text-center">
            Upoad an image or video record for your task verification
          </p>

          <div className="flex p-5 gap-1">
            <label
              title="Maximun file size of 200mb"
              className="text-center p-2 bg-[var(--white)] cursor-pointer shadow-md rounded"
              htmlFor="upload"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="font-black size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>

            <Button btnStyle="w-[200px] bg-[var(--green)] font-black shadow-md rounded text-[var(--white)]">
              Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
