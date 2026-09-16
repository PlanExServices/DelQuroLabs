import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Hosts that are allowed to reach the dev/preview server.
 * The deployment pipeline proxies the app through a generated *.e2b.app
 * hostname; add your own private-server hostname here if you ever expose
 * `vite dev` directly instead of the built container.
 */
const LAN_AND_PROXY_HOSTS = [".e2b.app", ".e2b.dev", "localhost", "127.0.0.1"];

// https://vite.dev/config/
export default defineConfig({
  // Served from the domain root by nginx. Set VITE_BASE (e.g. "/labs/") when
  // the site is published under a sub-path instead.
  base: process.env.VITE_BASE ?? "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: LAN_AND_PROXY_HOSTS,
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: LAN_AND_PROXY_HOSTS,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2022",
    // Hashed filenames let nginx cache the bundle forever.
    assetsDir: "assets",
    chunkSizeWarningLimit: 900,
  },
});
