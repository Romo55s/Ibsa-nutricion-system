import { Home } from "./pages/Home";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar ScrollTrigger una sola vez
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing suave tipo "exponential out"
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Conectar Lenis con ScrollTrigger para que funcionen juntos
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy();
    };
  }, []);

  return <Home />;
};

export default App;


