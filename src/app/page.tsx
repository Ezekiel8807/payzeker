// layouts
import Hero from "@/components/layout/Hero";
import Main from "@/components/layout/Main";
import HowToStart from "@/components/layout/HowToStart";
import Contact from "@/components/layout/Contact";
import About from "@/components/layout/About";

export default function Home() {
  return (
    <Main>
      <Hero />
      <HowToStart />
      <About />
      <Contact />
    </Main>
  );
}
