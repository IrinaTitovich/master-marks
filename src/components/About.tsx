import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BadgeCheck,
  Users,
  Building2,
  Target,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const stats = [
    {
      icon: Building2,
      value: "600+",
      label: "Реализованных проектов",
      to: "/projects",
    },
    { icon: Users, value: "20+", label: "Лет опыта" },
    {
      icon: BadgeCheck,
      value: "Аттестат",
      label: "в области проектирования",
      to: "/about",
      state: { openTab: "attestats" },
    },
    { icon: Target, value: "100%", label: "Качество работы" },
  ];

  const fullText = [
    "Профессиональный архитектор-конструктор с более чем 20-летним опытом работы в области проектирования жилых домов и коттеджей.",
    "Каждый проект — это уникальное решение, созданное с учетом индивидуальных пожеланий клиента, особенностей участка и современных строительных технологий.",
    "Специализируюсь на создании функциональных, эстетичных и безопасных конструкций, которые становятся настоящим домом для их владельцев.",
  ];

  const shortText = fullText[0];

  return (
    <section id="about" className="pt-24 pb-12 md:pb-16 bg-card scroll-mt-16">
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
                onClick={toggleExpanded}
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
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => navigate("/about")}
                  className="text-base"
                >
                  Подробнее об архитекторе
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 min-w-0">
            {stats.map((stat, index) => {
              const content = (
                <>
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-accent mb-3 sm:mb-4" />
                  <div className="font-serif text-sm sm:text-2xl md:text-3xl font-bold text-foreground mb-1 sm:mb-2 break-words leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </>
              );
              const className =
                "bg-background p-4 sm:p-6 rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 min-w-0";
              if ("to" in stat) {
                return (
                  <Link
                    key={index}
                    to={stat.to}
                    state={"state" in stat ? stat.state : undefined}
                    className={`${className} block text-foreground no-underline hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg`}
                  >
                    {content}
                  </Link>
                );
              }
              return (
                <div key={index} className={className}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
