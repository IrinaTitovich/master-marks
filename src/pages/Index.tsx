import { useEffect, lazy, Suspense, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Phone, Instagram } from "lucide-react";
import SEO from "@/components/SEO";
import PageNavigation from "@/components/PageNavigation";
import SkipLinks from "@/components/SkipLinks";

// Lazy loading компонентов для уменьшения первоначального бандла
const Hero = lazy(() => import("@/components/Hero"));
const About = lazy(() => import("@/components/About"));
const Services = lazy(() => import("@/components/Services"));
const ProjectExamples = lazy(() => import("@/components/ProjectExamples"));
const RealProjects = lazy(() => import("@/components/RealProjects"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Прокрутка к секции, если перешли с других страниц
    if (location.state?.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const isMobile = window.innerWidth < 768;
            const offset = isMobile ? 20 : 80;

            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: isMobile ? "auto" : "smooth",
            });
          }
        });
      });
      return;
    }

    // Прокрутка к секции контактов, если перешли с других страниц
    if (location.state?.scrollToContact) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const contactElement = document.getElementById("contact");
          if (contactElement) {
            // Для мобильных устройств используем instant прокрутку для четкости
            const isMobile = window.innerWidth < 768;
            const offset = isMobile ? 20 : 80;
            const elementPosition = contactElement.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: isMobile ? "auto" : "smooth", // Instant на мобильных для четкости
            });

            // Если нужно открыть карту
            if (location.state?.openMap) {
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent("openLocationMap"));
              }, 500);
            }
          }
        });
      });
    }
  }, [location.state]);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const siteUrl =
    typeof window !== "undefined" ? window.location.origin + baseUrl : "";

  // Мемоизация JSON-LD для предотвращения пересоздания объектов
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Ваш проект - Проектирование домов",
      alternateName: "Архитектор-Конструктор",
      url: siteUrl,
      logo: `${siteUrl}placeholder.svg`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+375-29-674-57-73",
        contactType: "customer service",
        areaServed: {
          "@type": "City",
          name: "Могилев",
          addressRegion: "Могилевская область",
          addressCountry: "BY",
        },
        availableLanguage: "Russian",
      },
      sameAs: [],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Могилев",
        addressRegion: "Могилевская область",
        addressCountry: "BY",
        addressCountryName: "Беларусь",
      },
    }),
    [siteUrl]
  );

  const localBusinessJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Ваш проект - Проектирование домов",
      alternateName: "Архитектор-Конструктор",
      description:
        "Проект Могилев, проектирование Могилев, проект дома Могилев, архитектор Могилев. Профессиональное проектирование жилых домов в Могилеве, Могилевской области. Архитектурное проектирование, готовые проекты домов.",
      url: siteUrl,
      telephone: "+375-29-674-57-73",
      email: "vashproekt.by@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Могилев",
        addressRegion: "Могилевская область",
        streetAddress: "пер. 1 Хвойный д. 3",
        postalCode: "",
        addressCountry: "BY",
        addressCountryName: "Беларусь",
      },
      areaServed: {
        "@type": "City",
        name: "Могилев",
        addressRegion: "Могилевская область",
        addressCountry: "BY",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "53.8945",
        longitude: "30.3307",
        addressLocality: "Могилев",
        addressRegion: "Могилевская область",
        addressCountry: "BY",
      },
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "50",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          author: {
            "@type": "Person",
            name: "Клиент",
          },
          datePublished: "2024-01-15",
          reviewBody:
            "Отличная работа! Проект выполнен качественно и в срок. Рекомендую!",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
        },
      ],
    }),
    [siteUrl]
  );

  const websiteJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ваш проект - Проектирование домов",
      description:
        "Проект Могилев, проектирование Могилев, проект дома Могилев, архитектор Могилев. Профессиональное проектирование жилых домов в Могилеве и Могилевской области.",
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}projects?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    }),
    [siteUrl]
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden max-w-full">
      <SkipLinks />
      <PageNavigation />
      <SEO
        title="Проектирование Домов в Могилеве | Архитектор-Конструктор"
        description="Профессиональное проектирование жилых домов в Могилеве и Могилевской области. 20+ лет опыта. Индивидуальные и готовые проекты одноэтажных, двухэтажных и мансардных домов."
        keywords="проект могилев, проектирование могилев, проект дома могилев, архитектор могилев, конструктор Могилев, проектирование домов Могилев, архитектурное проектирование Могилевская область, проектирование жилых домов Могилев, индивидуальное проектирование Могилев, архитектура Могилев, строительство Могилев, проекты домов Могилев, готовые проекты домов Могилевская область"
        url="/"
        canonical="/"
        jsonLd={[jsonLd, localBusinessJsonLd, websiteJsonLd]}
      />
      <main id="main-content" role="main" tabIndex={-1}>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Services />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <ProjectExamples />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <RealProjects />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <Contact />
        </Suspense>
      </main>

      {/* Hint перед footer */}
      <div className="bg-accent/10 border-t border-accent/20 py-6">
        <div className="container mx-auto px-6">
          <p className="text-center text-muted-foreground text-sm">
            💡{" "}
            <span className="font-semibold text-foreground">
              Бесплатная консультация
            </span>{" "}
            — позвоните для профессиональной консультации и расчёта стоимости
            вашего проекта
          </p>
        </div>
      </div>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="font-sans text-lg font-semibold mb-1 antialiased">
                <span className="text-accent">Ваш</span>{" "}
                <span className="font-bold tracking-tight">Проект</span>
              </div>
              <div className="text-sm text-primary-foreground/80 mb-2">
                Проектирование домов
              </div>
              <a
                href="tel:+375296745773"
                className="text-accent hover:text-accent/80 font-semibold text-sm flex items-center justify-center md:justify-start gap-1 transition-colors mb-2"
              >
                <Phone className="h-4 w-4" />
                +375 (29) 674-57-73
              </a>
              <a
                href="https://www.instagram.com/vashproekt.by/?hl=ru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 font-semibold text-sm flex items-center justify-center md:justify-start gap-1 transition-colors"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">
                © {new Date().getFullYear()} Все права защищены.
              </p>
              <p className="text-sm text-primary-foreground/70 mt-2">
                ИП Мацукова Л.Е. УНП 790798662
              </p>
              <p
                className="text-[10px] text-primary-foreground/40 mt-3 font-normal tracking-wide"
                aria-hidden="true"
              >
                v1.0.5
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
