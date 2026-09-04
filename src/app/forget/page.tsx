///
import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";

//
import Forget from "@/features/auth/components/Forget";
import Footer from "@/shared/components/layout/Footer";
import Header from "@/shared/components/layout/Header";

export default async function page() {
  const token = await getToken();
  if (token) redirect("/dashboard");

  return (
    <>
      <Header />
      <Forget />
      <Footer />
    </>
  );
}
