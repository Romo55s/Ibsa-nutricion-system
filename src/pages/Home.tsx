import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Hero } from "../sections/Hero";
import { Benefits } from "../sections/Benefits";
import { About } from "../sections/About";
import { Credibility } from "../sections/Credibility";
import { RoutineTool } from "../sections/RoutineTool";
import { Reviews } from "../sections/Reviews";
import { Locations } from "../sections/Locations";
import { FinalCTA } from "../sections/FinalCTA";

export const Home = () => (
  <div className="page">
    <a href="#main-content" className="skip-to-content">
      Saltar al contenido
    </a>
    <Navbar />
    <main id="main-content">
      <Hero />
      <Benefits />
      <About />
      <Credibility />
      <RoutineTool />
      <Reviews />
      <Locations />
      <FinalCTA />
    </main>
    <Footer />
  </div>
);
