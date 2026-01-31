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
  plugins: [
    react(),
    sitemapPlugin()
  ],
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
        manualChunks: (id) => {
          // Разделяем vendor библиотеки на отдельные чанки для лучшего кэширования
          if (id.includes('node_modules')) {
            // React core - критически важные библиотеки (самый маленький чанк)
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-core';
            }
            // React Router - отдельно для лучшего кэширования
            if (id.includes('react-router')) {
              return 'react-router';
            }
            // Radix UI - разделяем по использованию для параллельной загрузки
            if (id.includes('@radix-ui')) {
              // Критичные компоненты загружаются первыми
              if (id.includes('react-slot')) {
                return 'radix-slot';
              }
              if (id.includes('react-dialog')) {
                return 'radix-dialog';
              }
              if (id.includes('react-accordion')) {
                return 'radix-accordion';
              }
              if (id.includes('react-label')) {
                return 'radix-label';
              }
              if (id.includes('react-tooltip')) {
                return 'radix-tooltip';
              }
              if (id.includes('react-toast')) {
                return 'radix-toast';
              }
              // Остальные Radix компоненты
              return 'radix-ui';
            }
            // Иконки - разделяем на более мелкие чанки для параллельной загрузки
            if (id.includes('lucide-react')) {
              // Разделяем lucide-react на более мелкие части если возможно
              return 'icons';
            }
            // UI утилиты - разделяем для параллельной загрузки
            if (id.includes('tailwind-merge')) {
              return 'tailwind-merge';
            }
            if (id.includes('clsx')) {
              return 'clsx';
            }
            if (id.includes('class-variance-authority')) {
              return 'cva';
            }
            if (id.includes('sonner')) {
              return 'sonner';
            }
            if (id.includes('next-themes')) {
              return 'next-themes';
            }
            // Остальные vendor библиотеки
            return 'vendor';
          }
        },
        // Оптимизация имен файлов для лучшего кэширования
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
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
    minify: 'esbuild',
    target: 'es2015',
    cssCodeSplit: true, // Разделяем CSS для лучшего кэширования и параллельной загрузки
    cssMinify: 'esbuild', // Минификация CSS для уменьшения времени парсинга
    sourcemap: false,
    // Увеличиваем лимит предупреждений для больших бандлов
    chunkSizeWarningLimit: 1000,
    // Оптимизация для уменьшения количества файлов
    assetsInlineLimit: 4096, // Инлайним маленькие ресурсы (< 4KB)
    // Оптимизация для уменьшения работы основного потока
    modulePreload: {
      polyfill: false, // Отключаем polyfill для современных браузеров
      resolveDependencies: (filename, deps) => {
        // Оптимизация: загружаем только критические зависимости
        return deps.filter(dep => {
          // Исключаем некритичные зависимости из preload
          return !dep.includes('lucide-react') && 
                 !dep.includes('sonner') &&
                 !dep.includes('@radix-ui/react-toast') &&
                 !dep.includes('@radix-ui/react-tooltip');
        });
      },
    },
    // Улучшенная оптимизация для уменьшения размера
    reportCompressedSize: false, // Ускоряет сборку
  },
  // Оптимизация зависимостей
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      // Включаем только используемые Radix компоненты
      '@radix-ui/react-slot',
      '@radix-ui/react-dialog',
      '@radix-ui/react-accordion',
      '@radix-ui/react-label',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-toast',
    ],
    exclude: [
      '@tanstack/react-query',
      'next-themes', // Lazy load если используется
      // Исключаем неиспользуемые Radix компоненты
      '@radix-ui/react-select',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-menubar',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-progress',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-separator',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-alert-dialog',
    ],
    // Оптимизация для уменьшения времени компиляции
    esbuildOptions: {
      target: 'es2015',
    },
  },
  // Оптимизация esbuild для уменьшения размера бандла и работы основного потока
  esbuild: {
    legalComments: 'none', // Удаляем комментарии
    treeShaking: true,
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    // Оптимизация для уменьшения времени парсинга
    target: 'es2015',
    // Улучшенная минификация
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
  },
});
