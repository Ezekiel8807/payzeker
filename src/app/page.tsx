import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";



// app/page.tsx
import Faq from "@/components/layout/Faq";
import Hero from "@/components/layout/Hero";
import Main from "@/components/layout/Main";
import About from "@/components/layout/About";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import OurTeam from "@/components/layout/OurTeam";
import Contact from "@/components/layout/Contact";
import PayzekerLive from "@/components/PayzekerLive";
import HowToStart from "@/components/layout/HowToStart";



export default async function Home() {
  const token = await getToken();
  if (token) redirect("/dashboard");
  
  return (
    <>
      <Header />
      <Main>
        <Hero />
        <PayzekerLive />
        <HowToStart />
        <About />
        <Faq />
        <OurTeam />
        <Contact />
        <Footer />
      </Main>
    </>
  );
}
