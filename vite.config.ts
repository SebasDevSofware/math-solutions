import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// Temporarily disable Tailwind Vite plugin to isolate corrupted bundle issue
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Temporarily remove tailwind plugin while debugging
  plugins: [react(), tailwindcss()],
  define: {
    global: "globalThis",
  },
});
