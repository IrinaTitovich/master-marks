import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Star, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const base = typeof import.meta.env.BASE_URL === "string" ? import.meta.env.BASE_URL : "/";
const heroImageUrl = base + "hero-architecture.jpg";
const heroImageUrlMobile = base + "hero-architecture-mobile.jpg";

declare global {
  interface Window {
    __SKIP_HERO_IMAGE?: boolean;
  }
}

const skipHeroImage = typeof window !== "undefined" && window.__SKIP_HERO_IMAGE === true;

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 scroll-mt-0"
      style={{ contain: "layout style paint" }}
    >
      <div className="absolute inset-0 min-h-[100dvh]">
        {!skipHeroImage && (
          <picture>
            <source media="(max-width: 768px)" srcSet={heroImageUrlMobile} />
            <img
              src={heroImageUrl}
              alt="Архитектурное проектирование домов - профессиональные услуги в Могилеве"
              className="absolute inset-0 w-full h-full object-cover object-center"
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" aria-hidden="true" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 sm:py-32 w-full max-w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto w-full">
          {/* Кто я — без анимации для быстрого FCP/LCP */}
          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 font-semibold mb-4 break-words">
              Архитектор-Конструктор • Могилев, Могилевская область, Беларусь
            </p>
            
            {/* Рейтинг Google */}
            <div className="flex flex-wrap items-center gap-4 mb-4 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-primary-foreground/20">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 fill-accent text-accent"
                    />
                  ))}
                </div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-primary-foreground">
                  5.0
                </span>
                <span className="text-sm sm:text-base text-primary-foreground/80">
                  из 5
                </span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                <span className="text-xs sm:text-sm font-semibold">
                  Больше всех отзывов в Google
                </span>
              </div>
            </div>
          </div>

          {/* Чем занимаюсь */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 sm:mb-8 leading-tight break-words">
            Проектирование домов
          </h1>

          {/* Для кого и целевые запросы — скрыто визуально, доступно для поисковиков */}
          <p className="sr-only">
            Для владельцев участков, семей и всех, кто мечтает о собственном
            доме. Поиск: проект могилев, проектирование могилев, проект дома
            могилев, архитектор могилев.
          </p>

          {/* Детали */}
          <div className="mb-10 sm:mb-12 space-y-4 sm:space-y-5">
            <div className="space-y-0 leading-snug">
              <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 font-medium break-words">
                Более 20 лет опыта в архитектуре и конструировании
              </p>
              <p className="text-base sm:text-lg text-primary-foreground/80 break-words">
                Превращаю ваши идеи в реальность с вниманием к каждой детали
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <span className="inline-flex items-center text-sm sm:text-base text-primary-foreground/80 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
                Индивидуальное проектирование
              </span>
              <span className="inline-flex items-center text-sm sm:text-base text-primary-foreground/80 bg-primary-foreground/10 px-3 py-1.5 rounded-full">
                Готовые проекты
              </span>
            </div>
          </div>

          {/* Что дальше - CTA */}
          <div className="mt-2 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
            <a
              href="tel:+375296745773"
              className="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors bg-accent text-accent-foreground hover:bg-accent/90 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-soft)] hover:scale-105 text-base sm:text-lg px-4 sm:px-8 min-h-[3.25rem] sm:min-h-[3.75rem] w-full sm:w-auto whitespace-normal [&_svg]:shrink-0"
            >
              <Phone className="mr-2 h-5 w-5" />
              Позвонить
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <Button
              variant="heroOutline"
              size="lg"
              onClick={() => navigate("/projects")}
              className="text-base sm:text-lg px-4 sm:px-6 min-h-[3.25rem] sm:min-h-[3.75rem] w-full sm:w-auto whitespace-normal"
            >
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
