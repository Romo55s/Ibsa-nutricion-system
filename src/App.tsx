import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.Home }))
);
const EventPage = lazy(() =>
  import("./pages/EventPage").then((m) => ({ default: m.EventPage }))
);
const BreakfastGuidePage = lazy(() =>
  import("./pages/BreakfastGuidePage").then((m) => ({
    default: m.BreakfastGuidePage,
  }))
);
const RoutinesPage = lazy(() =>
  import("./pages/RoutinesPage").then((m) => ({ default: m.RoutinesPage }))
);
const RoutineDetailPage = lazy(() =>
  import("./pages/RoutineDetailPage").then((m) => ({
    default: m.RoutineDetailPage,
  }))
);
const RoutineCreatePage = lazy(() =>
  import("./pages/RoutineEditorPage").then((m) => ({
    default: m.RoutineCreatePage,
  }))
);
const RoutineEditPage = lazy(() =>
  import("./pages/RoutineEditorPage").then((m) => ({
    default: m.RoutineEditPage,
  }))
);

// Registrar ScrollTrigger una sola vez
gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si hay un hash en la URL, hacer scroll a ese elemento
    if (hash) {
      // Esperar a que el DOM esté completamente listo
      const scrollToElement = () => {
        const element = document.querySelector(hash);
        if (element) {
          // Usar requestAnimationFrame para asegurar que el layout esté completo
          requestAnimationFrame(() => {
            // Calcular la posición considerando el navbar (80px de altura + padding)
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100; // Offset para el navbar + padding

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          });
        }
      };

      // Delay para asegurar que la página se haya cargado y renderizado
      const timeoutId = setTimeout(scrollToElement, 300);

      return () => clearTimeout(timeoutId);
    } else {
      // Si no hay hash, hacer scroll al top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

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
      allowNestedScroll: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onGsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onGsapTicker);
    gsap.ticker.lagSmoothing(0);

    let modalLockCount = 0;
    const onModalLock = () => {
      modalLockCount += 1;
      if (modalLockCount === 1) lenis.stop();
    };
    const onModalUnlock = () => {
      modalLockCount = Math.max(0, modalLockCount - 1);
      if (modalLockCount === 0) lenis.start();
    };
    window.addEventListener("ibsa:modal-lock", onModalLock);
    window.addEventListener("ibsa:modal-unlock", onModalUnlock);

    // Manejo de anclas modificado para funcionar con React Router
    // Solo interceptar si estamos en la misma página (no cuando navegamos desde otra página)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      // Solo interceptar si es un ancla local (#...) y no viene de una navegación de React Router
      if (href?.startsWith("#") && !anchor.hasAttribute("data-router-link")) {
        e.preventDefault();
        const targetId = href;
        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: -100,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onGsapTicker);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("ibsa:modal-lock", onModalLock);
      window.removeEventListener("ibsa:modal-unlock", onModalUnlock);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/evento" element={<EventPage />} />
          <Route
            path="/guia-desayunos-pre-entreno"
            element={<BreakfastGuidePage />}
          />
          <Route path="/rutinas" element={<RoutinesPage />} />
          <Route path="/rutinas/nueva" element={<RoutineCreatePage />} />
          <Route path="/rutinas/:id" element={<RoutineDetailPage />} />
          <Route path="/rutinas/:id/editar" element={<RoutineEditPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
