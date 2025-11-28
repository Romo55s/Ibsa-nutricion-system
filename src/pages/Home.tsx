import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Hero } from "../sections/Hero";
import { Benefits } from "../sections/Benefits";
import { About } from "../sections/About";
import { Credibility } from "../sections/Credibility";
import { Reviews } from "../sections/Reviews";
import { Locations } from "../sections/Locations";
import { FlowingMenu } from "../sections/FlowingMenu";
import { FinalCTA } from "../sections/FinalCTA";

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
        <Locations />
        <FlowingMenu />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

