import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MapPin, Phone } from "lucide-react";

const PageNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    // Устанавливаем начальное состояние в зависимости от текущего URL
    if (location.pathname === "/services") return "services";
    if (
      location.pathname === "/projects" ||
      location.pathname.startsWith("/projects/")
    )
      return "projects";
    if (location.pathname === "/about") return "about-page";
    if (location.pathname === "/client-guide") return "client-guide";
    return "hero";
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
    { id: "about-page", label: "Об архитекторе", isPage: true, path: "/about" },
    { id: "services", label: "Услуги", isPage: true, path: "/services" },
    {
      id: "client-guide",
      label: "Памятка заказчику",
      isPage: true,
      path: "/client-guide",
    },
    {
      id: "projects",
      label: "Готовые проекты",
      isPage: true,
      path: "/projects",
    },
    { id: "contact", label: "Контакты", isSection: true },
    { id: "location", label: "Локация", isLocation: true },
  ];

  useEffect(() => {
    // Проверяем текущий URL для выделения страниц
    if (location.pathname === "/services") {
      setActiveSection("services");
      return;
    }

    if (
      location.pathname === "/projects" ||
      location.pathname.startsWith("/projects/")
    ) {
      setActiveSection("projects");
      return;
    }

    if (location.pathname === "/about") {
      setActiveSection("about-page");
      return;
    }

    if (location.pathname === "/client-guide") {
      setActiveSection("client-guide");
      return;
    }

    // Если открыта главная страница, обрабатываем скролл
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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
          ticking = false;
        });
        ticking = true;
      }
    };

    // Только на главной странице добавляем обработчик скролла
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname]);

  const scrollToSection = (
    sectionId: string,
    isLocation?: boolean,
    isPage?: boolean,
    path?: string,
    isSection?: boolean
  ) => {
    if (isPage && path) {
      // Для страниц переходим по маршруту
      navigate(path);
      setIsOpen(false);
      return;
    }

    if (isLocation) {
      const requestOpenMap = () => {
        try {
          sessionStorage.setItem("openLocationMap", "1");
        } catch {
          (
            window as unknown as { __pendingOpenLocationMap?: boolean }
          ).__pendingOpenLocationMap = true;
        }
        window.dispatchEvent(new CustomEvent("openLocationMap"));
      };

      if (location.pathname === "/") {
        requestOpenMap();
        setTimeout(requestOpenMap, 800);
      } else {
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
    <nav
      id="navigation"
      role="navigation"
      aria-label="Основная навигация"
      className="fixed top-0 left-0 right-0 z-50 bg-primary/85 backdrop-blur-sm border-b border-primary-foreground/20 shadow-sm transition-all duration-300 overflow-visible"
    >
      <div className="container mx-auto px-4 sm:px-6 overflow-visible">
        <div className="flex items-center justify-between min-h-16 py-2 overflow-visible">
          {/* Логотип */}
          <div className="flex flex-col items-start">
            <button
              onClick={() => {
                if (location.pathname === "/") {
                  scrollToSection("hero");
                } else {
                  navigate("/");
                }
              }}
              className="font-sans text-lg font-semibold text-primary-foreground hover:text-accent transition-colors antialiased"
            >
              <span className="text-accent">Ваш</span>{" "}
              <span className="font-bold tracking-tight">Проект</span>
            </button>
            <a
              href="tel:+375296745773"
              className="text-primary-foreground/80 hover:text-accent text-xs font-semibold flex items-center gap-1 transition-colors mt-0.5"
            >
              <Phone className="h-3 w-3" />
              +375 (29) 674-57-73
            </a>
          </div>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center gap-1 overflow-visible">
            {sections.map((section) => (
              <button
                type="button"
                key={section.id}
                onClick={() =>
                  scrollToSection(
                    section.id,
                    section.isLocation,
                    section.isPage,
                    section.path,
                    section.isSection
                  )
                }
                className={`relative rounded-lg font-medium transition-all flex items-center gap-1.5 px-3 py-2 text-sm overflow-visible ${
                  activeSection === section.id
                    ? "bg-accent text-accent-foreground"
                    : section.id === "services"
                    ? "text-accent hover:text-accent/80 hover:bg-primary-foreground/10"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {section.isLocation && <MapPin className="h-4 w-4" />}
                {section.id === "location" && location.pathname === "/"
                  ? "Могилев, Беларусь"
                  : section.label}
              </button>
            ))}
          </div>

          {/* Мобильное меню - кнопка */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-primary-foreground hover:text-accent transition-colors"
            aria-label="Меню"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
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
                  type="button"
                  key={section.id}
                  onPointerDown={(e) => {
                    if (section.isLocation && e.pointerType === "touch") {
                      e.preventDefault();
                      scrollToSection(
                        section.id,
                        section.isLocation,
                        section.isPage,
                        section.path,
                        section.isSection
                      );
                    }
                  }}
                  onClick={() =>
                    scrollToSection(
                      section.id,
                      section.isLocation,
                      section.isPage,
                      section.path,
                      section.isSection
                    )
                  }
                  role="menuitem"
                  aria-current={
                    activeSection === section.id ? "page" : undefined
                  }
                  className={`relative px-4 py-3 rounded-lg text-left transition-all flex items-center gap-2 font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary ${
                    activeSection === section.id
                      ? "bg-accent text-accent-foreground"
                      : section.id === "services"
                      ? "text-accent hover:text-accent/80 hover:bg-primary-foreground/10"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  {section.isLocation && <MapPin className="h-4 w-4" />}
                  {section.id === "location" && location.pathname === "/"
                    ? "Могилев, Беларусь"
                    : section.label}
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
