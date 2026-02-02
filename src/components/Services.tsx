import {
  PenTool,
  Home,
  Ruler,
  FileText,
  Lightbulb,
  Eye,
  Map,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: PenTool,
      title: "Архитектурное проектирование",
      description: "Разработка внешнего вида и планировки вашего будущего дома",
    },
    {
      icon: Ruler,
      title: "Конструктивные решения",
      description: "Расчет прочности и надежности всех элементов дома",
    },
    {
      icon: FileText,
      title: "Рабочая документация (АР+КР)",
      description: "Полный комплект чертежей для строителей",
    },
    {
      icon: Lightbulb,
      title: "Эскизный проект (концепция)",
      description: "Первоначальная идея и планировка будущего дома",
    },
    {
      icon: Home,
      title: "Реконструкция и перепланировка",
      description: "Улучшение и изменение существующего дома",
    },
  ];

  return (
    <section
      id="services"
      className="pt-12 md:pt-16 pb-24 bg-background scroll-mt-16"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Услуги
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Полный цикл проектирования — от первого эскиза до сдачи объекта
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/services")}
            className="text-base"
          >
            Подробнее об услугах
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card p-5 rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-card-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
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
            onClick={() => (window.location.href = "tel:+375296745773")}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
          >
            <Phone className="mr-2 h-5 w-5" />
            Позвонить
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
