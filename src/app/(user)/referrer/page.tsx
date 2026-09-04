import ReferralClient from "./ReferralClient";
import User from "@/shared/models/userModel";
import { getToken } from "@/features/auth/actions/action";
import { redirect } from "next/navigation";
import { connectDB } from "@/shared/lib/mongodb";
import { fetchModelById } from "@/shared/utils/modelFunc";

// Layout
import AppShell from "@/shared/components/layout/AppShell";
import Header from "@/shared/components/layout/Header";
import SideNav from "@/shared/components/layout/SideNav";

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
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
              <ReferralClient
                referralCode={referralCode}
                referralsCount={referralsCount}
                referralEarnings={referralEarnings}
              />
            </AppShell>
    </>
  );
}
