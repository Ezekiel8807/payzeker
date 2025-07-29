//components
import Link from "next/link";

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
  const { _id, taskName, price, type } = subTask;
  return (
    <div className="bg-[var(--gray-05)] p-3 rounded-lg shadow-3xl">
      <h4 className="font-black text-sm text-center sm:text-start">
        {taskName}
      </h4>
      <p className="font-black text-xl text-center sm:text-start "># {price}</p>

      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="font-extralight">{type}</div>
        <Link
          className="w-[100px] block bg-[var(--green)] p-1 font-extrabold text-center text-[12px] text-white rounded-full shadow-sm"
          href={`task/submittedTask/${_id}/`}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
