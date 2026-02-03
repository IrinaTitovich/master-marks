import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FileText,
  MapPin,
  CheckCircle2,
  Building2,
  Printer,
  ClipboardList,
  PenTool,
  Ruler,
  Layers,
  Lightbulb,
} from "lucide-react";
import PageNavigation from "@/components/PageNavigation";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const architecturalSolutions = [
  {
    label: "А)",
    text: "Планы этажей в осях с размерами, обозначениями материалов стен, колонн и перегородок; экспликация помещений; технико-экономические показатели дома (общая, жилая площади, высоты помещений, строительный объем).",
  },
  {
    label: "Б)",
    text: "Фасады 4 шт. в цвете с высотами и паспортом наружной отделки.",
  },
  {
    label: "В)",
    text: "Разрезы продольный и поперечный с высотами и обозначениями конструкций перекрытий.",
  },
  { label: "Г)", text: "План кровли." },
  {
    label: "Д)",
    text: "Схемы заполнения проемов и спецификации.",
  },
  {
    label: "Е)",
    text: "Чертежи по хозяйственным постройкам.",
  },
];

const constructiveSolutions = [
  {
    label: "А)",
    text: "План фундаментов, сечения по фундаментам, армирование, спецификации.",
  },
  {
    label: "Б)",
    text: "Кладочные планы с ведомостями раскладки перемычек, спецификации перемычек и сеток.",
  },
  {
    label: "В)",
    text: "Планы раскладки перекрытий, спецификации, узлы.",
  },
  {
    label: "Г)",
    text: "План стропильной системы, спецификация, узлы.",
  },
  {
    label: "Д)",
    text: "Развертки вентканалов, дымоходов, канализационного стояка с высотами и обозначениями.",
  },
  {
    label: "Е)",
    text: "Спецификация по объемам расхода основных конструктивных материалов (блок, кирпич, утеплитель и пр.).",
  },
  { label: "Ж)", text: "Иное, при необходимости." },
];

const documentsToPrepare = [
  {
    icon: FileText,
    text: "Выписка из решения исполкома (получить в «одном окне» в исполкоме по месту нахождения участка).",
  },
  {
    icon: FileText,
    text: "Архитектурно-планировочное задание (приложение к решению).",
  },
  {
    icon: MapPin,
    text: "Документы на землю с земельно-кадастровым планом.",
  },
  {
    icon: MapPin,
    text: "Топографическая (геодезическая) съемка участка.",
  },
];

const whatToUnderstand = [
  "Какие строения вы планируете (жилой дом, гараж, баня, летняя кухня и т. п.).",
  "Какие помещения хотелось бы иметь в жилом доме (количество спален и санузлов, гардеробные, кухня-гостиная или раздельные зоны, терраса и т. д.).",
  "Этажность дома (один или два этажа).",
  "Предпочтения по цвету и отделке фасадов.",
  "Желаемое размещение на участке (с учётом пожарных и санитарных норм и сторон света возможны корректировки).",
  "Состав и площади помещений в хоз. постройках (гараж — по количеству и размеру машин; баня — по числу одновременно моющихся; сарай — по объёму хранения и т. п.).",
];

const PHONE = "+375 (29) 674-57-73";

const PrintButton = () => (
  <span className="hidden sm:inline-block shrink-0 no-print">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => window.print()}
          className="no-print"
          aria-label="Распечатать"
        >
          <Printer className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Распечатать</p>
      </TooltipContent>
    </Tooltip>
  </span>
);

