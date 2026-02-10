import realProject1 from "@/assets/real-project-1.jpg";
import realProject2 from "@/assets/real-project-2.jpg";
import realProject3 from "@/assets/real-project-3.jpg";
import realProject4 from "@/assets/real-project-4.jpg";
import realProject5 from "@/assets/real-project-5.jpg";
import realProject6 from "@/assets/real-project-6.jpg";
import WatermarkImage from "@/components/WatermarkImage";

const RealProjects = () => {
  const projects = [
    {
      image: realProject1,
      title: "пер. 1 Хвойный д. 3, Могилёв",
      description:
        "Реализованный проект с индивидуальным подходом к планировке и дизайну",
    },
    {
      image: realProject2,
      title: "ул. Земляничная в Могилеве",
      description: "Проект с учетом особенностей участка и пожеланий заказчика",
    },
    {
      image: realProject3,
      title: "ул. Березовая в Могилеве",
      description: "Комплексное решение от проектирования до реализации",
    },
    {
      image: realProject4,
      title: "Реализованный проект в Могилевском районе",
      description: "Двухэтажный дом с мансардной кровлей, построенный по нашему проекту",
    },
    {
      image: realProject5,
      title: "пер. 2-й Хвойный д. 3, Могилёв",
      description: "Двухэтажный дом с гаражом, построенный по нашему проекту",
    },
    {
      image: realProject6,
      title: "Реализованный проект в Могилевском районе",
      description: "Двухэтажный дом с кирпичным фасадом, построенный по нашему проекту",
    },
  ];

  return (
    <section id="real-projects" className="py-24 bg-card scroll-mt-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Реализованные проекты
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Реализованные проекты, которые уже воплощены в жизнь
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <WatermarkImage
                  src={project.image}
                  alt={`${project.title} - реализованный проект дома в Могилеве`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  subtle={true}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-2xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-primary-foreground/90">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealProjects;
