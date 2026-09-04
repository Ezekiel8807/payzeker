import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";

// app/page.tsx
import Faq from "@/shared/components/layout/Faq";
import Hero from "@/shared/components/layout/Hero";
import About from "@/shared/components/layout/About";
import Footer from "@/shared/components/layout/Footer";
import Header from "@/shared/components/layout/Header";
import OurTeam from "@/shared/components/layout/OurTeam";
import Contact from "@/shared/components/layout/Contact";
import PayzekerLive from "@/features/marketing/components/PayzekerLive";
import HowToStart from "@/shared/components/layout/HowToStart";

export default async function Home() {
  const token = await getToken();
  if (token) redirect("/dashboard");

  return (
    <>
      <Header />
      <Hero />
      <PayzekerLive />
      <HowToStart />
      <About />
      <Faq />
      <OurTeam />
      <Contact />
      <Footer />
    </>
  );
}
