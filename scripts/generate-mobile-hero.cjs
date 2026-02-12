/**
 * Генерирует сжатую мобильную версию hero и WebP для ускорения LCP.
 * Запуск вручную при смене hero-architecture.jpg:
 *   npm install sharp --save-dev && node scripts/generate-mobile-hero.cjs
 * Создаёт: hero-architecture-mobile.jpg, hero-architecture.webp, hero-architecture-mobile.webp
 */
const path = require("path");
const fs = require("fs");

const publicDir = path.join(__dirname, "..", "public");
const srcPath = path.join(publicDir, "hero-architecture.jpg");
const outJpg = path.join(publicDir, "hero-architecture-mobile.jpg");
const outWebpDesktop = path.join(publicDir, "hero-architecture.webp");
const outWebpMobile = path.join(publicDir, "hero-architecture-mobile.webp");

const MOBILE_WIDTH = 800;
const JPEG_QUALITY = 76;
const WEBP_QUALITY = 82;

if (!fs.existsSync(srcPath)) {
  console.warn("[generate-mobile-hero] hero-architecture.jpg не найден, пропуск.");
  process.exit(0);
}

let sharp;
try {
  sharp = require("sharp");
} catch (e) {
  console.warn("[generate-mobile-hero] sharp не найден. Выполните: npm install, затем npm run hero:images");
  process.exit(0);
}

async function run() {
  try {
    const [jpgInfo, webpDesktopInfo, webpMobileInfo] = await Promise.all([
      sharp(srcPath)
        .resize(MOBILE_WIDTH, null, { withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY })
        .toFile(outJpg),
      sharp(srcPath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(outWebpDesktop),
      sharp(srcPath)
        .resize(MOBILE_WIDTH, null, { withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outWebpMobile),
    ]);
    console.log("[generate-mobile-hero] hero-architecture-mobile.jpg:", Math.round(jpgInfo.size / 1024), "KB");
    console.log("[generate-mobile-hero] hero-architecture.webp:", Math.round(webpDesktopInfo.size / 1024), "KB");
    console.log("[generate-mobile-hero] hero-architecture-mobile.webp:", Math.round(webpMobileInfo.size / 1024), "KB");
  } catch (err) {
    console.error("[generate-mobile-hero] Ошибка:", err.message);
    process.exit(1);
  }
}

run();
