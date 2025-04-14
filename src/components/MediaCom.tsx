"use client";
import Link from "next/link";
import Button from "./Button";
import Image from "next/image";
import { useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MediaCom({ link, media }: { link: any; media: any }) {
  const inputEL = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  function copyLink() {
    if (inputEL.current) {
      navigator.clipboard.writeText(inputEL.current.value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return (
    <div className="inline-block align-top w-[100%] md:w-[40%] p-5 mb-10 bg-[var(--gray-01)] ">
      <h2 className="text-md font-bold">Media</h2>
      <div className="grid grid-cols-1">
        <div className="">
          {media?.type === "image" && (
            <>
              <Image
                className="w-full "
                src={media!.content || "/img/a.png"}
                width="100"
                height="50"
                alt="task media image"
              />
              <a className="flex justify-end" href={media!.content} download>
                Download
              </a>
            </>
          )}

          {media?.type === "video" && (
            <>
              <video
                src={media?.content}
                width={100}
                height={50}
                muted
                loop
                autoPlay
              >
                play me
              </video>
              <a
                className="float-end py-1 px-3 bg-[var(--green)] disabled:bg-[var(--gray-10)] text-white"
                href={media.content}
                download
              >
                Download
              </a>
            </>
          )}

          {link && (
            <div className="w-full h-[100px] my-3 bg-[var(--gray-10)] flex items-center justify-center">
              Copy the link below
            </div>
          )}
        </div>
      </div>

      <h2 className="text-md font-bold mt-5">Link</h2>
      <div className="flex items-center my-3 justify-between">
        <input
          ref={inputEL}
          className="w-[70%] p-1 outline-none"
          type="text"
          readOnly
          value={link ? link : "No link avaliable!"}
        />
        <Link
          target="_blank"
          className={`w-[30%] p-1 text-white text-center ${
            link ? "bg-[var(--green)]" : "bg-[var(--gray-10)]"
          }`}
          href={link}
        >
          Visit
        </Link>
      </div>

      {link && (
        <Button
          btnAction={copyLink}
          btnStyle="w-full p-1 text-white outline-none bg-[var(--green)]"
        >
          {copied ? "Copied!" : "Copy Link"}
        </Button>
      )}
    </div>
  );
}
