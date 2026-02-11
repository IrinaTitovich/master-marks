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
  Star,
  MessageSquare,
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
    "Я работаю в Могилеве и Могилевской области. Также выполняю проекты для клиентов из Бобруйска, Орши, Горок, Кричева, Шклова и Могилевского района. Выезжаю на объекты для консультаций и замеров.",
    "Каждый проект — это уникальное решение, созданное с учетом индивидуальных пожеланий клиента, особенностей участка и современных строительных технологий. Специализируюсь на создании функциональных, эстетичных и безопасных конструкций, которые становятся настоящим домом для их владельцев.",
  ];

  const shortText = fullText[0];

  return (
    <section id="about" className="pt-24 pb-12 md:pb-16 bg-card scroll-mt-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Об архитекторе
            </h2>
            <div className="mb-6 max-w-2xl">
              <div className="rounded-xl bg-muted/50 border border-border shadow-sm p-4 md:p-5">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <span className="font-serif text-2xl font-bold text-foreground">
                      5.0
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Средняя оценка в Google
                  </p>
                  <a
                    href="https://www.google.com/search?q=%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82+%D0%BC%D0%BE%D0%B3%D0%B8%D0%BB%D0%B5%D0%B2&rlz=1C1GCEA_enBY1071BY1071&sca_esv=bd96da7b54c85e6e&biw=1920&bih=919&sxsrf=ANbL-n5BTOhSMUgZ8kXTTj0Ec61fox0eOA%3A1770736498787&ei=ckuLabnRL8yNwPAPrd6C0AU&ved=0ahUKEwi50oDAm8-SAxXMBhAIHS2vAFoQ4dUDCBM&uact=5&oq=%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82+%D0%BC%D0%BE%D0%B3%D0%B8%D0%BB%D0%B5%D0%B2&gs_lp=Egxnd3Mtd2l6LXNlcnAiG9C_0YDQvtC10LrRgiDQvNC-0LPQuNC70LXQsjIEECMYJzIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHkjjEVCjClijCnACeAGQAQCYAVWgAVWqAQExuAEDyAEA-AEBmAIDoAJgwgIKEAAYRxjWBBiwA5gDAIgGAZAGCJIHATOgB8kIsgcBMbgHWcIHBTAuMS4yyAcIgAgB&sclient=gws-wiz-serp#lrd=0x46d051e4300295cf:0xc88c0cdba4d373f1,1,,,,"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Отзывы в Google
                  </a>
                </div>
              </div>
            </div>
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
                  <div className="font-serif text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2 break-words leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground break-words">
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
