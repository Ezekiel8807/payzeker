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

// import AmpAd1 from "@/components/ads/AmpAd1";
import SideNav from "@/components/SideNav";
import SubHeading from "@/components/SubHeading";
import SubmittedTaskCard from "@/components/cards/SubmittedTaskCard";
import DashCom from "@/components/DashCom";

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
  const {
    username,
    isAdmin,
    firstname,
    lastname,
    email,
    rank,
    completedTask,
    overallTask,
    account,
  } = user;
  const balance = account.balance as number;
  const {
    bankName,
    bankAcctNo,
    minWithdrawal,
    maxWithdrawal,
    allTimeWithdrawal,
  } = user.account.withdrawal;

  // filter submitted task with review state
  const filterSubTask = subTaskArr.filter(
    (filterTask: { state: string }) => filterTask.state === "submitted"
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
              {isAdmin && (
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
              {!isAdmin && (
                <DashCom
                  dashInfo={{
                    username,
                    firstname,
                    lastname,
                    isAdmin,
                    isLogin,
                    email,
                    rank,
                    completedTask,
                    overallTask,
                    balance,
                    bankName,
                    bankAcctNo,
                    minWithdrawal,
                    maxWithdrawal,
                    allTimeWithdrawal,
                  }}
                />
              )}

              <div className="w-full">
                {/* Google AdSense ad unit */}
                {/* <AmpAd1 client="ca-pub-3810051236937370" slot="2128594958" />
                <AmpAd1 client="ca-pub-3810051236937370" slot="2182313696" /> */}
              </div>
            </Main>
          </div>
        </div>
      </div>

      {/* <WinCard /> */}

      <Footer />
    </>
  );
}
