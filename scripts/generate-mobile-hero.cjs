/**
 * Генерирует сжатую мобильную версию hero для ускорения LCP на телефонах.
 * Запуск вручную при смене hero-architecture.jpg:
 *   npm install sharp --save-dev && node scripts/generate-mobile-hero.cjs
 * Файл public/hero-architecture-mobile.jpg уже есть в репо — sharp не нужен для обычной сборки.
 */
const path = require("path");
const fs = require("fs");

const publicDir = path.join(__dirname, "..", "public");
const srcPath = path.join(publicDir, "hero-architecture.jpg");
const outPath = path.join(publicDir, "hero-architecture-mobile.jpg");

const MOBILE_WIDTH = 800;
const JPEG_QUALITY = 76;

if (!fs.existsSync(srcPath)) {
  console.warn("[generate-mobile-hero] hero-architecture.jpg не найден, пропуск.");
  process.exit(0);
}

let sharp;
try {
  sharp = require("sharp");
} catch (e) {
  console.warn("[generate-mobile-hero] sharp не установлен. Установите: npm install sharp --save-dev");
  process.exit(0);
}

sharp(srcPath)
  .resize(MOBILE_WIDTH, null, { withoutEnlargement: true })
  .jpeg({ quality: JPEG_QUALITY })
  .toFile(outPath)
  .then((info) => {
    console.log("[generate-mobile-hero] Создан hero-architecture-mobile.jpg:", Math.round(info.size / 1024), "KB");
  })
  .catch((err) => {
    console.error("[generate-mobile-hero] Ошибка:", err.message);
    process.exit(1);
  });
