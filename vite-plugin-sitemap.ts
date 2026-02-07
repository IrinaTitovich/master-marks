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
        { id: "project-478" },
        { id: "project-244" },
        { id: "project-245" },
        { id: "project-251" },
        { id: "project-321" },
        { id: "project-307" },
        { id: "project-282" },
      ];

      const BASE_URL = process.env.VITE_BASE_URL || "/";
      // Для GitHub Pages нужно указать полный URL вашего сайта
      const SITE_URL = (
        process.env.VITE_SITE_URL || "https://vashproekt.by"
      ).replace(/\/$/, "");

      /** Собирает полный URL: между базой и путём всегда один слэш */
      const fullUrl = (path: string) =>
        path ? `${SITE_URL}/${path.replace(/^\//, "")}` : SITE_URL;

      const currentDate = new Date().toISOString().split("T")[0];

      // Статические страницы
      const staticPages = [
        {
          url: "",
          changefreq: "weekly",
          priority: "1.0",
        },
        {
          url: "services",
          changefreq: "monthly",
          priority: "0.9",
        },
        {
          url: "projects",
          changefreq: "weekly",
          priority: "0.9",
        },
        {
          url: "about",
          changefreq: "monthly",
          priority: "0.8",
        },
        {
          url: "client-guide",
          changefreq: "monthly",
          priority: "0.8",
        },
      ];

      // Страницы проектов
      const projectPages = projects.map((project) => ({
        url: `projects/${project.id}`,
        changefreq: "monthly",
        priority: "0.8",
      }));

      const allPages = [...staticPages, ...projectPages];

      // Изображения для главной страницы
      const basePath = BASE_URL === "/" ? "" : BASE_URL.replace(/\/$/, "");
      const mainPageImages = [
        fullUrl(
          basePath
            ? `${basePath}/src/assets/hero-architecture.jpg`
            : "src/assets/hero-architecture.jpg"
        ),
      ];

      // Изображения для проектов (примерные пути)
      const imgPath = (p: string) => fullUrl(basePath ? `${basePath}/${p}` : p);
      const projectImages: Record<string, string[]> = {
        "project-350": [
          imgPath(
            "src/assets/projects/single-story/project-350/project-350-1.jpg"
          ),
          imgPath(
            "src/assets/projects/single-story/project-350/project-350-2.jpg"
          ),
        ],
        "project-333": [
          imgPath(
            "src/assets/projects/single-story/project-333/project-333-1.jpg"
          ),
          imgPath(
            "src/assets/projects/single-story/project-333/project-333-2.jpg"
          ),
        ],
        "project-478": [
          imgPath(
            "src/assets/projects/single-story/project-478/project-478-1.jpg"
          ),
          imgPath(
            "src/assets/projects/single-story/project-478/project-478-2.jpg"
          ),
        ],
        "project-244": [
          imgPath(
            "src/assets/projects/two-story/project-244/project-244-1.jpg"
          ),
          imgPath(
            "src/assets/projects/two-story/project-244/project-244-2.jpg"
          ),
        ],
        "project-245": [
          imgPath(
            "src/assets/projects/two-story/project-245/project-245-1.jpg"
          ),
          imgPath(
            "src/assets/projects/two-story/project-245/project-245-2.jpg"
          ),
        ],
        "project-251": [
          imgPath(
            "src/assets/projects/two-story/project-251/project-251-1.jpg"
          ),
          imgPath(
            "src/assets/projects/two-story/project-251/project-251-2.jpg"
          ),
        ],
        "project-321": [
          imgPath(
            "src/assets/projects/two-story/project-321/project-321-1.jpg"
          ),
          imgPath(
            "src/assets/projects/two-story/project-321/project-321-2.jpg"
          ),
        ],
        "project-307": [
          imgPath("src/assets/projects/mansard/project-307/project-307-1.jpg"),
          imgPath("src/assets/projects/mansard/project-307/project-307-2.jpg"),
        ],
        "project-282": [
          imgPath("src/assets/projects/mansard/project-282/project-282-1.jpg"),
          imgPath("src/assets/projects/mansard/project-282/project-282-2.jpg"),
        ],
      };

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages
  .map((page) => {
    const images =
      page.url === ""
        ? mainPageImages
        : page.url.startsWith("projects/")
        ? projectImages[page.url.replace("projects/", "")] || []
        : [];

    const imageTags =
      images.length > 0
        ? images
            .map(
              (img) => `    <image:image>
      <image:loc>${img}</image:loc>
    </image:image>`
            )
            .join("\n")
        : "";

    const pagePath = basePath ? `${basePath}/${page.url}` : page.url;
    return `  <url>
    <loc>${fullUrl(pagePath)}</loc>
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
