import type { Connect } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

/** Evita que Vite sirva `api/*.ts` como JS al hacer fetch a `/api/...` (eso generaba “PDF” corrupto). */
function viteDevBlockBareApiRoutes(): {
  name: string;
  enforce: "pre";
  configureServer(server: { middlewares: Connect.Server }): void;
} {
  return {
    name: "vite-dev-block-bare-api-routes",
    enforce: "pre",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.url ?? "";
        const path = raw.split("?")[0] ?? "";
        if (path.startsWith("/api/")) {
          res.statusCode = 503;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(
            "PDF: estás en el servidor solo de Vite (puerto 5173), aquí no hay /api. " +
              "Cierra este proceso y ejecuta `npm run dev:vercel` (o `npx vercel dev`). " +
              "Abre en el navegador la URL que muestre la terminal (suele ser http://localhost:3000), no el :5173. " +
              "En Windows hace falta Google Chrome instalado para generar el PDF. " +
              "En el sitio ya desplegado en Vercel la descarga funciona sola.",
          );
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    viteDevBlockBareApiRoutes(),
    react(),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { lossless: true },
    }),
  ],
  server: {
    port: 5173,
  },
});