const ClientGuidePage = () => {
  const location = useLocation();
  const baseUrl = import.meta.env.BASE_URL || "/";
  const siteUrl =
    typeof window !== "undefined" ? window.location.origin + baseUrl : "";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Памятка заказчику",
        item: `${siteUrl}client-guide`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden max-w-full">
      <PageNavigation />
      <main id="main-content" role="main" tabIndex={-1}>
        <SEO
          title="Памятка заказчику | Проектирование домов Могилев"
          description="Документы для начала проектирования дома: объём проекта для исполкома, что обсудить заранее, конструктивные чертежи. Могилев и область."
          keywords="памятка заказчику, проектирование домов документы, исполком согласование, архитектурные решения, конструктивные решения, документы для проектирования Могилев"
          url="/client-guide"
          canonical="/client-guide"
          jsonLd={[breadcrumbJsonLd]}
        />

        <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 mt-20 md:mt-24 print:mt-0 print:pt-0">
          <div className="container mx-auto max-w-3xl mb-8 no-print">
            <Breadcrumbs items={[{ label: "Памятка заказчику" }]} />
          </div>

          <div className="container mx-auto max-w-3xl">
            <p
              className="hidden print:block text-sm font-semibold text-foreground mb-2"
              aria-hidden
            >
              Памятка заказчику | Проектирование домов Могилев | {PHONE}
            </p>

            <div className="mb-8 no-print">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                  <ClipboardList className="h-7 w-7 sm:h-8 sm:w-8 text-accent-foreground" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                    Памятка заказчику
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground mt-2">
                    Объём проектирования, документы и рекомендации для начала
                    работы над проектом.
                  </p>
                </div>
              </div>
            </div>
            <div className="print:block hidden">
              <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
                Памятка заказчику
              </h1>
            </div>

            <Tabs defaultValue="volume" className="w-full no-print">
              <TabsList className="w-full grid grid-cols-1 sm:grid-cols-3 h-auto p-1 gap-1">
                <TabsTrigger
                  value="volume"
                  className="py-2.5 text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <Layers className="h-4 w-4 shrink-0" />
                  <span className="truncate">Объем проектирования</span>
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="py-2.5 text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4 shrink-0" />
                  <span className="truncate">Документы</span>
                </TabsTrigger>
                <TabsTrigger
                  value="recommendations"
                  className="py-2.5 text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <Lightbulb className="h-4 w-4 shrink-0" />
                  <span className="truncate">Рекомендации</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="volume" className="mt-6">
                <section
                  id="volume"
                  className="scroll-mt-24 bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 px-6 sm:px-8 py-6"
                  aria-labelledby="volume-heading"
                >
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                        <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-accent-foreground" />
                      </div>
                      <h2
                        id="volume-heading"
                        className="font-serif text-xl sm:text-2xl font-bold text-card-foreground"
                      >
                        Объем проектирования
                      </h2>
                    </div>
                    <PrintButton />
                  </div>
                  <div className="space-y-8 text-card-foreground">
                    {/* Архитектурные решения — равнозначная секция */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                        <PenTool className="h-6 w-6 sm:h-7 sm:w-7 text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg font-bold text-card-foreground mb-2">
                          Архитектурные решения
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                          Обязательная часть проектной документации для
                          согласования в исполкоме перед строительством.
                        </p>
                        <ul className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {architecturalSolutions.map((item, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <span className="font-semibold text-accent shrink-0">
                                {item.label}
                              </span>
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3">
                          <strong className="text-card-foreground">
                            Генеральный план:
                          </strong>{" "}
                          размещение строений на участке по пожарным и
                          санитарным нормам; расчёт пожарного отсека (при
                          необходимости).
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-1">
                          <strong className="text-card-foreground">
                            Общая пояснительная записка.
                          </strong>
                        </p>
                      </div>
                    </div>

                    {/* Конструктивные решения — равнозначная секция */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                        <Ruler className="h-6 w-6 sm:h-7 sm:w-7 text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg font-bold text-card-foreground mb-2">
                          Конструктивные решения
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                          По желанию заказчика; не требуют согласования в
                          исполкоме.
                        </p>
                        <ul className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {constructiveSolutions.map((item, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <span className="font-semibold text-accent shrink-0">
                                {item.label}
                              </span>
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3">
                          Обмерочные работы при начатом строительстве или
                          реконструкции.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <section
                  id="documents"
                  className="scroll-mt-24 bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 px-6 sm:px-8 py-6"
                  aria-labelledby="documents-heading"
                >
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-accent-foreground" />
                      </div>
                      <h2
                        id="documents-heading"
                        className="font-serif text-xl sm:text-2xl font-bold text-card-foreground"
                      >
                        Документы для начала проектирования
                      </h2>
                    </div>
                    <PrintButton />
                  </div>
                  <ul className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {documentsToPrepare.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <li key={index} className="flex gap-3 items-start">
                          <IconComponent className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span>{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground italic">
                    * При реконструкции или начатом строительстве —
                    дополнительные документы.
                  </p>
                </section>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-6">
                <section
                  id="recommendations"
                  className="scroll-mt-24 bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 px-6 sm:px-8 py-6"
                  aria-labelledby="recommendations-heading"
                >
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                        <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-accent-foreground" />
                      </div>
                      <h2
                        id="recommendations-heading"
                        className="font-serif text-xl sm:text-2xl font-bold text-card-foreground"
                      >
                        Рекомендации
                      </h2>
                    </div>
                    <PrintButton />
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                    О чём полезно подумать заранее (совместно с семьёй):
                  </p>
                  <ul className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {whatToUnderstand.map((item, index) => (
                      <li key={index} className="flex gap-3 items-start">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </TabsContent>
            </Tabs>

            {/* При печати показываем все секции без табов */}
            <div className="print:block hidden space-y-8 pt-6">
              <section aria-labelledby="print-volume-heading">
                <h2
                  id="print-volume-heading"
                  className="font-serif text-lg font-bold text-foreground mb-3"
                >
                  1. Объем проектирования
                </h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Архитектурные решения
                    </h3>
                    <ul className="space-y-1">
                      {architecturalSolutions.map((item, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="shrink-0">{item.label}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2">
                      <strong>Генеральный план:</strong> размещение строений на
                      участке по пожарным и санитарным нормам; расчёт пожарного
                      отсека (при необходимости).
                    </p>
                    <p>
                      <strong>Общая пояснительная записка.</strong>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Конструктивные решения
                    </h3>
                    <ul className="space-y-1">
                      {constructiveSolutions.map((item, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="shrink-0">{item.label}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2">
                      Обмерочные работы при начатом строительстве или
                      реконструкции.
                    </p>
                  </div>
                </div>
              </section>
              <section aria-labelledby="print-documents-heading">
                <h2
                  id="print-documents-heading"
                  className="font-serif text-lg font-bold text-foreground mb-3"
                >
                  2. Документы для начала проектирования
                </h2>
                <ul className="space-y-1 text-sm">
                  {documentsToPrepare.map((item, i) => (
                    <li key={i}>{item.text}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs italic">
                  * При реконструкции или начатом строительстве — дополнительные
                  документы.
                </p>
              </section>
              <section aria-labelledby="print-recommendations-heading">
                <h2
                  id="print-recommendations-heading"
                  className="font-serif text-lg font-bold text-foreground mb-3"
                >
                  3. Рекомендации
                </h2>
                <ul className="space-y-1 text-sm">
                  {whatToUnderstand.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* CTA — Начать проектирование */}
            <section
              id="cta-section"
              className="scroll-mt-24 pt-8 sm:pt-10"
              aria-labelledby="cta-heading"
            >
              <div
                id="cta-heading"
                className="max-w-3xl mx-auto bg-card rounded-lg shadow-[var(--shadow-elegant)] p-8 sm:p-12 text-center"
              >
                <div className="flex justify-center mb-4 no-print">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                    <Building2 className="h-7 w-7 sm:h-8 sm:w-8 text-accent-foreground" />
                  </div>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-card-foreground mb-4">
                  Начать проектирование
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Свяжитесь с нами, чтобы обсудить проект и получить
                  консультацию.
                </p>
                <p
                  className="print:block hidden font-semibold text-foreground mb-2"
                  aria-hidden
                >
                  {PHONE}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6 no-print"
                >
                  <a
                    href={`tel:${PHONE.replace(/[\s()]/g, "").replace(
                      /-/g,
                      ""
                    )}`}
                  >
                    {PHONE}
                  </a>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientGuidePage;
