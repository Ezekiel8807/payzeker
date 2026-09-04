import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import User from "@/shared/models/userModel";
import { connectDB } from "@/shared/lib/mongodb";

// Components
import SideNav from "@/shared/components/layout/SideNav";
import AppShell from "@/shared/components/layout/AppShell";
import SubHeading from "@/shared/components/ui/SubHeading";
import Allusers from "@/features/users/components/Allusers";
import Header from "@/shared/components/layout/Header";

export default async function page(props: { searchParams?: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const token = await getToken();
  if (!token) redirect("/login");
  if (!token.isAdmin) redirect("/dashboard");

  const isLogin = !!token;
  const { username, isAdmin } = token;

  // DB Connection
  await connectDB();

  // Fetch Users with pagination
  const usersData = await User.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalUsers = await User.countDocuments({});
  const totalPages = Math.ceil(totalUsers / limit);

  const users = JSON.parse(JSON.stringify(usersData));

  return (
    <>
      <Header />

      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
              <SubHeading
                title="All Users"
                desc="Users information all together."
              />
              <Allusers
                allUsers={users}
                currentPage={page}
                totalPages={totalPages}
              />
      </AppShell>
    </>
  );
}
