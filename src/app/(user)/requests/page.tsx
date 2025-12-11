import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import Request from "../../../model/requestModel";
import { fetchModelsData } from "@/utils/modelFunc";

//layout
import Main from "@/components/layout/Main";
import Header from "@/components/layout/Header";

// Components
import SideNav from "@/components/SideNav";
import SubHeading from "@/components/SubHeading";
import RequestCard from "@/components/cards/RequestCard";

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
      <div className="mx-auto">
        <div className="flex">
          <div className="hidden lg:block w-[100%] md:w-[30%] bg-[var(--gray-01)] border-e-8 border-[var(--white)]">
            <SideNav sideNavInfo={{ username, isAdmin, isLogin }} />
          </div>
          <div className="w-[100%] p-5 lg:w-[70%]">
            <Main>
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
            </Main>
          </div>
        </div>
      </div>
    </>
  );
}
