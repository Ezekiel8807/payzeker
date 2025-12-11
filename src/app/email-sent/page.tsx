///
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";

//
import EmailSent from "@/components/EmailSent";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default async function page() {
  const token = await getToken();
  if (token) redirect("/dashboard");

  return (
    <>
      <Header />
      <EmailSent />
      <Footer />
    </>
  );
}
