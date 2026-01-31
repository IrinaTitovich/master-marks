import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Building2, Layers, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import WatermarkImage from "@/components/WatermarkImage";
import SEO from "@/components/SEO";
import PageNavigation from "@/components/PageNavigation";
import Breadcrumbs from "@/components/Breadcrumbs";

const ProjectsCatalog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Прокрутка вверх при переходе на страницу
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  // Устанавливаем категорию из state при переходе с главной страницы
  useEffect(() => {
    if (location.state?.categoryId) {
      setSelectedCategory(location.state.categoryId);
    }
  }, [location.state]);

  const handleContactClick = () => {
    navigate("/", { state: { scrollToContact: true } });
  };

  const categories = [
    {
      id: "single-story",
      title: "Одноэтажные дома",
      icon: Home,
      description: "Комфортные одноэтажные дома для комфортной жизни",
    },
    {
      id: "two-story",
      title: "Двухэтажные дома",
      icon: Building2,
      description: "Просторные двухэтажные дома для большой семьи",
    },
    {
      id: "mansard",
      title: "Мансардные дома",
      icon: Layers,
      description: "Экономичные проекты с мансардным этажом",
    },
  ];


  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  // Парсим площади из area для badge'ов
  const parseAreas = (areaString?: string) => {
    if (!areaString) return [];
    const areas: { label: string; value: string }[] = [];
    
    // Ищем площади в формате "99,4 м² (1 этаж)" и "23,4 м² (терраса)"
    const matches = areaString.match(/(\d+[.,]\d+)\s*м²\s*\(([^)]+)\)/g);
    if (matches) {
      matches.forEach(match => {
        const valueMatch = match.match(/(\d+[.,]\d+)\s*м²/);
        const labelMatch = match.match(/\(([^)]+)\)/);
        if (valueMatch && labelMatch) {
          areas.push({
            label: labelMatch[1],
            value: valueMatch[1] + ' м²'
          });
        }
      });
    }
    return areas;
  };

  const baseUrl = import.meta.env.BASE_URL || "/";
  const siteUrl = typeof window !== "undefined" ? window.location.origin + baseUrl : "";

  const categoryTitle = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)?.title || "Готовые проекты"
    : "Готовые проекты";

  const seoTitle = selectedCategory
    ? `${categoryTitle} в Могилеве | Каталог Проектов Домов`
    : "Готовые Проекты Домов в Могилеве | Каталог";
  
  const seoDescription = selectedCategory
    ? `Каталог готовых проектов ${categoryTitle.toLowerCase()} в Могилеве и Могилевской области. Выберите проект дома со скидкой или закажите индивидуальное проектирование.`
    : "Каталог готовых проектов домов в Могилеве. Одноэтажные, двухэтажные и мансардные дома. Выберите проект со скидкой или закажите индивидуальное проектирование.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryTitle} - Каталог готовых проектов домов`,
    description: `Каталог готовых проектов домов. ${selectedCategory ? categories.find(c => c.id === selectedCategory)?.description || "" : "Одноэтажные, двухэтажные и мансардные дома."}`,
    url: `${siteUrl}projects`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: filteredProjects.length,
      itemListElement: filteredProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          url: `${siteUrl}projects/${project.id}`
        }
      }))
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Готовые проекты",
        item: `${siteUrl}projects`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <PageNavigation />
      <main id="main-content" role="main" tabIndex={-1}>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={`готовые проекты домов Могилев, ${categoryTitle.toLowerCase()} Могилев, каталог проектов Могилев, проекты домов Могилевская область, архитектурные проекты Могилев`}
        url="/projects"
        canonical="/projects"
        jsonLd={[jsonLd, breadcrumbJsonLd]}
      />
      <div className="container mx-auto px-6 py-12 pt-24">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Готовые проекты" }
          ]}
        />

        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Готовые проекты
            </h1>
            <Badge variant="outline" className="border-accent text-accent text-sm px-3 py-1 font-medium flex items-center gap-1.5">
              <Tag className="h-3 w-3" />
              Скидка
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground mt-2">
            Каталог готовых проектов домов
          </p>
          <p className="text-sm text-muted-foreground/70 mt-3 italic max-w-3xl">
            Проектов очень много. Здесь представлены некоторые из них. Мы рады подобрать вам готовый проект со скидкой или запроектировать индивидуальный под ваши требования.
          </p>
        </div>

        {/* Фильтры по категориям */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              Все проекты
            </Button>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {category.title}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Каталог проектов */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="group bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {project.image && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <WatermarkImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-6">
                  {project.projectNumber && (
                    <span className="text-accent font-semibold text-xs mb-2 block">
                      Проект №{project.projectNumber}
                    </span>
                  )}
                  <h3 className="font-serif text-xl font-bold text-card-foreground mb-2">
                    {project.title}
                  </h3>
                  {project.area && parseAreas(project.area).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {parseAreas(project.area).map((area, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className="bg-accent/10 border-accent/30 text-foreground hover:bg-accent/20 px-2 py-0.5 text-xs font-medium"
                        >
                          <span className="text-muted-foreground mr-1 text-[10px]">{area.label}:</span>
                          <span className="font-semibold">{area.value}</span>
                        </Badge>
                      ))}
                    </div>
                  )}
                  {project.description && (
                    <p className="text-muted-foreground text-sm mb-2">
                      {project.description}
                    </p>
                  )}
                  {project.details && (
                    <p className="text-muted-foreground text-xs line-clamp-3">
                      {project.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">
              Проекты будут добавлены в ближайшее время
            </p>
            <p className="text-muted-foreground">
              Свяжитесь с нами для получения информации о готовых проектах
            </p>
            <Button
              onClick={handleContactClick}
              className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              size="lg"
            >
              Получить консультацию
            </Button>
          </div>
        )}
      </div>
      </main>
    </div>
  );
};

export default ProjectsCatalog;
