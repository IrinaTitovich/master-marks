import { useState, useEffect } from "react";
import { Phone, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PageNavigation from "@/components/PageNavigation";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  PenTool,
  Ruler,
  FileText,
  Lightbulb,
  Home,
  Eye,
  Map,
} from "lucide-react";

const ServicesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openService, setOpenService] = useState<string>("");
  const [activeSection, setActiveSection] = useState<"services" | "packages">(
    "services"
  );

  // Прокрутка вверх при переходе на страницу
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  const scrollToSection = (
    sectionId: "services-section" | "packages-section"
  ) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const services = [
    {
      icon: PenTool,
      title: "Архитектурное проектирование",
      shortDescription:
        "Разработка внешнего вида и планировки вашего будущего дома",
      fullDescription: [
        "Архитектурное проектирование — это первый и самый важный этап создания вашего дома. На этом этапе я разрабатываю:",
        "• Внешний вид дома (фасады, стиль, материалы отделки)",
        "• Планировку помещений (расположение комнат, их размеры и взаимосвязи)",
        "• Объемно-планировочные решения (как дом будет выглядеть снаружи и внутри)",
        "• Архитектурные чертежи",
        "",
        "Это основа всего проекта. Правильно спроектированный дом будет удобным для жизни, красивым и экономичным в строительстве.",
      ],
      whyImportant: [
        "Архитектурный проект — это основа всего строительства. Вот почему он так важен:",
        "",
        "Обязательный документ:",
        "• Без согласованного архитектурного проекта и генерального плана невозможно приступить к строительству жилого дома",
        "• Это обязательный документ для всех этапов строительства",
        "• Необходим для согласования проекта",
        "",
        "Планирование и контроль:",
        "• Вы видите точную планировку и внешний вид дома до начала строительства",
        "• Можете внести изменения на этапе проектирования, а не во время стройки",
        "• Позволяет оценить удобство планировки и функциональность помещений",
        "",
        "Экономия средств:",
        "Правильно спроектированный дом будет экономичным в строительстве и эксплуатации. Ошибки в планировке, исправленные на этапе стройки, обходятся очень дорого.",
      ],
    },
    {
      icon: Ruler,
      title: "Конструктивные решения",
      shortDescription: "Расчет прочности и надежности всех элементов дома",
      fullDescription: [
        "Конструктивные решения — это инженерная часть проекта, которая обеспечивает безопасность и долговечность вашего дома. Я рассчитываю:",
        "• Фундамент (какой тип выбрать, какую глубину заложения, армирование)",
        "• Стены (толщину, материал, утепление)",
        "• Перекрытия (бетонные плиты или деревянные балки)",
        "• Кровлю (стропильную систему, нагрузки)",
        "• Лестницы и другие несущие элементы",
        "",
        "Все расчеты выполняются в соответствии с действующими строительными нормами и правилами и обеспечивают безопасность конструкции.",
      ],
      whyImportant: [
        "Конструктивные решения (КР) — это важный документ, который дает вам несколько преимуществ:",
        "",
        "Для строителей:",
        "• Готовые спецификации материалов и арматуры",
        "• Чертежи для выполнения работ",
        "",
        "Для вас:",
        "• Возможность проверить проект до начала строительства",
        "• Возможность заранее заказать все материалы",
        "",
        "Безопасность:",
        "Неправильно рассчитанные конструкции могут привести к трещинам, просадкам и даже разрушению дома. Это критически важно для безопасности вашей семьи.",
        "",
        "Экономия:",
        "С готовыми спецификациями вы можете планировать бюджет и закупать материалы заранее, что часто позволяет сэкономить.",
      ],
    },
    {
      icon: FileText,
      title: "Рабочая документация (АР+КР)",
      shortDescription: "Полный комплект чертежей для строителей",
      fullDescription: [
        "Рабочая документация — это детальные чертежи, по которым строители возводят ваш дом. Она включает:",
        "",
        "АР (Архитектурные решения):",
        "• Планы этажей с размерами всех помещений",
        "• Фасады с указанием материалов отделки",
        "• Разрезы здания",
        "• Планы кровли и крыши",
        "• Спецификации окон, дверей, материалов",
        "",
        "КР (Конструктивные решения):",
        "• Чертежи фундамента с армированием",
        "• Чертежи перекрытий и балок",
        "• Детали узлов и соединений",
        "• Спецификации материалов и арматуры",
        "",
        "Этот комплект документов необходим для получения разрешения на строительство и для работы строительной бригады.",
      ],
      whyImportant:
        "Рабочая документация (АР+КР) объединяет все преимущества архитектурного и конструктивного проектирования в единый комплект документов для строителей. Без нее невозможно получить разрешение на строительство и правильно построить дом.",
    },
    {
      icon: Lightbulb,
      title: "Эскизный проект (концепция)",
      shortDescription: "Первоначальная идея и планировка будущего дома",
      fullDescription: [
        "Эскизный проект — это первый шаг в создании вашего дома. Он помогает:",
        "",
        "• Визуализировать ваши идеи и пожелания",
        "• Определить общую концепцию дома",
        "• Оценить примерную стоимость строительства",
        "• Принять решение о размерах и планировке",
        "",
        "На этом этапе я создаю:",
        "• Общую планировку помещений",
        "• Эскизы фасадов",
        "• Предварительные расчеты площадей",
        "• Концептуальные решения",
        "",
        "Эскизный проект — это основа для дальнейшей детальной проработки. Он позволяет понять, подходит ли вам такой дом, до начала полного проектирования.",
      ],
      whyImportant:
        "Эскизный проект помогает избежать дорогостоящих переделок на этапе детального проектирования. Вы видите концепцию заранее и можете внести изменения.",
    },
    {
      icon: Home,
      title: "Реконструкция и перепланировка",
      shortDescription: "Улучшение и изменение существующего дома",
      fullDescription: [
        "Реконструкция и перепланировка — это работы по изменению существующего жилого дома:",
        "",
        "Реконструкция включает:",
        "• Увеличение площади (пристройки, надстройки)",
        "• Изменение назначения помещений",
        "• Улучшение планировки",
        "• Модернизацию инженерных систем",
        "",
        "Перепланировка дома включает:",
        "• Объединение или разделение комнат",
        "• Перенос стен и перегородок",
        "• Изменение расположения санузлов и кухни",
        "• Увеличение жилой площади за счет нежилых помещений",
        "",
        "Я разрабатываю проект реконструкции и перепланировки, который согласовывается в соответствующих инстанциях и обеспечивает безопасность изменений.",
      ],
      whyImportant: [
        "Для отдельностоящего дома проект реконструкции не всегда обязателен, но он критически важен по следующим причинам:",
        "",
        "Безопасность:",
        "• Правильный расчет нагрузок при изменении конструкций",
        "• Учет влияния изменений на несущие элементы здания",
        "• Предотвращение трещин, просадок и других проблем",
        "• Соответствие строительным нормам и правилам",
        "",
        "Экономия:",
        "Проект помогает избежать дорогостоящих ошибок и переделок. Вы заранее видите все изменения, можете рассчитать стоимость работ и материалов, выбрать оптимальные решения.",
      ],
    },
    {
      icon: Map,
      title: "Генеральный план (генплан)",
      shortDescription: "Планировка участка и расположение всех построек",
      fullDescription: [
        "Генеральный план — это схема планировки вашего земельного участка. Он показывает:",
        "",
        "• Расположение дома на участке",
        "• Размещение хозяйственных построек (гараж, баня, сарай)",
        "• Планировку дорожек и площадок",
        "• Расположение инженерных сетей (водопровод, канализация, электричество)",
        "• Озеленение и ландшафтный дизайн",
        "• Отступы от границ участка (согласно нормам)",
        "",
        "Генплан учитывает:",
        "• Ориентацию по сторонам света (для оптимального освещения)",
        "• Рельеф участка",
        "• Существующие коммуникации",
        "• Требования пожарной безопасности",
        "• Санитарные нормы и отступы",
        "",
        "Генеральный план необходим для получения разрешения на строительство и правильной организации работ на участке.",
      ],
      whyImportant: [
        "Генеральный план — обязательный документ для строительства в городе и критически важен для правильной организации участка:",
        "",
        "Обязательность для городского строительства:",
        "• В городе без генерального плана нельзя получить разрешение на строительство",
        "• Генплан необходимо согласовать в соответствующих инстанциях",
        "• Без согласованного генплана строительство невозможно",
        "",
        "Пожарная безопасность:",
        "• Учет противопожарных разрывов между постройками",
        "• Правильное расположение относительно соседних участков",
        "• Соблюдение норм пожарной безопасности",
        "",
        "Практическая польза:",
        "Правильное расположение построек влияет на комфорт проживания, возможность подключения к коммуникациям и эффективное использование участка. Без генплана легко нарушить нормы и получить отказ в согласовании.",
      ],
    },
  ];

  const baseUrl = import.meta.env.BASE_URL || "/";
  const siteUrl =
    typeof window !== "undefined" ? window.location.origin + baseUrl : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Архитектурное проектирование домов",
    provider: {
      "@type": "LocalBusiness",
      name: "Ваш проект - Проектирование домов",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Могилев",
        addressRegion: "Могилевская область",
        addressCountry: "BY",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Могилев",
      addressRegion: "Могилевская область",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги по проектированию домов",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.shortDescription,
        },
        position: index + 1,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Услуги",
        item: `${siteUrl}services`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden max-w-full">
      <PageNavigation />
      <main id="main-content" role="main" tabIndex={-1}>
        <SEO
          title="Услуги по Проектированию Домов в Могилеве | Архитектор"
          description="Архитектурное проектирование, конструктивные решения, рабочая документация АР+КР, эскизный проект, реконструкция, авторский надзор, генеральный план. Могилев и область."
          keywords="услуги архитектора Могилев, проектирование домов услуги, архитектурное проектирование Могилев, конструктивные решения, рабочая документация АР КР, эскизный проект, реконструкция перепланировка, авторский надзор, генеральный план участка Могилев"
          url="/services"
          canonical="/services"
          jsonLd={[jsonLd, breadcrumbJsonLd]}
        />

        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Breadcrumbs */}
          <div className="mt-20 md:mt-24 mb-6">
            <Breadcrumbs items={[{ label: "Услуги" }]} />
          </div>

          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Услуги по проектированию
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Полный цикл проектирования от эскиза до согласования в исполкоме и
              последующих корректировок в случае необходимости.
            </p>
            <div className="mt-6 bg-card rounded-lg shadow-[var(--shadow-soft)] p-6">
              <h3 className="font-serif text-xl font-semibold text-card-foreground mb-3">
                Оказываем следующие услуги
              </h3>
              <ul className="space-y-2 text-card-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Проектирование индивидуальных жилых домов</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Проектирование садовых домов (дачи)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>
                    Проектирование хозяйственных построек (баня, гараж, сарай,
                    беседка, летняя кухня и прочее)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Табы для переключения между услугами и пакетами */}
          <Tabs
            value={activeSection}
            onValueChange={(value) => {
              setActiveSection(value as "services" | "packages");
              scrollToSection(
                value === "services" ? "services-section" : "packages-section"
              );
            }}
            className="w-full"
          >
            <div className="max-w-5xl mx-auto mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="services">Услуги</TabsTrigger>
                <TabsTrigger value="packages">Пакеты услуг</TabsTrigger>
              </TabsList>
            </div>

            {/* Список услуг с roadmap */}
            <TabsContent value="services" className="mt-6">
              <div
                id="services-section"
                className="max-w-7xl mx-auto mb-16 scroll-mt-24"
              >
                <div className="grid lg:grid-cols-4 gap-8">
                  {/* Roadmap - только для десктопа */}
                  <div className="hidden lg:block">
                    <div className="sticky top-6">
                      <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] p-6">
                        <h3 className="font-serif text-lg font-bold text-card-foreground mb-4">
                          Услуги
                        </h3>
                        <div className="space-y-1">
                          {services.map((service, index) => {
                            const IconComponent = service.icon;
                            const isActive = openService === `service-${index}`;
                            return (
                              <button
                                key={index}
                                onClick={() => {
                                  setOpenService(
                                    isActive ? "" : `service-${index}`
                                  );
                                }}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-start gap-3 ${
                                  isActive
                                    ? "bg-accent/20 border-l-4 border-accent text-card-foreground"
                                    : "hover:bg-accent/10 text-muted-foreground hover:text-card-foreground"
                                }`}
                              >
                                <div className="flex-shrink-0 mt-0.5">
                                  {isActive ? (
                                    <CheckCircle2 className="h-5 w-5 text-accent" />
                                  ) : (
                                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                                      <span className="text-xs font-semibold">
                                        {index + 1}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-sm font-medium ${
                                      isActive ? "text-card-foreground" : ""
                                    }`}
                                  >
                                    {service.title}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Список услуг */}
                  <div className="lg:col-span-3">
                    <Accordion
                      type="single"
                      collapsible
                      className="space-y-4"
                      value={openService}
                      onValueChange={(value) => setOpenService(value)}
                    >
                      {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                          <AccordionItem
                            key={index}
                            value={`service-${index}`}
                            className="bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 border-none px-6 sm:px-8 py-4"
                          >
                            {/* Заголовок услуги - всегда виден */}
                            <div className="flex items-start gap-4 sm:gap-6 mb-4">
                              <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                                <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 text-accent-foreground" />
                              </div>
                              <div className="flex-1">
                                <h2 className="font-serif text-xl sm:text-2xl font-bold text-card-foreground mb-2">
                                  {index + 1}. {service.title}
                                </h2>
                                <p className="text-base sm:text-lg text-muted-foreground font-medium">
                                  {service.shortDescription}
                                </p>
                              </div>
                            </div>

                            {/* Кнопка раскрытия деталей */}
                            <AccordionTrigger className="py-2 hover:no-underline text-accent font-semibold">
                              Подробнее об услуге
                            </AccordionTrigger>

                            {/* Детали услуги - раскрываются */}
                            <AccordionContent className="pt-4 pb-6">
                              <div className="space-y-6 text-card-foreground">
                                <div>
                                  <h3 className="font-semibold text-sm sm:text-base text-accent mb-3">
                                    Что это такое?
                                  </h3>
                                  <div className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                                    {service.fullDescription.map(
                                      (paragraph, pIndex) => (
                                        <p
                                          key={pIndex}
                                          className={
                                            paragraph.startsWith("•")
                                              ? "ml-4"
                                              : ""
                                          }
                                        >
                                          {paragraph}
                                        </p>
                                      )
                                    )}
                                  </div>
                                </div>

                                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
                                  <p className="text-sm sm:text-base font-semibold text-card-foreground mb-3">
                                    Почему это важно?
                                  </p>
                                  <div className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                                    {Array.isArray(service.whyImportant) ? (
                                      service.whyImportant.map(
                                        (paragraph, pIndex) => {
                                          if (paragraph.startsWith("•")) {
                                            return (
                                              <p key={pIndex} className="ml-4">
                                                {paragraph}
                                              </p>
                                            );
                                          } else if (paragraph.endsWith(":")) {
                                            return (
                                              <p
                                                key={pIndex}
                                                className="font-semibold text-card-foreground mt-2"
                                              >
                                                {paragraph}
                                              </p>
                                            );
                                          } else if (paragraph === "") {
                                            return <br key={pIndex} />;
                                          } else {
                                            return (
                                              <p key={pIndex}>{paragraph}</p>
                                            );
                                          }
                                        }
                                      )
                                    ) : (
                                      <p>{service.whyImportant}</p>
                                    )}
                                  </div>
                                </div>

                                {/* CTA для услуги */}
                                <div className="pt-4">
                                  <a
                                    href="tel:+375296745773"
                                    className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-colors [&_svg]:shrink-0"
                                  >
                                    <Phone className="mr-2 h-4 w-4" />
                                    Позвонить по этой услуге
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </a>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Пакеты услуг */}
            <TabsContent value="packages" className="mt-6">
              <div
                id="packages-section"
                className="max-w-5xl mx-auto mb-16 scroll-mt-24"
              >
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Пакеты услуг
                  </h2>
                  <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Готовые комплекты услуг для разных этапов проектирования.
                    Выберите подходящий пакет или закажите индивидуальный
                    комплект.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Пакет 1: Эскизный проект */}
                  <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 p-6 flex flex-col">
                    <div className="mb-4">
                      <h3 className="font-serif text-xl font-bold text-card-foreground mb-2">
                        Эскизный проект
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Для тех, кто хочет увидеть концепцию до начала полного
                        проектирования
                      </p>
                    </div>
                    <div className="flex-1 mb-6">
                      <ul className="space-y-2 text-sm text-card-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Эскизный проект (концепция)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Общая планировка помещений</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Эскизы фасадов</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Предварительные расчеты площадей</span>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="tel:+375296745773"
                      className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-colors [&_svg]:shrink-0"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Позвонить для заказа пакета
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>

                  {/* Пакет 2: Базовый */}
                  <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 p-6 flex flex-col">
                    <div className="mb-4">
                      <h3 className="font-serif text-xl font-bold text-card-foreground mb-2">
                        Базовый
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Основной комплект для начала проектирования и получения
                        разрешения
                      </p>
                    </div>
                    <div className="flex-1 mb-6">
                      <ul className="space-y-2 text-sm text-card-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Генеральный план (генплан)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Архитектурное проектирование (АР)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Эскизный проект (концепция)</span>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="tel:+375296745773"
                      className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-colors [&_svg]:shrink-0"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Позвонить для заказа пакета
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>

                  {/* Пакет 2: Рабочая документация */}
                  <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 p-6 flex flex-col border-2 border-accent/30">
                    <div className="mb-2">
                      <span className="inline-block bg-accent/20 text-accent text-xs font-semibold px-2 py-1 rounded mb-2">
                        Популярный
                      </span>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-serif text-xl font-bold text-card-foreground mb-2">
                        Рабочая документация
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Полный комплект документов для строительства
                      </p>
                    </div>
                    <div className="flex-1 mb-6">
                      <ul className="space-y-2 text-sm text-card-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Архитектурное проектирование (АР)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Конструктивные решения (КР)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Рабочая документация (АР+КР)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Спецификации материалов</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Готово для получения разрешения</span>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="tel:+375296745773"
                      className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-colors [&_svg]:shrink-0"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Позвонить для заказа пакета
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>

                  {/* Пакет 3: Полный комплект */}
                  <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 p-6 flex flex-col">
                    <div className="mb-4">
                      <h3 className="font-serif text-xl font-bold text-card-foreground mb-2">
                        Полный комплект
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Все услуги от концепции до авторского надзора
                      </p>
                    </div>
                    <div className="flex-1 mb-6">
                      <ul className="space-y-2 text-sm text-card-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Эскизный проект</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Архитектурное проектирование</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Конструктивные решения</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Рабочая документация (АР+КР)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>Генеральный план</span>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="tel:+375296745773"
                      className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-colors [&_svg]:shrink-0"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Позвонить для заказа пакета
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA секция */}
          <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-[var(--shadow-elegant)] p-8 sm:p-12 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-card-foreground mb-4">
              Готовы начать работу над вашим проектом?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Позвоните мне для бесплатной консультации
            </p>
            <a
              href="tel:+375296745773"
              className="inline-flex items-center justify-center gap-2 h-11 rounded-md px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg transition-colors [&_svg]:shrink-0"
            >
              <Phone className="mr-2 h-5 w-5" />
              Позвонить
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesPage;
