// app/page.tsx

export const dynamic = "force-dynamic";

import Hero from "@/components/layout/Hero";
import Main from "@/components/layout/Main";
import HowToStart from "@/components/layout/HowToStart";
import Contact from "@/components/layout/Contact";
import About from "@/components/layout/About";
import Faq from "@/components/layout/Faq";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import OurTeam from "@/components/layout/OurTeam";
import Countdown from "@/components/Countdown";

export default function Home() {
  return (
    <>
      <Header />
      <Main>
        <Hero />
        <Countdown />
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
