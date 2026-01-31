import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import ProjectExamples from "@/components/ProjectExamples";
import Portfolio from "@/components/Portfolio";
import RealProjects from "@/components/RealProjects";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Прокрутка к секции contact, если перешли с ProjectsCatalog
    if (location.state?.scrollToContact) {
      setTimeout(() => {
        const contactElement = document.getElementById("contact");
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.state]);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const siteUrl = typeof window !== "undefined" ? window.location.origin + baseUrl : "";

  const jsonLd = {
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
        addressCountry: "BY"
      },
      availableLanguage: "Russian"
    },
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Могилев",
      addressRegion: "Могилевская область",
      addressCountry: "BY",
      addressCountryName: "Беларусь"
    }
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ваш проект - Проектирование домов",
    alternateName: "Архитектор-Конструктор",
    description: "Профессиональное проектирование жилых домов в Могилеве, Могилевской области. Архитектурное проектирование, дизайн интерьеров, готовые проекты домов.",
    url: siteUrl,
    telephone: "+375-29-674-57-73",
    email: "vashproekt.by@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Могилев",
      addressRegion: "Могилевская область",
      postalCode: "",
      addressCountry: "BY",
      addressCountryName: "Беларусь"
    },
    areaServed: {
      "@type": "City",
      name: "Могилев",
      addressRegion: "Могилевская область",
      addressCountry: "BY"
    },
    geo: {
      "@type": "GeoCoordinates",
      addressLocality: "Могилев",
      addressRegion: "Могилевская область",
      addressCountry: "BY"
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
        "Saturday"
      ],
      opens: "09:00",
      closes: "18:00"
    }
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ваш проект - Проектирование домов",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}projects?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Проектирование Домов | Архитектор-Конструктор | Ваш проект"
        description="Профессиональное проектирование жилых домов в Могилеве, Могилевской области, Беларусь. Большой опыт в архитектуре и конструировании. Индивидуальный подход к каждому проекту. Готовые проекты одноэтажных, двухэтажных и мансардных домов."
        keywords="архитектор Могилев, конструктор Могилев, проектирование домов Могилев, архитектурное проектирование Могилевская область, проектирование жилых домов Могилев, индивидуальное проектирование Могилев, архитектура Могилев, строительство Могилев, проекты домов Могилев, готовые проекты домов Могилевская область"
        url="/"
        canonical="/"
        jsonLd={[jsonLd, localBusinessJsonLd, websiteJsonLd]}
      />
      <Hero />
      <About />
      <Services />
      <ProjectExamples />
      <Portfolio />
      <RealProjects />
      <Contact />
      
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="font-serif text-lg font-bold mb-1">
                Ваш проект
              </div>
              <div className="text-sm text-primary-foreground/80 mb-2">
                Проектирование домов
              </div>
              <a 
                href="tel:+375296745773"
                className="text-accent hover:text-accent/80 font-semibold text-sm flex items-center justify-center md:justify-start gap-1 transition-colors"
              >
                <Phone className="h-4 w-4" />
                +375 (29) 674-57-73
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">
                © {new Date().getFullYear()} Все права защищены.
              </p>
              <p className="text-sm text-primary-foreground/70 mt-2">
                ИП Мацукова Л.Е. УНП 790798662
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
