import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-architecture.jpg";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 sm:py-32 w-full max-w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto w-full">
          {/* Кто мы */}
          <div className="mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 font-semibold mb-2 break-words">
              Архитектор-Конструктор • Могилев, Могилевская область
            </p>
          </div>
          
          {/* Что мы делаем */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-tight break-words">
            Проектирование домов
          </h1>
          
          {/* Для кого - скрыто визуально, но доступно для поисковиков */}
          <p className="sr-only">
            Для владельцев участков, семей и всех, кто мечтает о собственном доме
          </p>
          
          {/* Что мы делаем - детали */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 space-y-3">
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 font-medium break-words">
              Более 20 лет опыта в архитектуре и конструировании
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <span className="inline-flex items-center text-sm sm:text-base text-primary-foreground/80 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
                Индивидуальное проектирование
              </span>
              <span className="inline-flex items-center text-sm sm:text-base text-primary-foreground/80 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
                Готовые проекты
              </span>
            </div>
            <p className="text-base sm:text-lg text-primary-foreground/80 break-words">
              Превращаем ваши идеи в реальность с вниманием к каждой детали
            </p>
          </div>
          
          {/* Что дальше - CTA */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button variant="hero" size="lg" onClick={scrollToContact} className="text-base sm:text-lg px-4 sm:px-8 py-4 sm:py-6 w-full sm:w-auto whitespace-normal">
              Получить бесплатную консультацию
              <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
            </Button>
            <Button variant="heroOutline" size="lg" onClick={() => navigate('/projects')} className="text-base sm:text-lg px-4 sm:px-6 py-4 sm:py-6 w-full sm:w-auto whitespace-normal">
              Выбрать готовый проект
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
