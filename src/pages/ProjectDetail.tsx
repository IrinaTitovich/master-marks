import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { projects, Project } from "@/data/projects";
import WatermarkImage from "@/components/WatermarkImage";
import SEO from "@/components/SEO";
import PageNavigation from "@/components/PageNavigation";
import Breadcrumbs from "@/components/Breadcrumbs";

// Выносим categoryNames за пределы компонента для стабильности зависимостей
const categoryNames: Record<string, string> = {
  "single-story": "Одноэтажные дома",
  "two-story": "Двухэтажные дома",
  mansard: "Мансардные дома",
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Прокрутка вверх при переходе на страницу
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  // Сброс слайдера на первый слайд при переходе на другой проект
  useEffect(() => {
    if (api && id) {
      api.scrollTo(0);
      setCurrent(1);
    }
  }, [id, api]);

  // Отслеживание текущего слайда
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const project = projects.find((p) => p.id === id);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const siteUrl =
    typeof window !== "undefined" ? window.location.origin + baseUrl : "";

  // Парсим площади из area для badge'ов - мемоизируем для оптимизации
  // Всегда вызываем useMemo, даже если project undefined
  const areas = useMemo(() => {
    if (!project?.area) return [];
    const areaString = project.area;
    const areas: { label: string; value: string }[] = [];

    // Ищем площади в формате "99,4 м² (1 этаж)" и "23,4 м² (терраса)"
    const matches = areaString.match(/(\d+[.,]\d+)\s*м²\s*\(([^)]+)\)/g);
    if (matches) {
      matches.forEach((match) => {
        const valueMatch = match.match(/(\d+[.,]\d+)\s*м²/);
        const labelMatch = match.match(/\(([^)]+)\)/);
        if (valueMatch && labelMatch) {
          areas.push({
            label: labelMatch[1],
            value: valueMatch[1] + " м²",
          });
        }
      });
    }
    return areas;
  }, [project]);

  // Получаем связанные проекты (из той же категории, исключая текущий) - мемоизируем для оптимизации
  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return projects
      .filter((p) => p.category === project.category && p.id !== project.id)
      .slice(0, 3);
  }, [project]);

  const projectUrl = project ? `${siteUrl}projects/${project.id}` : "";
  const projectImage =
    project?.image || project?.images?.[0] || "/placeholder.svg";
  const projectImageUrl = projectImage.startsWith("http")
    ? projectImage
    : `${siteUrl}${projectImage.replace(/^\//, "")}`;

  // Мемоизируем вычисления для JSON-LD для оптимизации
  const jsonLd = useMemo(() => {
    if (!project) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": projectUrl,
      name: project.title,
      description:
        project.description ||
        `Проект дома ${project.projectNumber || project.id}`,
      image: project.images?.map((img) =>
        img.startsWith("http") ? img : `${siteUrl}${img.replace(/^\//, "")}`
      ) || [projectImageUrl],
      url: projectUrl,
      category: categoryNames[project.category] || "Проектирование домов",
      brand: {
        "@type": "Brand",
        name: "Ваш проект - Проектирование домов",
      },
      manufacturer: {
        "@type": "Organization",
        name: "Ваш проект - Проектирование домов",
        address: [
          {
            "@type": "PostalAddress",
            addressLocality: "Могилев",
            addressRegion: "Могилевская область",
            streetAddress: "пер. 1 Хвойный д. 3",
            addressCountry: "BY",
          },
          {
            "@type": "PostalAddress",
            addressLocality: "Могилев",
            addressRegion: "Могилевская область",
            streetAddress: "ул. Первомайская д. 31",
            addressCountry: "BY",
          },
        ],
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "BYN",
        url: projectUrl,
        seller: {
          "@type": "Organization",
          name: "Ваш проект - Проектирование домов",
        },
      },
      additionalProperty: project.area
        ? [
            {
              "@type": "PropertyValue",
              name: "Площадь",
              value: project.area,
            },
          ]
        : [],
    };
  }, [project, projectUrl, projectImageUrl, siteUrl]);

  const breadcrumbJsonLd = useMemo(() => {
    if (!project) return null;
    return {
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
          name: "Готовые проекты",
          item: `${siteUrl}projects`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: projectUrl,
        },
      ],
    };
  }, [project, projectUrl, siteUrl]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Проект не найден</h1>
          <Button onClick={() => navigate("/projects")}>
            Вернуться к каталогу
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageNavigation />
      <main id="main-content" role="main" tabIndex={-1}>
        <SEO
          title={`${project.title} - Готовый проект дома в Могилеве | Ваш проект`}
          description={`${
            project.description ||
            `Проект дома ${project.projectNumber || project.id}`
          } в Могилеве, Могилевской области. ${project.area || ""} ${
            categoryNames[project.category] || ""
          }`}
          keywords={`${project.title} Могилев, проект дома ${
            project.projectNumber || ""
          } Могилев, ${
            categoryNames[project.category] || ""
          } Могилев, готовый проект Могилев, архитектурный проект Могилевская область`}
          image={projectImageUrl}
          url={`/projects/${project.id}`}
          canonical={`/projects/${project.id}`}
          jsonLd={jsonLd && breadcrumbJsonLd ? [jsonLd, breadcrumbJsonLd] : []}
        />
        <div className="container mx-auto px-6 py-12 pt-24">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: "Готовые проекты", href: "/projects" },
                { label: project.title },
              ]}
            />

            {/* Заголовок */}
            <div className="mb-8">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                {project.title}
              </h1>
              {areas.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {areas.map((area, index) => (
                    <Badge
                      key={index}
                      className="bg-accent/10 border-accent/30 text-foreground hover:bg-accent/20 px-3 py-1 text-sm font-medium"
                    >
                      <span className="text-muted-foreground mr-1">
                        {area.label}:
                      </span>
                      <span className="font-semibold">{area.value}</span>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Основной контент: слайдер слева, описание и CTA справа */}
            <div className="grid lg:grid-cols-3 gap-4 lg:gap-8 mb-8">
              {/* Левая колонка: Слайдер изображений */}
              {project.images && project.images.length > 0 && (
                <div className="lg:col-span-2 order-1">
                  <Carousel setApi={setApi} className="w-full">
                    <CarouselContent>
                      {project.images.map((img, index) => {
                        const isSpecialProject = project.id === "project-350" || project.id === "project-333";
                        const isProjectWithRotatedPlans = project.id === "project-244" || project.id === "project-245" || project.id === "project-251" || project.id === "project-321" || project.id === "project-307" || project.id === "project-282";
                        const isSecondImage = isSpecialProject && index === 1;
                        const isNonFirstImage = isProjectWithRotatedPlans && index > 0;
                        return (
                          <CarouselItem key={index}>
                            <div
                              onClick={() => setSelectedImage(img)}
                              className={`rounded-lg shadow-[var(--shadow-soft)] cursor-pointer hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group flex items-center justify-center bg-muted/20 ${
                                isSpecialProject || isProjectWithRotatedPlans
                                  ? (isSecondImage || isNonFirstImage)
                                    ? "p-2 min-h-[250px] md:min-h-[350px] lg:min-h-[500px]" 
                                    : "aspect-[4/3] overflow-hidden"
                                  : "aspect-[4/3] overflow-hidden"
                              }`}
                            >
                              <WatermarkImage
                                src={img}
                                alt={`${project.title} - изображение ${index + 1}`}
                                className={`group-hover:scale-110 transition-transform duration-500 ${
                                  isSpecialProject || isProjectWithRotatedPlans
                                    ? (isSecondImage || isNonFirstImage)
                                      ? "w-full h-auto max-w-full object-contain rotate-[-90deg] scale-75"
                                      : "w-full h-auto max-w-full object-contain"
                                    : "w-full h-full object-cover"
                                }`}
                              />
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    {project.images.length > 1 && (
                      <>
                        <CarouselPrevious className="left-1 lg:left-4 h-10 w-10 lg:h-12 lg:w-12" />
                        <CarouselNext className="right-1 lg:right-4 h-10 w-10 lg:h-12 lg:w-12" />
                      </>
                    )}
                    {/* Индикаторы слайдов */}
                    {project.images.length > 1 && (
                      <div className="flex justify-center gap-2 mt-2 lg:mt-4">
                        {project.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-2 rounded-full transition-all ${
                              current === index + 1
                                ? "w-8 bg-accent"
                                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                            }`}
                            aria-label={`Перейти к слайду ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </Carousel>
                </div>
              )}

              {/* Правая колонка: Описание и CTA */}
              <div className="lg:col-span-1 order-2 space-y-6 lg:space-y-8">
                {/* Описание проекта */}
                <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] p-8">
                  <h2 className="font-serif text-2xl font-bold text-card-foreground mb-6">
                    Описание проекта
                  </h2>
                  {project.description && (
                    <div className="text-card-foreground text-lg leading-relaxed space-y-4">
                      <p className="whitespace-pre-line">
                        {project.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Боковая панель CTA */}
                <div className="lg:sticky lg:top-6">
                  <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] p-6 border-2 border-accent/20">
                    <h3 className="font-serif text-xl font-bold text-card-foreground mb-2">
                      Заинтересовал этот проект?
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Позвоните для консультации и расчёта стоимости адаптации
                      проекта под ваш участок
                    </p>
                    <div className="mb-6 space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        <span>Бесплатная консультация</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        <span>Адаптация под ваш участок</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        <span>Расчет стоимости проекта</span>
                      </div>
                    </div>
                    <a
                      href="tel:+375296745773"
                      className="inline-flex items-center justify-center gap-2 w-full mb-3 h-11 rounded-md py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all text-base [&_svg]:shrink-0"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Позвонить для консультации
                    </a>
                    <a
                      href="mailto:vashproekt.by@gmail.com"
                      className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors [&_svg]:shrink-0"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Написать на email
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Модальное окно для увеличенного просмотра */}
            <Dialog
              open={selectedImage !== null}
              onOpenChange={(open) => !open && setSelectedImage(null)}
            >
              <DialogContent className="fixed inset-0 left-0 top-0 right-0 bottom-0 max-w-none w-auto p-0 bg-transparent border-none shadow-none flex items-center justify-center [&>button:not(.image-dialog-close)]:hidden translate-x-0 translate-y-0">
                {selectedImage && (
                  <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center p-4">
                    <WatermarkImage
                      src={selectedImage}
                      alt={`${project.title} - увеличенное изображение`}
                      className={`w-full h-auto max-h-[90vh] object-contain rounded-lg ${
                        ((project.id === "project-350" || project.id === "project-333") && project.images.indexOf(selectedImage) === 1) ||
                        ((project.id === "project-244" || project.id === "project-245" || project.id === "project-251" || project.id === "project-321" || project.id === "project-307" || project.id === "project-282") && project.images.indexOf(selectedImage) > 0)
                          ? "rotate-[-90deg]"
                          : ""
                      }`}
                    />
                    <DialogClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="image-dialog-close absolute top-2 right-2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full h-10 w-10 shrink-0"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </DialogClose>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Связанные проекты */}
            {relatedProjects.length > 0 && (
              <div className="mt-16 pt-16 border-t border-border">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
                  Похожие проекты
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedProjects.map((relatedProject) => (
                    <div
                      key={relatedProject.id}
                      onClick={() => navigate(`/projects/${relatedProject.id}`)}
                      className="group bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 overflow-hidden cursor-pointer"
                    >
                      {relatedProject.image && (
                        <div className="aspect-[4/3] overflow-hidden">
                          <WatermarkImage
                            src={relatedProject.image}
                            alt={relatedProject.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-serif text-xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                          {relatedProject.title}
                        </h3>
                        {relatedProject.area && (
                          <p className="text-sm text-muted-foreground mb-4">
                            {relatedProject.area}
                          </p>
                        )}
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/projects/${relatedProject.id}`);
                          }}
                        >
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
