import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import sitemapPlugin from "./vite-plugin-sitemap";
import deferCssPlugin from "./vite-plugin-defer-css";

// https://vitejs.dev/config/
export default defineConfig({
  // Для GitHub Pages используем имя репозитория как base path
  // В GitHub Actions будет установлена переменная VITE_BASE_URL
  base: process.env.VITE_BASE_URL || "/",
  server: {
    host: "::",
    port: 2000,
  },
  plugins: [react(), sitemapPlugin(), deferCssPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Убеждаемся, что пути обрабатываются правильно
    assetsDir: "assets",
    outDir: "dist",
    rollupOptions: {
      output: {
        // Выделяем vendor-чанк для кэширования и уменьшения начального парсинга
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react-dom") ||
              id.includes("react/") ||
              id.includes("react\\") ||
              id.includes("scheduler")
            ) {
              return "react-vendor";
            }
            if (id.includes("react-router")) {
              return "react-vendor";
            }
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },
      },
    },
    // Оптимизация для уменьшения размера бандла и работы основного потока
    minify: "esbuild",
    target: "es2015",
    cssCodeSplit: true, // Разделяем CSS для лучшего кэширования и параллельной загрузки
    cssMinify: "esbuild", // Минификация CSS для уменьшения времени парсинга
    sourcemap: false,
    // Увеличиваем лимит предупреждений для больших бандлов
    chunkSizeWarningLimit: 1000,
    // Оптимизация для уменьшения количества файлов
    assetsInlineLimit: 4096, // Инлайним маленькие ресурсы (< 4KB)
    // Оптимизация для уменьшения работы основного потока
    modulePreload: {
      polyfill: false, // Отключаем polyfill для современных браузеров
    },
    // Улучшенная оптимизация для уменьшения размера
    reportCompressedSize: false, // Ускоряет сборку
  },
  // Оптимизация зависимостей - упрощенная конфигурация
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
  // Оптимизация esbuild для уменьшения размера бандла и работы основного потока
  esbuild: {
    legalComments: "none", // Удаляем комментарии
    treeShaking: true,
    // Оставляем console в проде, чтобы на выложенном сайте можно было проверить инициализацию Метрики (F12 → Console)
    drop: process.env.NODE_ENV === "production" ? ["debugger"] : [],
    // Оптимизация для уменьшения времени парсинга
    target: "es2015",
    // Улучшенная минификация
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
});
