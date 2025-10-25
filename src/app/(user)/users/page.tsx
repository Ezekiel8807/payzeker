import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { fetchModelsData } from "@/utils/modelFunc";

// Components
import SideNav from "@/components/SideNav";
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import Allusers from "@/components/Allusers";
import Header from "@/components/layout/Header";

// Fetch user data on the server
const fetchData = await fetchModelsData(User);

export default async function page() {
  const token = await getToken();
  if (!token) redirect("/login");
  if (!token.isAdmin) redirect("/dashboard");

  const isLogin = !!token;
  const { username, isAdmin } = token;

  const [users] = fetchData;

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
              <SubHeading
                title="All Users"
                desc="Users information all together."
              />
              <Allusers allUsers={users} />
            </Main>
          </div>
        </div>
      </div>
    </>
  );
}
