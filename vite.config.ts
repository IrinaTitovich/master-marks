import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import sitemapPlugin from "./vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
  // Для GitHub Pages используем имя репозитория как base path
  // В GitHub Actions будет установлена переменная VITE_BASE_URL
  base: process.env.VITE_BASE_URL || '/',
  server: {
    host: "::",
    port: 2000,
  },
  plugins: [react(), sitemapPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Убеждаемся, что пути обрабатываются правильно
    assetsDir: 'assets',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          // Разделяем vendor библиотеки на отдельные чанки
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-accordion',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip',
          ],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
    // Оптимизация для уменьшения размера бандла
    minify: 'esbuild',
    target: 'es2015',
    cssCodeSplit: true,
    sourcemap: false,
  },
  // Оптимизация зависимостей
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@tanstack/react-query'], // Исключаем если не используется активно
  },
});
