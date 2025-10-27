import { Award, Users, Building2, Target } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Building2, value: "150+", label: "Реализованных проектов" },
    { icon: Users, value: "20+", label: "Лет опыта" },
    { icon: Award, value: "50+", label: "Довольных клиентов" },
    { icon: Target, value: "100%", label: "Качество работы" },
  ];

  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Об архитекторе
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Профессиональный архитектор-конструктор с более чем 20-летним опытом работы в области проектирования жилых домов и коттеджей.
              </p>
              <p>
                Каждый проект — это уникальное решение, созданное с учетом индивидуальных пожеланий клиента, особенностей участка и современных строительных технологий.
              </p>
              <p>
                Специализируюсь на создании функциональных, эстетичных и безопасных конструкций, которые становятся настоящим домом для их владельцев.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1"
              >
                <stat.icon className="h-8 w-8 text-accent mb-4" />
                <div className="font-serif text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
