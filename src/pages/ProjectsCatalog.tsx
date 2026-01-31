import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Building2, Layers, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import WatermarkImage from "@/components/WatermarkImage";
import SEO from "@/components/SEO";

const ProjectsCatalog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
      <SEO
        title={`${categoryTitle} - Каталог готовых проектов домов в Могилеве | Ваш проект`}
        description={`Каталог готовых проектов домов в Могилеве, Могилевской области. ${selectedCategory ? categories.find(c => c.id === selectedCategory)?.description || "" : "Одноэтажные, двухэтажные и мансардные дома. Профессиональное проектирование."}`}
        keywords={`готовые проекты домов Могилев, ${categoryTitle.toLowerCase()} Могилев, каталог проектов Могилев, проекты домов Могилевская область, архитектурные проекты Могилев`}
        url="/projects"
        canonical="/projects"
        jsonLd={[jsonLd, breadcrumbJsonLd]}
      />
      <div className="container mx-auto px-6 py-12">
        {/* Шапка с брендом и кнопкой назад */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад на главную
          </Button>
          <div className="text-right">
            <div className="font-serif text-xl font-bold text-foreground mb-1">
              Ваш проект
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              Проектирование домов
            </div>
            <a 
              href="tel:+375296745773"
              className="text-accent hover:text-accent/80 font-semibold text-sm flex items-center justify-end gap-1 transition-colors"
            >
              <Phone className="h-4 w-4" />
              +375 (29) 674-57-73
            </a>
          </div>
        </div>

        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Готовые проекты
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Каталог готовых проектов домов
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
              className="mt-6"
            >
              Связаться с нами
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsCatalog;
