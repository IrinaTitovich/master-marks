import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const PageNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    // Устанавливаем начальное состояние в зависимости от текущего URL
    return location.pathname === "/services" ? "services" : "hero";
  });

  const sections: Array<{
    id: string;
    label: string;
    isLocation?: boolean;
    isPage?: boolean;
    path?: string;
    isSection?: boolean; // Секция на главной странице
  }> = [
    { id: "hero", label: "Главная", isSection: true },
    { id: "about", label: "О нас", isSection: true },
    { id: "services", label: "Услуги", isPage: true, path: "/services" },
    { id: "project-examples", label: "Проекты", isSection: true },
    { id: "contact", label: "Контакты", isSection: true },
    { id: "location", label: "Локация", isLocation: true },
  ];

  useEffect(() => {
    // Проверяем текущий URL для выделения страницы услуг
    if (location.pathname === "/services") {
      setActiveSection("services");
      return;
    }

    // Если мы на главной странице, обрабатываем скролл
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        // Пропускаем location и страницы, так как это не реальные секции
        if (sections[i].isLocation || sections[i].isPage) continue;
        
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    // Только на главной странице добавляем обработчик скролла
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname]);

  const scrollToSection = (sectionId: string, isLocation?: boolean, isPage?: boolean, path?: string, isSection?: boolean) => {
    if (isPage && path) {
      // Для страниц переходим по маршруту
      navigate(path);
      setIsOpen(false);
      return;
    }

    if (isLocation) {
      // Для локации: если на главной - прокручиваем к контактам и открываем карту, иначе переходим на главную
      if (location.pathname === "/") {
        const contactElement = document.getElementById("contact");
        if (contactElement) {
          const offset = 80;
          const elementPosition = contactElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          
          // Открываем карту через событие
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("openLocationMap"));
          }, 500);
        }
      } else {
        // Переходим на главную и открываем карту
        navigate("/", { state: { scrollToContact: true, openMap: true } });
      }
      setIsOpen(false);
      return;
    }

    // Для секций на главной странице
    if (isSection) {
      if (location.pathname === "/") {
        // Если на главной - прокручиваем к секции
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        // Если на другой странице - переходим на главную с указанием секции
        navigate("/", { state: { scrollToSection: sectionId } });
      }
      setIsOpen(false);
      return;
    }

    // Fallback для других случаев
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/85 backdrop-blur-sm border-b border-primary-foreground/20 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <div className="flex items-center">
            <button
              onClick={() => {
                if (location.pathname === "/") {
                  scrollToSection("hero");
                } else {
                  navigate("/");
                }
              }}
              className="font-serif text-lg font-bold text-primary-foreground hover:text-accent transition-colors"
            >
              Ваш проект
            </button>
          </div>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id, section.isLocation, section.isPage, section.path, section.isSection)}
                className={`rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  section.id === "services"
                    ? activeSection === section.id
                      ? "bg-accent text-accent-foreground px-4 py-2.5 text-base font-bold shadow-lg"
                      : "bg-accent/20 text-accent px-4 py-2.5 text-base font-bold hover:bg-accent/30 hover:shadow-md"
                    : activeSection === section.id
                      ? "bg-accent text-accent-foreground px-3 py-2 text-sm"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 text-sm"
                }`}
              >
                {section.isLocation && <MapPin className="h-4 w-4" />}
                {section.label}
              </button>
            ))}
          </div>

          {/* Мобильное меню - кнопка */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-primary-foreground hover:text-accent transition-colors"
            aria-label="Меню"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Мобильное меню - выпадающий список */}
        {isOpen && (
          <div className="md:hidden border-t border-primary-foreground/20 py-4 bg-primary/85">
            <div className="flex flex-col gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id, section.isLocation, section.isPage, section.path, section.isSection)}
                  className={`px-4 py-3 rounded-lg text-left transition-all flex items-center gap-2 ${
                    section.id === "services"
                      ? activeSection === section.id
                        ? "bg-accent text-accent-foreground font-bold text-base shadow-lg"
                        : "bg-accent/20 text-accent font-bold text-base hover:bg-accent/30"
                      : activeSection === section.id
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 font-medium"
                  }`}
                >
                  {section.isLocation && <MapPin className="h-4 w-4" />}
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PageNavigation;
