import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";

//components
import SideNav from "@/components/SideNav";
import Header from "@/components/layout/Header";
import PayGameCom from "@/components/PayGameCom";

export default async function page() {
  const user = await getToken();
  const isLogin = !!user;
  if (!user) redirect("/login");

  const { username, isAdmin } = user;

  return (
    <>
      <Header />

      <div className="mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
            <SideNav sideNavInfo={{ username, isAdmin, isLogin }} />
          </div>

          <div className="w-[100%] p-5 lg:w-[70%]">
            <PayGameCom />
          </div>
        </div>
      </div>
    </>
  );
}
