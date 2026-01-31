import { useState } from "react";
import { Award, Users, Building2, Target, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const stats = [
    { icon: Building2, value: "150+", label: "Реализованных проектов" },
    { icon: Users, value: "20+", label: "Лет опыта" },
    { icon: Award, value: "50+", label: "Довольных клиентов" },
    { icon: Target, value: "100%", label: "Качество работы" },
  ];

  const fullText = [
    "Профессиональный архитектор-конструктор с более чем 20-летним опытом работы в области проектирования жилых домов и коттеджей.",
    "Каждый проект — это уникальное решение, созданное с учетом индивидуальных пожеланий клиента, особенностей участка и современных строительных технологий.",
    "Специализируюсь на создании функциональных, эстетичных и безопасных конструкций, которые становятся настоящим домом для их владельцев.",
  ];

  const shortText = fullText[0];

  return (
    <section id="about" className="pt-24 pb-12 md:pb-16 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Об архитекторе
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>{shortText}</p>
              {isExpanded && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  {fullText.slice(1).map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </div>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 text-accent hover:text-accent/80 font-semibold flex items-center gap-2 transition-colors hover:underline"
              >
                {isExpanded ? (
                  <>
                    Свернуть
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Читать дальше
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
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
