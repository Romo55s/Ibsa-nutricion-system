import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Hero } from "../sections/Hero";
import { Benefits } from "../sections/Benefits";
import { About } from "../sections/About";
import { Credibility } from "../sections/Credibility";
import { Reviews } from "../sections/Reviews";
import { LeadMagnet } from "../sections/LeadMagnet";
import { CTASection } from "../sections/CTASection";

export const Home = () => {
  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <About />
        <Credibility />
        <Reviews />
        <LeadMagnet />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

