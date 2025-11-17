import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import getLeadership from "@/actions/getLeadership";

//components
import Header from "@/components/layout/Header";
import Leadership from "@/components/Leadership";

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
