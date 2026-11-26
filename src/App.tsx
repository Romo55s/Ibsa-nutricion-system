import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { EditorialLinkMotion } from "./components/EditorialLinkMotion";

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
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
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

const PageTransition = () => {
  const { pathname } = useLocation();
  const previousPath = useRef<string | null>(null);
  const shouldAnimate =
    previousPath.current !== null && previousPath.current !== pathname;

  useLayoutEffect(() => {
    previousPath.current = pathname;
  }, [pathname]);

  return (
    <div
      className={
        shouldAnimate
          ? "page-transition page-transition-enter"
          : "page-transition"
      }
    >
      <Outlet />
    </div>
  );
};

const AppContent = () => {
  useEffect(() => {
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
            const offsetPosition =
              targetElement.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
              top: offsetPosition,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <EditorialLinkMotion />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<PageTransition />}>
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
          </Route>
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
