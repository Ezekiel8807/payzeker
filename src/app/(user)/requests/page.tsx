import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import Request from "@/features/requests/models/requestModel";
import { fetchModelsData } from "@/shared/utils/modelFunc";

//layout
import AppShell from "@/shared/components/layout/AppShell";
import Header from "@/shared/components/layout/Header";

// Components
import SideNav from "@/shared/components/layout/SideNav";
import SubHeading from "@/shared/components/ui/SubHeading";
import RequestCard from "@/features/requests/cards/RequestCard";

export default async function page() {
  const user = await getToken();
  if (!user) return redirect("/login");

  const [requests] = await fetchModelsData(Request);
  const isLogin = !!user;

  const newRequest = requests.filter(
    (r: { status: string }) => r.status === "new"
  );

  const { username, isAdmin } = user;
  if (!isAdmin) return redirect("/dashboard");

  return (
    <>
      <Header />
      <AppShell sideNav={<SideNav sideNavInfo={{ username, isAdmin, isLogin }} />}>
              <SubHeading
                title="Requests"
                desc="Deposit and withdrawal confirmation."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-5 gap-5">
                {newRequest.length > 0 ? (
                  newRequest.map(
                    (request: {
                      _id: string;
                      userId: string;
                      fullname: string;
                      bankName: string | null | undefined;
                      bankAcctNo: number | null | undefined;
                      amount: number;
                    }) => (
                      <RequestCard
                        key={request._id}
                        requestCardInfo={request}
                      />
                    )
                  )
                ) : (
                  <div className="col-span-3 h-[200px] flex items-center justify-center">
                    <p className="w-[200px] text-center text-gray-600">
                      No request right now🙈. Check back later.
                    </p>
                  </div>
                )}
              </div>
      </AppShell>
    </>
  );
}
