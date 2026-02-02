import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FileText,
  MapPin,
  CheckCircle2,
  Building2,
  Pin,
  Printer,
  ArrowDown,
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

const ClientGuidePage = () => {
  const location = useLocation();
  const baseUrl = import.meta.env.BASE_URL || "/";
  const siteUrl =
    typeof window !== "undefined" ? window.location.origin + baseUrl : "";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

    const handlePrint = () => {
    window.print();
  };

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

        <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 mt-20 md:mt-24 print:mt-0 print:pt-0 print:py-0">
          <div className="container mx-auto mb-6 no-print">
            <Breadcrumbs items={[{ label: "Памятка заказчику" }]} />
          </div>

          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_1fr] gap-6 lg:gap-8">
            {/* Левая колонка: схема «Как это понять» */}
            <aside className="no-print shrink-0" aria-labelledby="scheme-heading">
              <section className="bg-card rounded-lg border border-border shadow-[var(--shadow-soft)] p-5 sm:p-6">
                <h2 id="scheme-heading" className="font-serif text-xl font-bold text-foreground mb-4">
                  Как это понять
                </h2>
                <nav className="flex flex-col gap-0" aria-label="Схема шагов">
                  <a
                    href="#understand"
                    className="flex items-start gap-3 py-2 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center font-semibold text-accent text-sm">
                      1
                    </span>
                    <span className="text-sm pt-0.5">Определиться с пожеланиями</span>
                  </a>
                  <div className="flex justify-center py-0.5" aria-hidden>
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <a
                    href="#documents"
                    className="flex items-start gap-3 py-2 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center font-semibold text-accent text-sm">
                      2
                    </span>
                    <span className="text-sm pt-0.5">Документы для начала проектирования</span>
                  </a>
                  <div className="flex justify-center py-0.5" aria-hidden>
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <a
                    href="#exec-volume"
                    className="flex items-start gap-3 py-2 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center font-semibold text-accent text-sm">
                      3
                    </span>
                    <span className="text-sm pt-0.5">Проект для исполкома</span>
                  </a>
                  <div className="flex justify-center py-0.5" aria-hidden>
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <a
                    href="#additional-works"
                    className="flex items-start gap-3 py-2 rounded-md hover:bg-muted/50 transition-colors text-foreground"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center font-semibold text-accent text-sm">
                      4
                    </span>
                    <span className="text-sm pt-0.5">Конструктивные чертежи</span>
                  </a>
                </nav>
              </section>
            </aside>

            {/* Правая колонка: памятка (доска с листами) */}
            <div className="min-w-0">
          <div className="print-area">
          {/* Строка при печати: заголовок + телефон */}
          <p className="hidden print:block print-header-line mb-0" aria-hidden>
            Памятка заказчику | Проектирование домов Могилев | +375 (29) 674-57-73
          </p>
          {/* Доска «Памятка заказчику» */}
          <div
            className="min-h-[calc(100vh-8rem)] rounded-2xl sm:rounded-3xl border-8 sm:border-[10px] border-amber-800/60 bg-amber-900/40 shadow-inner"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
            }}
          >
            {/* Название доски + кнопка распечатать (скрыто при печати) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 pb-4 px-4 no-print">
              <h1 className="text-center font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
                Памятка заказчику
              </h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handlePrint}
                    className="shrink-0 bg-white/95 hover:bg-white text-amber-900 border-amber-700/80 print:hidden"
                    aria-label="Распечатать"
                  >
                    <Printer className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Распечатать</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* 4 листа на доске */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 max-w-6xl mx-auto">
              {/* Лист 1: Объём проекта для исполкома */}
              <article
                className="relative bg-amber-50/95 dark:bg-stone-100/95 text-foreground rounded-sm border border-amber-200/80 dark:border-stone-300/80 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_6px_16px_rgba(0,0,0,0.12)]"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}
              >
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-amber-700 shadow border-2 border-amber-600/80 flex items-center justify-center no-print">
                  <Pin className="h-4 w-4 text-amber-100 rotate-[-45deg]" aria-hidden />
                </div>
                <section id="exec-volume" className="scroll-mt-28 p-5 sm:p-6 pt-8" aria-labelledby="exec-volume-heading">
                  <h2 id="exec-volume-heading" className="font-serif text-lg font-bold text-foreground mb-2">
                    1. Объём проекта для исполкома
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Обязательная часть проектной документации для согласования в исполкоме перед строительством.
                  </p>
                  <div className="pl-3 border-l-2 border-amber-300/50 dark:border-stone-300/50 space-y-2 mb-3">
                    <h3 className="font-serif font-semibold text-foreground text-sm">Архитектурные решения</h3>
                    <ul className="space-y-1.5 text-muted-foreground text-sm leading-relaxed">
                      {architecturalSolutions.map((item, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="font-semibold text-accent shrink-0">{item.label}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pl-3 border-l-2 border-amber-300/50 dark:border-stone-300/50 mb-3">
                    <h3 className="font-serif font-semibold text-foreground text-sm">Генеральный план</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-0.5">
                      Размещение строений на участке по пожарным и санитарным нормам; расчёт пожарного отсека (при необходимости).
                    </p>
                  </div>
                  <div className="pl-3 border-l-2 border-amber-300/50 dark:border-stone-300/50">
                    <h3 className="font-serif font-semibold text-foreground text-sm">Общая пояснительная записка</h3>
                  </div>
                </section>
              </article>

              {/* Лист 2: Конструктивные чертежи */}
              <article
                className="relative bg-amber-50/95 dark:bg-stone-100/95 text-foreground rounded-sm border border-amber-200/80 dark:border-stone-300/80 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_6px_16px_rgba(0,0,0,0.12)]"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}
              >
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-amber-700 shadow border-2 border-amber-600/80 flex items-center justify-center no-print">
                  <Pin className="h-4 w-4 text-amber-100 rotate-[-45deg]" aria-hidden />
                </div>
                <section id="additional-works" className="scroll-mt-28 p-5 sm:p-6 pt-8" aria-labelledby="additional-works-heading">
                  <h2 id="additional-works-heading" className="font-serif text-lg font-bold text-foreground mb-2">
                    2. Конструктивные чертежи (без согласования)
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    По желанию заказчика; не требуют согласования в исполкоме.
                  </p>
                  <div className="pl-3 border-l-2 border-amber-300/50 dark:border-stone-300/50 space-y-2 mb-3">
                    <h3 className="font-serif font-semibold text-foreground text-sm">Конструктивные решения</h3>
                    <ul className="space-y-1.5 text-muted-foreground text-sm leading-relaxed">
                      {constructiveSolutions.map((item, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="font-semibold text-accent shrink-0">{item.label}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed pl-3 border-l-2 border-amber-300/50 dark:border-stone-300/50">
                    Обмерочные работы при начатом строительстве или реконструкции.
                  </p>
                </section>
              </article>

              {/* Лист 3: Документы для начала проектирования */}
              <article
                className="relative bg-amber-50/95 dark:bg-stone-100/95 text-foreground rounded-sm border border-amber-200/80 dark:border-stone-300/80 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_6px_16px_rgba(0,0,0,0.12)]"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}
              >
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-amber-700 shadow border-2 border-amber-600/80 flex items-center justify-center no-print">
                  <Pin className="h-4 w-4 text-amber-100 rotate-[-45deg]" aria-hidden />
                </div>
                <section id="documents" className="scroll-mt-28 p-5 sm:p-6 pt-8" aria-labelledby="documents-heading">
                  <h2 id="documents-heading" className="font-serif text-lg font-bold text-foreground mb-2">
                    3. Документы для начала проектирования
                  </h2>
                  <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                    {documentsToPrepare.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <li key={index} className="flex gap-2 items-start">
                          <IconComponent className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span>{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-3 text-xs text-muted-foreground italic">
                    * При реконструкции или начатом строительстве — дополнительные документы.
                  </p>
                </section>
              </article>

              {/* Лист 4: Что понимать */}
              <article
                className="relative bg-amber-50/95 dark:bg-stone-100/95 text-foreground rounded-sm border border-amber-200/80 dark:border-stone-300/80 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_6px_16px_rgba(0,0,0,0.12)]"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}
              >
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-amber-700 shadow border-2 border-amber-600/80 flex items-center justify-center no-print">
                  <Pin className="h-4 w-4 text-amber-100 rotate-[-45deg]" aria-hidden />
                </div>
                <section id="understand" className="scroll-mt-28 p-5 sm:p-6 pt-8" aria-labelledby="understand-heading">
                  <h2 id="understand-heading" className="font-serif text-lg font-bold text-foreground mb-2">
                    4. О чём полезно подумать заранее (совместно с семьёй)
                  </h2>
                  <ul className="space-y-1.5 text-muted-foreground text-sm leading-relaxed">
                    {whatToUnderstand.map((item, index) => (
                      <li key={index} className="flex gap-2 items-start">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </article>
            </div>
          </div>

          {/* Секция «Готовы начать?» — отдельно под доской */}
          <section
            id="cta-section"
            className="scroll-mt-28 mt-10 md:mt-12 container mx-auto px-4 sm:px-6"
            aria-labelledby="cta-heading"
          >
            <div
              id="cta-heading"
              className="rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] p-8 sm:p-10 text-center max-w-2xl mx-auto"
            >
              <Building2 className="h-12 w-12 text-accent mx-auto mb-4 no-print" />
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
                Готовы начать?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto leading-relaxed">
                Свяжитесь с нами, чтобы обсудить ваш проект и получить консультацию.
              </p>
              <p className="hidden print:block print-cta-phone mb-0" aria-hidden>
                <strong>+375 (29) 674-57-73</strong>
              </p>
              <Button asChild size="lg" className="font-semibold no-print">
                <Link to="/#contact">Перейти к контактам</Link>
              </Button>
            </div>
          </section>
          </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientGuidePage;
