import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import { getAllWithdrawalRequests } from "@/features/withdrawals/actions/withdrawalRequestActions";

//layout
import AppShell from "@/shared/components/layout/AppShell";
import Header from "@/shared/components/layout/Header";

// Components
import SideNav from "@/shared/components/layout/SideNav";
import SubHeading from "@/shared/components/ui/SubHeading";
import WithdrawalCard from "@/features/withdrawals/cards/WithdrawalCard";
import WithdrawalTabs from "@/features/withdrawals/components/WithdrawalTabs";

type SearchParams = Promise<{
  status?: string;
}>;

export default async function WithdrawalsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getToken();
  if (!user) return redirect("/login");

  const { username, isAdmin } = user;
  if (!isAdmin) return redirect("/dashboard");

  // Await searchParams in Next.js 15
  const params = await searchParams;
  const status = params.status || "pending";
  const result = await getAllWithdrawalRequests(status);

  const isLogin = !!user;
  const withdrawals = result.error ? [] : result.data;

  return (
    <>
      <Header />
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
              <SubHeading
                title="Withdrawal Requests"
                desc="Manage user withdrawal requests."
              />

              <WithdrawalTabs currentStatus={status} />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-5 gap-5">
                {withdrawals.length > 0 ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  withdrawals.map((withdrawal: any) => (
                    <WithdrawalCard
                      key={withdrawal._id}
                      withdrawalInfo={withdrawal}
                    />
                  ))
                ) : (
                  <div className="col-span-3 h-[200px] flex items-center justify-center">
                    <p className="w-[200px] text-center text-gray-600">
                      No {status} withdrawal requests 🙈
                    </p>
                  </div>
                )}
              </div>
      </AppShell>
    </>
  );
}
