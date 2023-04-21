import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/one-earth-one-chance-ie",
  plugins: [react()],
});
