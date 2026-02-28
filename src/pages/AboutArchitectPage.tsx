import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Briefcase,
  BadgeCheck,
  Clock,
  Banknote,
  Star,
  MessageSquare,
} from "lucide-react";
import PageNavigation from "@/components/PageNavigation";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import architectPhoto from "@/assets/hero-architecture.jpg";
import certificateImage from "@/assets/about/certificate.jpg";
import attestat1Side1 from "@/assets/about/1.jpg";
import attestat1Side2 from "@/assets/about/2.jpg";
import attestat2Side1 from "@/assets/about/3.jpg";
import attestat2Side2 from "@/assets/about/4.jpg";

const AboutArchitectPage = () => {
  const location = useLocation();
  const baseUrl = import.meta.env.BASE_URL || "/";
  const siteUrl =
    typeof window !== "undefined" ? window.location.origin + baseUrl : "";

  const openTabFromState =
    location.state?.openTab === "certificate" ? "certificate" : "attestats";
  const [docsTab, setDocsTab] = useState(openTabFromState);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    if (location.state?.openTab) setDocsTab(location.state.openTab);
  }, [location.state?.openTab]);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Об архитекторе",
        item: `${siteUrl}about`,
      },
    ],
  };

  const whyChoose = [
    {
      icon: Briefcase,
      title: "Опыт",
      description: "Более 600 реализованных проектов",
    },
    {
      icon: BadgeCheck,
      title: "Аттестованный специалист",
      description:
        "С вами работает специалист, аттестованный в Республике Беларусь: главный инженер проекта (ГИП) и главный специалист по разработке раздела проектной документации «Конструктивные решения» (ГС).",
    },
    {
      icon: Star,
      title: "Рейтинг Google 5.0",
      description:
        "Средняя оценка 5.0 из 5. Больше всех отзывов в категории проектирования домов в Могилеве.",
      isGoogleRating: true,
    },
    {
      icon: Clock,
      title: "Удобное время",
      description: "Работа с заказчиком в удобное для клиента время",
    },
    {
      icon: Banknote,
      title: "Доступные цены",
      description: "Прозрачное ценообразование и доступные условия",
    },
  ];

  const attestats = [
    {
      title:
        "Главный специалист, осуществляющий разработку раздела проектной документации (конструктивные решения)",
      images: [attestat1Side1, attestat1Side2],
    },
    {
      title: "Главный инженер проекта",
      images: [attestat2Side1, attestat2Side2],
    },
  ];

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden max-w-full">
      <PageNavigation />
      <main id="main-content" role="main" tabIndex={-1}>
        <SEO
          title="Об архитекторе | Проектирование Домов Могилев"
          description="Архитектор-конструктор с более чем 20-летним опытом. Свидетельство о регистрации ИП, квалификационные аттестаты: главный специалист (конструктивные решения), главный инженер проекта."
          keywords="архитектор Могилев, архитектор-конструктор, проектирование домов, квалификационный аттестат, главный инженер проекта, конструктивные решения"
          url="/about"
          canonical="/about"
          jsonLd={[breadcrumbJsonLd]}
        />

        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="mt-20 md:mt-24 mb-6">
            <Breadcrumbs items={[{ label: "Об архитекторе" }]} />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
            Об архитекторе
          </h1>

          {/* Блок 1 — Фото и описание */}
          <section className="mb-12 md:mb-16" aria-labelledby="photo-heading">
            <h2 id="photo-heading" className="sr-only">
              Фото и описание
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-lg overflow-hidden shadow-[var(--shadow-soft)] aspect-video bg-muted">
                <img
                  src={architectPhoto}
                  alt="Архитектор-конструктор"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  Профессиональный архитектор-конструктор с более чем 20-летним
                  опытом работы в области проектирования жилых домов и
                  коттеджей.
                </p>
                <p>
                  Каждый проект — это уникальное решение, созданное с учетом
                  индивидуальных пожеланий клиента, особенностей участка и
                  современных строительных технологий.
                </p>
                <p>
                  Специализируюсь на создании функциональных, эстетичных и
                  безопасных конструкций, которые становятся настоящим домом для
                  их владельцев.
                </p>
              </div>
            </div>
          </section>

          {/* Блок 2 — Почему выбирают нашего архитектора */}
          <section
            className="mb-12 md:mb-16"
            aria-labelledby="why-choose-heading"
          >
            <h2
              id="why-choose-heading"
              className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6"
            >
              Почему выбирают именно нашего архитектора
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {whyChoose.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-lg shadow-[var(--shadow-soft)] p-6 hover:shadow-[var(--shadow-elegant)] transition-shadow"
                  >
                    {item.isGoogleRating ? (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-8 w-8 fill-accent text-accent" />
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 fill-accent text-accent"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <IconComponent className="h-8 w-8 text-accent mb-4" />
                    )}
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {item.description}
                    </p>
                    {item.isGoogleRating && (
                      <a
                        href="https://www.google.com/search?q=%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82+%D0%BC%D0%BE%D0%B3%D0%B8%D0%BB%D0%B5%D0%B2&rlz=1C1GCEA_enBY1071BY1071&sca_esv=bd96da7b54c85e6e&biw=1920&bih=919&sxsrf=ANbL-n5BTOhSMUgZ8kXTTj0Ec61fox0eOA%3A1770736498787&ei=ckuLabnRL8yNwPAPrd6C0AU&ved=0ahUKEwi50oDAm8-SAxXMBhAIHS2vAFoQ4dUDCBM&uact=5&oq=%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82+%D0%BC%D0%BE%D0%B3%D0%B8%D0%BB%D0%B5%D0%B2&gs_lp=Egxnd3Mtd2l6LXNlcnAiG9C_0YDQvtC10LrRgiDQvNC-0LPQuNC70LXQsjIEECMYJzIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHkjjEVCjClijCnACeAGQAQCYAVWgAVWqAQExuAEDyAEA-AEBmAIDoAJgwgIKEAAYRxjWBBiwA5gDAIgGAZAGCJIHATOgB8kIsgcBMbgHWcIHBTAuMS4yyAcIgAgB&sclient=gws-wiz-serp#lrd=0x46d051e4300295cf:0xc88c0cdba4d373f1,1,,,,"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Читать отзывы в Google
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Табы: Аттестаты и Свидетельство о регистрации */}
          <section
            className="mb-12 md:mb-16 mt-8 sm:mt-0 relative z-0"
            aria-labelledby="docs-heading"
          >
            <h2
              id="docs-heading"
              className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6"
            >
              Документы
            </h2>
            <Tabs value={docsTab} onValueChange={setDocsTab} className="w-full">
              <TabsList className="flex flex-col sm:flex-row w-full h-auto min-h-[2.5rem] p-1.5 gap-1.5 rounded-md bg-muted mb-6 shrink-0">
                <TabsTrigger
                  value="attestats"
                  className="flex-1 w-full sm:w-auto py-3 sm:py-1.5 rounded-sm"
                >
                  Аттестаты
                </TabsTrigger>
                <TabsTrigger
                  value="certificate"
                  className="flex-1 w-full sm:w-auto py-3 sm:py-1.5 rounded-sm whitespace-normal sm:whitespace-nowrap text-center"
                >
                  Свидетельство о регистрации
                </TabsTrigger>
              </TabsList>
              <TabsContent value="attestats" className="mt-0 pt-0">
                <ul className="space-y-8">
                  {attestats.map((item, index) => (
                    <li key={index}>
                      <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] p-6 hover:shadow-[var(--shadow-elegant)] transition-shadow">
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                          {item.title}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {item.images.map((img, imgIndex) => (
                            <div
                              key={imgIndex}
                              className="rounded-lg overflow-hidden bg-muted aspect-[3/4] max-w-sm"
                            >
                              <img
                                src={img}
                                alt={`${item.title}, сторона ${imgIndex + 1}`}
                                className="w-full h-full object-contain -rotate-90"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="certificate" className="mt-0 pt-0">
                <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] p-6 max-w-2xl">
                  <img
                    src={certificateImage}
                    alt="Свидетельство о регистрации ИП"
                    className="w-full h-auto rounded-lg object-contain"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutArchitectPage;
