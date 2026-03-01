import ReferralClient from "./ReferralClient";
import User from "@/model/userModel";
import { getToken } from "@/actions/action";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { fetchModelById } from "@/utils/modelFunc";

// Layout
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";
import SideNav from "@/components/SideNav";

export default async function ReferrerPage() {
  const token = await getToken();

  if (!token?.id) return redirect("/login");

  await connectDB();
  const dbUser = await fetchModelById(User, token.id);

  if (!dbUser) return redirect("/login");

  const isLogin = !!dbUser;
  const { username, isAdmin } = dbUser;

  const referralCode = dbUser.referralCode || "";
  const referralsCount = dbUser.referralsCount || 0;
  const referralEarnings = dbUser.referralEarnings || 0;

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
              <ReferralClient
                referralCode={referralCode}
                referralsCount={referralsCount}
                referralEarnings={referralEarnings}
              />
            </Main>
          </div>
        </div>
      </div>
    </>
  );
}
