import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|tiff|webp|avif)$/i,
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { lossless: true },
    }),
  ],
  server: {
    port: 5173,
  },
  build: {
    cssCodeSplit: false,
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules[\\/]gsap[\\/]/.test(id)) return "gsap-vendor";
        },
      },
    },
  },
});
