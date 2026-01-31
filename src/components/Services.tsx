import { PenTool, Home, Ruler, FileText, MessageCircle, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const services = [
    {
      icon: PenTool,
      title: "Архитектурное проектирование",
      description: "Разработка концепции и архитектурного проекта с учетом всех ваших пожеланий и особенностей участка.",
    },
    {
      icon: Ruler,
      title: "Конструктивные решения",
      description: "Полный расчет конструкций, обеспечивающий надежность и безопасность вашего дома.",
    },
    {
      icon: Home,
      title: "Проектирование коттеджей",
      description: "Индивидуальные проекты загородных домов от небольших дач до просторных особняков.",
    },
    {
      icon: FileText,
      title: "Рабочая документация",
      description: "Полный комплект чертежей и спецификаций для строительства и получения разрешений.",
    },
    {
      icon: MessageCircle,
      title: "Консультации по проектированию",
      description: "Профессиональные консультации на всех этапах: выбор проекта, адаптация под участок, оптимизация планировки и решение технических вопросов.",
    },
    {
      icon: Settings,
      title: "Авторский надзор",
      description: "Контроль соответствия строительства проектной документации на всех этапах работ.",
    },
  ];

  return (
    <section id="services" className="pt-12 md:pt-16 pb-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Услуги
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Полный цикл проектирования — от первого эскиза до сдачи объекта
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card p-8 rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-card-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Готовы начать работу над вашим проектом?
          </p>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
          >
            Получить бесплатную консультацию
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
