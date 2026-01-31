import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  canonical?: string;
  jsonLd?: object | object[];
}

const SEO = ({
  title = "Проектирование Домов | Архитектор-Конструктор",
  description = "Профессиональное проектирование жилых домов. Большой опыт в архитектуре и конструировании. Индивидуальный подход к каждому проекту.",
  keywords = "архитектор, конструктор, проектирование домов, архитектурное проектирование, проектирование жилых домов, индивидуальное проектирование, архитектура, строительство",
  image = "/placeholder.svg",
  url,
  type = "website",
  canonical,
  jsonLd,
}: SEOProps) => {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const fullUrl = url ? `${window.location.origin}${baseUrl}${url.replace(/^\//, "")}` : window.location.href;
  const canonicalUrl = canonical ? `${window.location.origin}${baseUrl}${canonical.replace(/^\//, "")}` : fullUrl;
  const imageUrl = image.startsWith("http") ? image : `${window.location.origin}${baseUrl}${image.replace(/^\//, "")}`;

  useEffect(() => {
    // Используем requestIdleCallback для обновления SEO тегов вне критического пути
    const updateSEO = () => {
      // Обновляем title
      document.title = title;

      // Функция для обновления или создания meta тега
      const updateMetaTag = (name: string, content: string, attribute: string = "name") => {
        let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
        if (!element) {
          element = document.createElement("meta");
          element.setAttribute(attribute, name);
          document.head.appendChild(element);
        }
        element.setAttribute("content", content);
      };

      // Функция для обновления или создания link тега
      const updateLinkTag = (rel: string, href: string) => {
        let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
        if (!element) {
          element = document.createElement("link");
          element.setAttribute("rel", rel);
          document.head.appendChild(element);
        }
        element.setAttribute("href", href);
      };

      // Обновляем основные meta теги
      updateMetaTag("description", description);
      updateMetaTag("keywords", keywords);
      updateMetaTag("author", "Архитектор-Конструктор");
      updateMetaTag("robots", "index, follow");

      // Open Graph теги
      updateMetaTag("og:title", title, "property");
      updateMetaTag("og:description", description, "property");
      updateMetaTag("og:type", type, "property");
      updateMetaTag("og:url", fullUrl, "property");
      updateMetaTag("og:image", imageUrl, "property");
      updateMetaTag("og:locale", "ru_RU", "property");
      updateMetaTag("og:site_name", "Ваш проект - Проектирование домов", "property");

      // Twitter Card теги
      updateMetaTag("twitter:card", "summary_large_image");
      updateMetaTag("twitter:title", title);
      updateMetaTag("twitter:description", description);
      updateMetaTag("twitter:image", imageUrl);

      // Canonical URL
      updateLinkTag("canonical", canonicalUrl);

      // Добавляем JSON-LD структурированные данные
      if (jsonLd) {
        // Удаляем старые JSON-LD скрипты
        const oldScripts = document.querySelectorAll('script[type="application/ld+json"]');
        oldScripts.forEach(script => script.remove());

        // Если jsonLd - массив, создаем отдельный script для каждого объекта
        const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
        jsonLdArray.forEach((schema) => {
          const script = document.createElement("script");
          script.setAttribute("type", "application/ld+json");
          script.textContent = JSON.stringify(schema);
          document.head.appendChild(script);
        });
      }
    };

    // Используем requestIdleCallback если доступен, иначе setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(updateSEO, { timeout: 2000 });
    } else {
      setTimeout(updateSEO, 0);
    }
  }, [title, description, keywords, image, url, type, canonical, jsonLd, fullUrl, canonicalUrl, imageUrl]);

  return null;
};

export default SEO;
