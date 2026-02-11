import { Plugin } from "vite";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

/** Извлекает список id проектов из src/data/projects.ts — один источник правды для sitemap и приложения. */
function getProjectIds(): string[] {
  const path = resolve(__dirname, "src/data/projects.ts");
  try {
    const content = readFileSync(path, "utf-8");
    const matches = content.matchAll(/id:\s*["'](project-\d+)["']/g);
    return [...matches].map((m) => m[1]);
  } catch {
    return [];
  }
}

export default function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    writeBundle() {
      const projectIds = getProjectIds();
      const projects = projectIds.map((id) => ({ id }));

      const BASE_URL = process.env.VITE_BASE_URL || "/";
      // Для GitHub Pages нужно указать полный URL вашего сайта
      // Можно настроить через переменную окружения VITE_SITE_URL
      const SITE_URL = (process.env.VITE_SITE_URL || "https://vashproekt.by").replace(/\/$/, "");
      const basePath = BASE_URL === "/" ? "" : BASE_URL.replace(/^\//, "").replace(/\/$/, "");
      const fullUrl = (path: string) => (path ? `${SITE_URL}/${basePath ? basePath + "/" : ""}${path.replace(/^\//, "")}` : SITE_URL);

      const currentDate = new Date().toISOString().split("T")[0];

      // Статические страницы (приоритеты для SEO: главные коммерческие страницы выше)
      const staticPages = [
        { url: "", changefreq: "weekly", priority: "1.0" },
        { url: "services", changefreq: "monthly", priority: "0.95" },
        { url: "projects", changefreq: "weekly", priority: "0.95" },
        { url: "about", changefreq: "monthly", priority: "0.85" },
        { url: "client-guide", changefreq: "monthly", priority: "0.8" },
      ];

      const projectPages = projects.map((project) => ({
        url: `projects/${project.id}`,
        changefreq: "monthly",
        priority: "0.75",
      }));

      const allPages = [...staticPages, ...projectPages];

      // Изображения только для главной: hero в public, URL реальный. У проектов картинки в сборке с хешем — в sitemap не даём битые URL.
      const mainPageImages = [fullUrl("hero-architecture.jpg")];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages
  .map((page) => {
    const images = page.url === "" ? mainPageImages : [];
    
    const imageTags = images.length > 0
      ? images.map(img => `    <image:image>
      <image:loc>${img}</image:loc>
    </image:image>`).join("\n")
      : "";
    
    return `  <url>
    <loc>${fullUrl(page.url)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${imageTags ? "\n" + imageTags : ""}
  </url>`;
  })
  .join("\n")}
</urlset>`;

      const outDir = resolve(__dirname, "dist");
      writeFileSync(resolve(outDir, "sitemap.xml"), sitemap, "utf-8");
      console.log("✅ Sitemap.xml generated successfully");
    },
  };
}
