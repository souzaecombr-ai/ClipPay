import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuração para rodar bem no Vercel e localmente
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    port: 5173,
    open: true,
  },
});
