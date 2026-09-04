import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SubmittedTaskCard({ subTask }: { subTask: any }) {
  const { _id, taskName, price, type } = subTask;
  return (
    <div className="bg-white p-3 rounded-card shadow-card">
      <h4 className="font-black text-sm text-center sm:text-start">{taskName}</h4>
      <p className="font-black text-xl text-center sm:text-start"># {price}</p>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="font-extralight">{type}</div>
        <Link className="btn btn-primary w-[100px] text-center" href={`tasks/submittedTask/${_id}/`}>
          Learn More
        </Link>
      </div>
    </div>
  );
}
