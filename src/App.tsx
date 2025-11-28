import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home } from "./pages/Home";
import { EventPage } from "./pages/EventPage";

// Registrar ScrollTrigger una sola vez
gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Manejo de anclas modificado para funcionar con React Router
    const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        if (!anchor) return;
        
        const href = anchor.getAttribute('href');
        // Solo interceptar si es un ancla local (#...)
        if (href?.startsWith('#')) {
            e.preventDefault();
            const targetId = href;
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement, {
                        offset: -80,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                }
            }
        }
    };

    document.addEventListener('click', handleClick);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evento" element={<EventPage />} />
        </Routes>
    </>
  );
}

const App = () => {
  return (
    <Router>
        <AppContent />
    </Router>
  );
};

export default App;
