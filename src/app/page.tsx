// layouts
import Hero from "@/components/layout/Hero";
import Main from "@/components/layout/Main";
import HowToStart from "@/components/layout/HowToStart";
import Contact from "@/components/layout/Contact";
import About from "@/components/layout/About";
import Faq from "@/components/layout/Faq";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Main>
        <Hero />
        <HowToStart />
        <About />
        <Faq />
        <Contact />
      </Main>
      <Footer />
    </>
  );
}
