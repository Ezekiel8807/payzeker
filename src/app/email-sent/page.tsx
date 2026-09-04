///
import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";

//
import EmailSent from "@/shared/components/feedback/EmailSent";
import Footer from "@/shared/components/layout/Footer";
import Header from "@/shared/components/layout/Header";

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
