import { Plugin } from "vite";
import { writeFileSync } from "fs";
import { resolve } from "path";

export default function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    writeBundle() {
      // Используем статический список ID проектов, так как импорт projects.ts
      // использует алиасы @/assets, которые не работают в Node.js окружении
      const projects = [
        { id: "project-350" },
        { id: "project-333" },
        { id: "project-244" },
        { id: "project-245" },
        { id: "project-251" },
        { id: "project-321" },
        { id: "project-307" },
        { id: "project-282" },
      ];

      const BASE_URL = process.env.VITE_BASE_URL || "/";
      // Для GitHub Pages нужно указать полный URL вашего сайта
      // Можно настроить через переменную окружения VITE_SITE_URL
      const SITE_URL = process.env.VITE_SITE_URL || "https://vashproekt.by";
      
      const currentDate = new Date().toISOString().split("T")[0];

      // Статические страницы
      const staticPages = [
        {
          url: "",
          changefreq: "weekly",
          priority: "1.0",
        },
        {
          url: "projects",
          changefreq: "weekly",
          priority: "0.9",
        },
      ];

      // Страницы проектов
      const projectPages = projects.map((project) => ({
        url: `projects/${project.id}`,
        changefreq: "monthly",
        priority: "0.8",
      }));

      const allPages = [...staticPages, ...projectPages];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${BASE_URL === "/" ? "" : BASE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

      const outDir = resolve(__dirname, "dist");
      writeFileSync(resolve(outDir, "sitemap.xml"), sitemap, "utf-8");
      console.log("✅ Sitemap.xml generated successfully");
    },
  };
}
