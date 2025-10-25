import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { redirect } from "next/navigation";
import { fetchModelById } from "@/utils/modelFunc";

//layout
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";

// Components
import SubHeading from "@/components/SubHeading";
import ClientProfile from "@/components/layout/Profile";
import ForgetPass from "@/components/ForgetPass";
import SideNav from "@/components/SideNav";

export default async function Profile() {
  const token = await getToken();
  if (!token) return redirect("/login");

  const user = await fetchModelById(User, token.id); // Fetch user data before rendering

  const isLogin = !!user;
  const { username, isAdmin, firstname, lastname, rank, email } = user;
  const { bankName = "bankName", bankAcctNo = 12346790 } =
    user.account.withdrawal;

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
              <SubHeading title="User Profile" desc="Everything about you." />
              <ClientProfile
                userInfo={{
                  username,
                  firstname,
                  lastname,
                  email,
                  rank,
                  bankName,
                  bankAcctNo,
                }}
              ></ClientProfile>

              <ForgetPass />
            </Main>
          </div>
        </div>
      </div>
    </>
  );
}
