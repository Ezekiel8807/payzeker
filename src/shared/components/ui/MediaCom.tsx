"use client";
import Link from "next/link";
import Image from "next/image";

type mediaType = {
  type: "link" | "image" | "video";
  content: string;
};

export default function MediaCom({ type, content }: mediaType) {
  return (
    <div className="my-5">
      <h3 className="mb-2 text-lg font-bold text-ink">Task Media</h3>
      <div className="rounded-card border border-slate-100 bg-white p-4 shadow-card">
        {type === "link" && (
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
            <label className="text-sm font-bold text-ink-muted">Link</label>
            <input
              className="input flex-1"
              type="text"
              readOnly
              value={content}
            />
            <Link
              target="_blank"
              className="btn-primary shrink-0 px-5 py-2"
              href={content}
            >
              Visit
            </Link>
          </div>
        )}
        {type === "image" && (
          <div className="flex flex-col items-start gap-3">
            <Image
              width={500}
              height={500}
              src={content || "/img/a.png"}
              alt="Task Image"
              className="w-full max-w-md rounded-xl border border-slate-200"
            />
            <a href={content} download className="btn-primary px-4 py-2">
              Download Image
            </a>
          </div>
        )}
        {type === "video" && (
          <div className="flex flex-col items-start gap-3">
            <video controls className="w-full max-w-md rounded-xl border border-slate-200">
              <source src={content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <a href={content} download className="btn-primary px-4 py-2">
              Download Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
