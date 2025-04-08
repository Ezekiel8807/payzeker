// import { Key } from "react";

//components
import Link from "next/link";
import Image from "next/image";
// import Button from "../Button";

// type SubmittedTaskCardProbs = {
//   subTask: {
//     _id: Key | string | null | undefined;
//     taskId: string;
//     taskName: string;
//     price: number;
//     state: string;
//     type: string;
//     content: string;
//     instruction: string;
//   };
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SubmittedTaskCard({ subTask }: { subTask: any }) {
  const { _id, type, content } = subTask;
  return (
    <Link href={`dashboard/submittedTask/${_id}/`}>
      <div className="bg-[var(--gray-10)] p-3 rounded-lg shadow-md">
        {type == "image" && (
          <Image
            src={content}
            width={500}
            height={500}
            alt="request prof"
            className="w-full h-[200px]"
          />
        )}

        {type == "video" && (
          <video
            src={content}
            width={500}
            height={500}
            controls
            loop
            autoPlay
            muted
            className="w-full h-[200px]"
          ></video>
        )}
      </div>
    </Link>
  );
}
