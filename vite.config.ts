import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy"; // Import the plugin

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      // Add the plugin configuration
      targets: [
        {
          // Copy the entire 'ships' directory
          src: "assets/ships", // Source path relative to project root
          dest: "assets", // Destination path relative to 'outDir' (dist)
          // So, this goes to 'dist/assets/ships'
        },
        {
          // Copy all .mp3 files from the root of 'assets'
          src: "assets/*.mp3", // Source path (glob pattern) relative to project root
          dest: "assets", // Destination path relative to 'outDir' (dist)
          // So, these go to 'dist/assets/'
        },
        // Add more targets here if needed for other files/directories
      ],
    }),
  ],
  base: "/cobra/",
  root: ".",
  // publicDir: 'assets', // <-- REMOVE or change this. Set to false if nothing should be copied directly to dist root.
  publicDir: false, // Or point to a different dir like 'public' if you have root assets (favicon.ico etc.)
  build: {
    outDir: "dist",
    assetsDir: "assets", // This is still useful for Vite-processed assets (JS/CSS chunks, etc.)
  },
});
