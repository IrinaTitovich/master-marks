import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Building2, Layers, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  // Пока что пустой массив проектов - будет заполнен позже
  const projects: Array<{
    id: string;
    title: string;
    category: string;
    image?: string;
    area?: string;
    description?: string;
  }> = [];

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Заголовок и кнопка назад */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад на главную
            </Button>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Готовые проекты
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Каталог готовых проектов домов
            </p>
          </div>
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
                className="group bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {project.image && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-6">
                  {project.area && (
                    <span className="text-accent font-semibold text-sm mb-2 block">
                      {project.area}
                    </span>
                  )}
                  <h3 className="font-serif text-xl font-bold text-card-foreground mb-2">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-muted-foreground text-sm">
                      {project.description}
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
