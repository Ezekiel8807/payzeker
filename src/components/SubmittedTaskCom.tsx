//components
import SubmittedTaskCard from "./cards/SubmittedTaskCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SubmittedTaskCom({ subTaskArr }: { subTaskArr: any }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 mb-5 items-center justify-start gap-5">
      {subTaskArr.length > 0 ? (
        subTaskArr
          .filter(
            (filterTask: { state: string }) => filterTask.state === "review"
          )
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((subTask: any) => (
            <SubmittedTaskCard key={subTask._id} subTask={subTask} />
          ))
      ) : (
        <div className="col-span-3 h-[200px] flex items-center justify-center">
          <p className="w-[200px] text-center text-gray-600">
            No submitted tasks🙈. Check back later.
          </p>
        </div>
      )}
    </div>
  );
}
