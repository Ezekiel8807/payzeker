import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { getAllWithdrawalRequests } from "@/actions/withdrawalRequestActions";

//layout
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";

// Components
import SideNav from "@/components/SideNav";
import SubHeading from "@/components/SubHeading";
import WithdrawalCard from "@/components/cards/WithdrawalCard";
import WithdrawalTabs from "@/components/WithdrawalTabs";

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
      <div className="mx-auto">
        <div className="flex">
          <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
            <SideNav sideNavInfo={{ username, isAdmin, isLogin }} />
          </div>
          <div className="w-[100%] px-5 lg:w-[70%]">
            <Main>
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
            </Main>
          </div>
        </div>
      </div>
    </>
  );
}
