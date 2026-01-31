import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { projects } from "@/data/projects";
import WatermarkImage from "@/components/WatermarkImage";
import SEO from "@/components/SEO";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const project = projects.find((p) => p.id === id);

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

  const handleWantThis = () => {
    navigate("/", { 
      state: { 
        scrollToContact: true,
        prefillMessage: `Хочу такой проект: ${project.title}`
      } 
    });
  };

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

  const areas = parseAreas(project.area);

  const baseUrl = import.meta.env.BASE_URL || "/";
  const siteUrl = typeof window !== "undefined" ? window.location.origin + baseUrl : "";
  const projectUrl = `${siteUrl}projects/${project.id}`;
  const projectImage = project.image || project.images?.[0] || "/placeholder.svg";
  const projectImageUrl = projectImage.startsWith("http") 
    ? projectImage 
    : `${siteUrl}${projectImage.replace(/^\//, "")}`;

  const categoryNames: Record<string, string> = {
    "single-story": "Одноэтажные дома",
    "two-story": "Двухэтажные дома",
    "mansard": "Мансардные дома"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": projectUrl,
    name: project.title,
    description: project.description || `Проект дома ${project.projectNumber || project.id}`,
    image: project.images?.map(img => img.startsWith("http") ? img : `${siteUrl}${img.replace(/^\//, "")}`) || [projectImageUrl],
    url: projectUrl,
    creator: {
      "@type": "Organization",
      name: "Ваш проект - Проектирование домов"
    },
    about: {
      "@type": "Thing",
      name: categoryNames[project.category] || "Проектирование домов"
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
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${project.title} - Готовый проект дома в Могилеве | Ваш проект`}
        description={`${project.description || `Проект дома ${project.projectNumber || project.id}`} в Могилеве, Могилевской области. ${project.area || ""} ${categoryNames[project.category] || ""}`}
        keywords={`${project.title} Могилев, проект дома ${project.projectNumber || ""} Могилев, ${categoryNames[project.category] || ""} Могилев, готовый проект Могилев, архитектурный проект Могилевская область`}
        image={projectImageUrl}
        url={`/projects/${project.id}`}
        canonical={`/projects/${project.id}`}
        jsonLd={[jsonLd, breadcrumbJsonLd]}
      />
      <div className="container mx-auto px-6 py-12">
        {/* Шапка с брендом и кнопкой назад */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/projects")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к каталогу
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

        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="mb-8">
            {project.projectNumber && (
              <span className="text-accent font-semibold text-sm mb-2 block">
                Проект №{project.projectNumber}
              </span>
            )}
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            {areas.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {areas.map((area, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="bg-accent/10 border-accent/30 text-foreground hover:bg-accent/20 px-3 py-1 text-sm font-medium"
                  >
                    <span className="text-muted-foreground mr-1">{area.label}:</span>
                    <span className="font-semibold">{area.value}</span>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Изображения */}
          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <div className="grid md:grid-cols-3 gap-4">
                {project.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className="aspect-[4/3] overflow-hidden rounded-lg shadow-[var(--shadow-soft)] cursor-pointer hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group"
                  >
                    <WatermarkImage
                      src={img}
                      alt={`${project.title} - изображение ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Модальное окно для увеличенного просмотра */}
          <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
            <DialogContent className="max-w-7xl w-full p-0 bg-transparent border-none [&>button]:hidden">
              {selectedImage && (
                <>
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="fixed top-4 right-4 z-[60] bg-black/70 hover:bg-black/90 text-white rounded-full h-10 w-10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </DialogClose>
                  <WatermarkImage
                    src={selectedImage}
                    alt={`${project.title} - увеличенное изображение`}
                    className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                  />
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Описание и детали */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] p-8">
                <h2 className="font-serif text-2xl font-bold text-card-foreground mb-6">
                  Описание проекта
                </h2>
                {project.description && (
                  <div className="text-card-foreground text-lg leading-relaxed space-y-4">
                    <p className="whitespace-pre-line">{project.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Боковая панель */}
            <div>
              <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] p-6 sticky top-6">
                <h3 className="font-serif text-xl font-bold text-card-foreground mb-4">
                  Хотите этот проект?
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Свяжитесь с нами, и мы обсудим детали реализации этого проекта для вас.
                </p>
                <Button
                  onClick={handleWantThis}
                  className="w-full mb-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                >
                  Оставить заявку
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "tel:+375296745773"}
                  className="w-full mb-2"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Позвонить
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "mailto:vashproekt.by@gmail.com"}
                  className="w-full"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Написать
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
