// layouts
import Hero from "@/components/layout/Hero";
import Main from "@/components/layout/Main";
import HowToStart from "@/components/layout/HowToStart";
import Contact from "@/components/layout/Contact";

export default function Home() {
  return (
    <Main>
      <Hero />
      <HowToStart />
      <Contact />
    </Main>
  );
}
