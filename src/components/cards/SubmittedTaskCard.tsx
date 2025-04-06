// import { Key } from "react";

//components
import Link from "next/link";
import Image from "next/image";
import Button from "../Button";

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
  const { userId, taskName, type, price, content, instruction } = subTask;
  return (
    <div className="bg-[var(--gray-10)] p-3 rounded-lg shadow-md">
      {type == "image" && (
        <Link href={content} target="_bank">
          <Image
            src={content}
            width={500}
            height={500}
            alt="request prof"
            className="w-full h-[200px]"
          />
        </Link>
      )}

      <h2 className="font-black mt-3">{taskName.toLocaleUpperCase()}</h2>

      <div>
        <p>{instruction}</p>

        <div className="flex mt-3 items-center justify-end text-[14px] font-black gap-3">
          <Button>Reject</Button>
          <Button btnStyle=" p-1 text-white bg-[var(--green)] rounded">
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}
