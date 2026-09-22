import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}"],
        globIgnores: [
          "**/pwa-192x192.png",
          "**/pwa-512x512.png",
          "**/WhatsApp Image 2026-09-01 at 19.00.15.jpeg",
        ],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//],
      },

      manifest: {
        name: "GEO ZONE",
        short_name: "GEO ZONE",
        description:
          "Plateforme d'apprentissage dédiée à la géologie, aux mines et aux sciences de la Terre.",
        theme_color: "#12372a",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/geo-zone-icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
