import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import readyProject1 from "@/assets/1.jpg";
import readyProject2 from "@/assets/2.jpg";
import readyProject3 from "@/assets/3.png";
import WatermarkImage from "@/components/WatermarkImage";

const ProjectExamples = () => {
  const navigate = useNavigate();

  const categories = useMemo(
    () => [
      {
        id: "single-story",
        title: "Одноэтажные дома",
        description: "Комфортные одноэтажные дома для комфортной жизни",
        image: readyProject1,
      },
      {
        id: "two-story",
        title: "Двухэтажные дома",
        description: "Просторные двухэтажные дома для большой семьи",
        image: readyProject2,
      },
      {
        id: "mansard",
        title: "Мансардные дома",
        description: "Экономичные проекты с мансардным этажом",
        image: readyProject3,
      },
    ],
    []
  );

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      navigate("/projects", { state: { categoryId } });
    },
    [navigate]
  );

  return (
    <section
      id="project-examples"
      className="pt-10 pb-14 md:pt-12 md:pb-16 bg-background scroll-mt-16"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                Готовые проекты
              </h2>
              <Badge className="border-accent text-accent text-sm px-3 py-1 font-medium flex items-center gap-1.5">
                <Tag className="h-3 w-3" />
                Скидка
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Выберите готовый проект или закажите индивидуальное проектирование. Проекты адаптируются под участки в Могилеве и других регионах Республики Беларусь и РФ.
            </p>
          </div>

          {/* Карточки категорий */}
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(category.id)}
                  className="group cursor-pointer bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-card flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <WatermarkImage
                        src={category.image}
                        alt={`${category.title} - пример проекта дома в Могилеве`}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        subtle={true}
                        width={800}
                        height={600}
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors font-semibold"
                    >
                      Посмотреть проекты →
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectExamples;
