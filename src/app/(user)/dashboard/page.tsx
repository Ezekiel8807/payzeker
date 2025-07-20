import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { connectDB } from "../../../lib/mongodb";
// import { fetchModelsData } from "@/utils/modelFunc";
// import SubmittedTask from "@/model/submittedTaskModel";

// Layouts
// import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Components
// import PayGamer from "@/components/PayGamer";
// import SideNav from "@/components/SideNav";
// import SubHeading from "@/components/SubHeading";
// import AcctBalCom from "@/components/AcctBalCom";
// import Performance from "@/components/Performance";
// import TaskCard from "@/components/cards/TaskCard";
// import SubmittedTaskCard from "@/components/cards/SubmittedTaskCard";
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
  // const [subTaskArr] = await fetchModelsData(SubmittedTask);
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

  // filter tasks that have new state
  // const filterUserTask = user.tasks.filter(
  //   (e: { state: string }) => e.state === "new"
  // );

  // filter submitted task with review state
  // const filterSubTask = subTaskArr.filter(
  //   (filterTask: { state: string }) => filterTask.state === "submitted"
  // );

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
