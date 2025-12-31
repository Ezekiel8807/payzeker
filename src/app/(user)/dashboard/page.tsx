import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { connectDB } from "../../../lib/mongodb";
import { fetchModelsData } from "@/utils/modelFunc";
import SubmittedTask from "@/model/submittedTaskModel";

// Layouts
import Header from "@/components/layout/Header";

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
  const token = await getToken();
  if (!token) redirect("/login");

  const user = await getUser();
  const [subTaskArr] = await fetchModelsData(SubmittedTask);

  const isLogin = !!user;
  const { username, isAdmin } = user;

  // filter submitted task with review state
  const filterSubTask = subTaskArr.filter(
    (filterTask: { state: string }) => filterTask.state === "submitted"
  );

  const isExpired =
    user?.subEndDate && new Date(user.subEndDate).getTime() < Date.now();
  const showPrompt = !user?.planName || isExpired;


  return (
    <>
      <Header />
      <div className="mx-auto">
        <div className="flex">
          <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
            <SideNav sideNavInfo={{ username, isAdmin, isLogin }} />
          </div>
          <div className="w-[100%] p-5 lg:w-[70%]">
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
              </>
            )}
            {!isAdmin && <DashCom showPrompt={showPrompt} />}
          </div>
        </div>
      </div>
    </>
  );
}
