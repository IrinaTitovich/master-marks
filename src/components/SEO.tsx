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
  keywords = "проект могилев, проектирование могилев, проект дома могилев, архитектор могилев, конструктор, проектирование домов, архитектурное проектирование, проектирование жилых домов, индивидуальное проектирование, архитектура, строительство, заказать проект дома, проект дома, проекты домов, купить проект дома, архитектурное бюро, заказать индивидуальный проект дома, проект дома из блоков, проект дома с террасой, проект дома одноэтажного, проект дома с гаражом, проект дома с мансардой, проект дома 10 на 10, проектировщик Могилев, проект коттеджа, проект коттеджа заказать, проект коттеджа купить, проект дома рб, проект дома со сметой, проект дома 2 этажа, проект дома 1 этаж, проект дома двухэтажного",
  image = "/hero-architecture.jpg",
  url,
  type = "website",
  canonical,
  jsonLd,
}: SEOProps) => {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const fullUrl = url
    ? `${window.location.origin}${baseUrl}${url.replace(/^\//, "")}`
    : window.location.href;
  const canonicalUrl = canonical
    ? `${window.location.origin}${baseUrl}${canonical.replace(/^\//, "")}`
    : fullUrl;
  const imageUrl = image.startsWith("http")
    ? image
    : `${window.location.origin}${baseUrl}${image.replace(/^\//, "")}`;

  useEffect(() => {
    const updateMetaTag = (
      name: string,
      content: string,
      attribute: string = "name"
    ) => {
      let element = document.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(
        `link[rel="${rel}"]`
      ) as HTMLLinkElement;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    document.title = title;

    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", "Архитектор-Конструктор");
    updateMetaTag("robots", "index, follow");

    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:url", fullUrl, "property");
    updateMetaTag("og:image", imageUrl, "property");
    updateMetaTag("og:locale", "ru_RU", "property");
    updateMetaTag(
      "og:site_name",
      "Ваш проект - Проектирование домов",
      "property"
    );

    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", imageUrl);

    updateMetaTag("geo.region", "BY-MA", "name");
    updateMetaTag("geo.placename", "Могилев", "name");
    updateMetaTag("geo.position", "53.8945;30.3307", "name");
    updateMetaTag("ICBM", "53.8945, 30.3307", "name");

    updateLinkTag("canonical", canonicalUrl);

    if (jsonLd) {
      const oldScripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      oldScripts.forEach((script) => script.remove());

      const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      jsonLdArray.forEach((schema) => {
        const script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    canonical,
    jsonLd,
    fullUrl,
    canonicalUrl,
    imageUrl,
  ]);

  return null;
};

export default SEO;
