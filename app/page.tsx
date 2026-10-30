

import AtmosphericBackground from "@/components/environment/AtmosphericBackground";
import ParticleField from "@/components/environment/ParticleField";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";
import Journey from "@/components/journey/Journey";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      {/* One fixed world behind everything */}
      <AtmosphericBackground>
        <ParticleField />
      </AtmosphericBackground>

      <div className="relative z-10">
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Hero />
          <Projects />
          <Skills />
          <Journey />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}