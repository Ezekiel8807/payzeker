import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";
import getLeadership from "@/features/leadership/actions/getLeadership";

//components
import Header from "@/shared/components/layout/Header";
import Leadership from "@/features/leadership/components/Leadership";

export default async function Page() {
  const token = await getToken();
  if (!token) redirect("/login");

  const leaderShip = await getLeadership();

  return (
    <>
      <Header />
      <Leadership leaders={leaderShip} />

      <div id="container-ba42027f6ac5fb9c6f4b3bbcc8a5f13e"></div>
    </>
  );
}
