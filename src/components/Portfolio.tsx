import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import WatermarkImage from "@/components/WatermarkImage";

const Portfolio = () => {
  const projects = [
    {
      image: project1,
      title: "Квартира по ул.Пысина в Могилеве",
      description: "Проект квартиры с современной планировкой и функциональным дизайном",
      area: "250 м²",
    },
    {
      image: project2,
      title: "Дизайн-проект квартиры в Могилеве",
      area: "320 м²",
      description: "Индивидуальный дизайн-проект с продуманной планировкой и стильным интерьером",
    },
    {
      image: project3,
      title: "Дизайн-проект жилого дома",
      description: "Комплексный проект частного дома с архитектурным и дизайнерским решением",
      area: "450 м²",
    },
  ];

  return (
    <section id="portfolio" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Портфолио
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Избранные проекты, реализованные за последние годы
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
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  subtle={true}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-accent font-semibold">{project.area}</span>
                  </div>
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

export default Portfolio;
