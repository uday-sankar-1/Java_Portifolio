import { Footer } from "@/components/layout/footer";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Highlights />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer name="Uday Sankar Obbu" />
    </>
  );
}
