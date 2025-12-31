import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { connectDB } from "@/lib/mongodb";

// Components
import SideNav from "@/components/SideNav";
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import Allusers from "@/components/Allusers";
import Header from "@/components/layout/Header";

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

      <div className="mx-auto">
        <div className="flex">
          <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
            <SideNav sideNavInfo={{ username, isAdmin, isLogin }} />
          </div>
          <div className="w-[100%] p-5 lg:w-[70%]">
            <Main>
              <SubHeading
                title="All Users"
                desc="Users information all together."
              />
              <Allusers
                allUsers={users}
                currentPage={page}
                totalPages={totalPages}
              />
            </Main>
          </div>
        </div>
      </div>
    </>
  );
}
