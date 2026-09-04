import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import User from "@/shared/models/userModel";
import { connectDB } from "@/shared/lib/mongodb";
import { fetchModelsData } from "@/shared/utils/modelFunc";
import SubmittedTask from "@/features/tasks/models/submittedTaskModel";

// Layouts
import Header from "@/shared/components/layout/Header";
import AppShell from "@/shared/components/layout/AppShell";

// Components
import DashboardTourWrapper from "@/features/dashboard/components/DashboardTourWrapper";
// import AmpAd1 from "@/components/ads/AmpAd1";
import SideNav from "@/shared/components/layout/SideNav";
import SubHeading from "@/shared/components/ui/SubHeading";
import SubmittedTaskCard from "@/features/tasks/cards/SubmittedTaskCard";
import DashCom from "@/features/dashboard/components/DashCom";

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
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
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
      </AppShell>
      <DashboardTourWrapper userId={user._id} completedTours={user.completedTours || []} />
    </>
  );
}
