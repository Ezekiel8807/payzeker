"use client";
import Link from "next/link";
// import Button from "./Button";
import Image from "next/image";

type mediaType = {
  type: "link" | "image" | "video";
  content: string;
};

export default function MediaCom({ type, content }: mediaType) {
  return (
    <div className="my-5">
      <h3 className="font-semibold text-lg mb-2">Task Media</h3>

      <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-start gap-4">
        {/*  */}

        {/*  */}
        {type === "link" && (
          <div className="w-full mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Link
            </label>

            <div className="w-full flex items-center my-3 justify-between gap-2">
              <input
                className="w-[80%] p-2 outline-none block"
                type="text"
                readOnly
                value={content}
              />
              <Link
                target="_blank"
                className="w-[20%] p-2 text-white text-center bg-[var(--green)]"
                href={content}
              >
                Visit
              </Link>
            </div>
          </div>
        )}

        {/*  */}
        {/* Example for image */}
        {type === "image" && (
          <>
            <Image
              width={500}
              height={500}
              src={content || "/img/a.png"}
              alt="Task Image"
              className="w-full max-w-md rounded-md border"
            />
            <a
              href={content}
              download
              className="bg-[var(--green)] text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Download Image
            </a>
          </>
        )}
        {/* Example for video */}
        {type === "video" && (
          <>
            <video controls className="w-full max-w-md rounded-md border">
              <source src={content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <a
              href={content}
              download
              className="bg-[var(--green)] text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Download Video
            </a>
          </>
        )}
      </div>
    </div>
  );
}
