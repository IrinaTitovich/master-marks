import { useEffect } from "react";

/**
 * Компонент Skip Links для улучшения доступности
 * Позволяет пользователям с клавиатурой быстро перейти к основному контенту
 */
const SkipLinks = () => {
  useEffect(() => {
    // Обработка нажатия клавиши для skip links
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        // Фокус на первом skip link при первой навигации Tab
        const skipLinks = document.querySelectorAll<HTMLAnchorElement>('.skip-link');
        if (skipLinks.length > 0 && document.activeElement === document.body) {
          skipLinks[0].focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const skipToMain = () => {
    const main = document.querySelector('main') || document.querySelector('#main-content') || document.querySelector('[role="main"]');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const skipToNav = () => {
    const nav = document.querySelector('nav') || document.querySelector('[role="navigation"]');
    if (nav) {
      (nav as HTMLElement).focus();
      nav.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const skipToContact = () => {
    const contact = document.getElementById('contact');
    if (contact) {
      contact.focus();
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="skip-links-container" aria-label="Быстрые ссылки">
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        onClick={(e) => {
          e.preventDefault();
          skipToMain();
        }}
      >
        Перейти к основному контенту
      </a>
      <a
        href="#navigation"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        onClick={(e) => {
          e.preventDefault();
          skipToNav();
        }}
      >
        Перейти к навигации
      </a>
      <a
        href="#contact"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        onClick={(e) => {
          e.preventDefault();
          skipToContact();
        }}
      >
        Перейти к контактам
      </a>
    </div>
  );
};

export default SkipLinks;
