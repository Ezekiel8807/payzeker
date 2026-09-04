import { getToken } from "@/features/auth/actions/action";
import User from "@/shared/models/userModel";
import { redirect } from "next/navigation";
import { fetchModelById } from "@/shared/utils/modelFunc";

//layout
import AppShell from "@/shared/components/layout/AppShell";
import Header from "@/shared/components/layout/Header";

// Components
import SubHeading from "@/shared/components/ui/SubHeading";
import ClientProfile from "@/features/profile/components/Profile";
import ForgetPass from "@/features/auth/components/ForgetPass";
import CurrentSubscription from "@/features/plans/components/CurrentSubscription";
import SideNav from "@/shared/components/layout/SideNav";

export default async function Profile() {
  const token = await getToken();
  if (!token) return redirect("/login");

  const user = await fetchModelById(User, token.id); // Fetch user data before rendering

  const isLogin = !!user;
  const { username, isAdmin, firstname, lastname, rank, email, planName, subStartDate, subEndDate, subDuration } = user;
  const { bankName = "bankName", bankAcctNo = 12346790 } =
    user.account.withdrawal;

  return (
    <>
      <Header />
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
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

              <div className="mt-8">
                <CurrentSubscription
                  subInfo={{ planName, subStartDate, subEndDate, subDuration }}
                />
              </div>


              <ForgetPass />
      </AppShell>
    </>
  );
}
