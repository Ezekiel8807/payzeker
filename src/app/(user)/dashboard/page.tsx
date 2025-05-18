import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { connectDB } from "../../../lib/mongodb";
import { fetchModelsData } from "@/utils/modelFunc";
import SubmittedTask from "@/model/submittedTaskModel";

// Layouts
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Components
import PayGamer from "@/components/PayGamer";
import SideNav from "@/components/SideNav";
import SubHeading from "@/components/SubHeading";
import AcctBalCom from "@/components/AcctBalCom";
import Performance from "@/components/Performance";
import TaskCard from "@/components/cards/TaskCard";
import SubmittedTaskCard from "@/components/cards/SubmittedTaskCard";

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

export default async function Dashboard() {
  const user = await getUser();
  const [subTaskArr] = await fetchModelsData(SubmittedTask);
  if (!user) return redirect("/login");

  const isLogin = !!user;
  const { username, isAdmin, firstname, lastname, rank, account } = user;
  const balance = account.balance as number;
  const {
    bankName,
    bankAcctNo,
    minWithdrawal,
    maxWithdrawal,
    allTimeWithdrawal,
  } = user.account.withdrawal;

  // filter tasks that have new state
  const filterUserTask = user.tasks.filter(
    (e: { state: string }) => e.state === "new"
  );

  // filter submitted task with review state
  const filterSubTask = subTaskArr.filter(
    (filterTask: { state: string }) => filterTask.state === "review"
  );

  return (
    <>
      <Header />
      <div className="mx-auto">
        <div className="flex">
          <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
            <SideNav sideNavInfo={{ username, isAdmin, isLogin }} />
          </div>
          <div className="w-[100%] px-5 lg:w-[70%]">
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

                  <div className="flex flex-col sm:flex-row justify-end gap-5">
                    <div className="w-full sm:w-[30%]">
                      <div className="mt-5">
                        <SubHeading
                          title="Mini Game"
                          desc="Your chance to earn more."
                        />
                      </div>
                      {/* gwin components */}
                      <PayGamer />
                    </div>
                    <div className="w-full sm:w-[70%]">
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
                                const {
                                  _id,
                                  level,
                                  media,
                                  price,
                                  socialTarget,
                                } = task;
                                return (
                                  <TaskCard
                                    key={_id}
                                    userTask={{
                                      _id,
                                      level,
                                      media,
                                      price,
                                      socialTarget,
                                    }}
                                  />
                                );
                              }
                            )
                          ) : (
                            <p className="flex h-[200px] items-center justify-center">
                              Opps🙈... tasks unavailable
                            </p>
                          )}
                        </div>
                      </div>
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

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 mb-5 items-center justify-start gap-5">
                    {filterSubTask.length > 0 ? (
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      filterSubTask.map((subTask: any) => (
                        <SubmittedTaskCard
                          key={subTask._id}
                          subTask={subTask}
                        />
                      ))
                    ) : (
                      <div className="col-span-3 h-[200px] flex items-center justify-center">
                        <p className="w-[200px] text-center text-gray-600">
                          No submitted tasks🙈. Check back later.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </Main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
