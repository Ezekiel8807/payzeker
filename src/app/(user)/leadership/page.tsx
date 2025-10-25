import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import getLeadership from "@/actions/getLeadership";

//components
import Footer from "@/components/layout/Footer";
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
      <Footer />
    </>
  );
}
