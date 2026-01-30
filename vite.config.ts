import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Для GitHub Pages используем имя репозитория как base path
  // В GitHub Actions будет установлена переменная VITE_BASE_URL
  base: process.env.VITE_BASE_URL || '/master-marks/',
  server: {
    host: "::",
    port: 2000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Убеждаемся, что пути обрабатываются правильно
    assetsDir: 'assets',
    outDir: 'dist',
  },
});
