import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import readyProject1 from "@/assets/1.jpg";
import readyProject2 from "@/assets/2.jpg";
import readyProject3 from "@/assets/ready-project-section-3.jpg";
import WatermarkImage from "@/components/WatermarkImage";

const ProjectExamples = () => {
  const navigate = useNavigate();

  const categories = [
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
  ];

  const services = [
    "Проектирование индивидуальных жилых домов (коттеджей, садовых домов)",
    "Проектирование хозяйственных построек (баня, гараж, сарай, беседка и прочее)",
    "Проектирование блоков гаражей и других объектов, относящихся к классу сложности К-5 по СТБ 2331-2015",
    "Разработка генерального плана",
    "Согласование проекта в органах исполнительной власти (город Могилев, Могилевский район)",
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate("/projects", { state: { categoryId } });
  };

  return (
    <section id="project-examples" className="py-24 bg-background scroll-mt-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Примеры готовых проектов
            </h2>
          </div>

          {/* Описание услуг с аккордеоном */}
          <div className="mb-16">
            <div className="bg-card rounded-lg shadow-[var(--shadow-soft)] p-8">
              <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-4">
                Оказываем следующие услуги
              </h3>
              
              <div className="text-muted-foreground mb-4">
                <p>
                  Проектирование индивидуальных жилых домов, хозяйственных построек, разработка генерального плана и согласование проектов в органах исполнительной власти города Могилева и Могилевского района.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="services">
                  <AccordionTrigger className="text-accent hover:text-accent/80">
                    Развернуть полный список услуг
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 mt-4">
                      {services.map((service, index) => (
                        <li key={index} className="flex items-start gap-3 text-card-foreground">
                          <span className="text-accent mt-1">•</span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
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
                  <div className="aspect-[4/3] overflow-hidden bg-card flex items-center justify-center">
                    <WatermarkImage
                      src={category.image}
                      alt={category.title}
                      className={`w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ${
                        category.id === "single-story" ? "object-left" : ""
                      }`}
                      subtle={true}
                    />
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
