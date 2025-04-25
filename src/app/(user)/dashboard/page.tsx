import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { connectDB } from "../../../lib/mongodb";
import SubmittedTaskCom from "@/components/SubmittedTaskCom";

// Components
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import AcctBalCom from "@/components/AcctBalCom";
import Performance from "@/components/Performance";
import TaskCard from "@/components/cards/TaskCard";
import SubmittedTask from "@/model/submittedTaskModel";

// Fetch user data on the server
async function getUser() {
  const token = await getToken();
  if (!token?.id) return null;

  //db connection
  await connectDB();

  // Find user and populate tasks
  const user = await User.findOne({ _id: token.id }).populate("tasks");

  // Convert user data to a plain JavaScript object
  return JSON.parse(JSON.stringify(user));
}

//get submitted tasks
async function getSubmittedTasks() {
  const token = await getToken();
  if (!token?.id) return null;

  //db connection
  await connectDB();

  // Find user and populate tasks
  const allSubTask = await SubmittedTask.find().sort({ _id: -1 });

  // Convert submitedTasks data to a plain JavaScript object
  return await JSON.parse(JSON.stringify(allSubTask));
}

export default async function Dashboard() {
  const user = await getUser();
  if (!user) return redirect("/login");
  const subTaskArr = await getSubmittedTasks();

  const { firstname = "", lastname = "", rank = 1 } = user;
  const balance = user.account.balance as number;
  const {
    bankName = "bankName",
    bankAcctNo = 12346790,
    minWithdrawal = 5000,
    maxWithdrawal,
    allTimeWithdrawal,
  } = user.account.withdrawal;

  // filter tasks that have new state
  const filterUserTask = user.tasks.filter(
    (e: { state: string }) => e.state === "new"
  );

  return (
    <Main>
      {!user.isAdmin && (
        <>
          <div className="flex flex-col sm:flex-row items-center justify-end gap-5">
            <AcctBalCom
              acctInfo={{
                firstname,
                lastname,
                rank,
                balance,
                bankName,
                bankAcctNo,
                minWithdrawal,
                maxWithdrawal,
                allTimeWithdrawal,
              }}
            />
            <Performance
              Overall={user.overallTask}
              Completed={user.completedTask}
            />
          </div>

          <div className="mt-5">
            <SubHeading
              title="Tasks"
              desc="Earn real cash for completing task."
            />
          </div>

          <div className="bg-[var(--gray-01)] h-[250px] p-5 my-5 rounded">
            <div className="grid grid-flow-col justify-start gap-5 overflow-x-scroll no-scrollbar">
              {filterUserTask.length > 0 ? (
                filterUserTask.map(
                  (task: {
                    _id?: string;
                    level?: number;
                    price?: number;
                    socialTarget?: string;
                    media?: {
                      type?: "image" | "video" | "others";
                      content?: string;
                    };
                  }) => {
                    const { _id, level, media, price, socialTarget } = task;
                    return (
                      <TaskCard
                        key={_id}
                        userTask={{ _id, level, media, price, socialTarget }}
                      />
                    );
                  }
                )
              ) : (
                <p className="flex items-center justify-center h-full">
                  Opps.. tasks unavailable
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {user.isAdmin && (
        <>
          <SubHeading
            title="Submitted Tasks"
            desc="All tasks submitted at a go."
          />
          <SubmittedTaskCom subTaskArr={subTaskArr} />
        </>
      )}
    </Main>
  );
}
