import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Показываем кнопку после прокрутки на 300px
          setIsVisible(window.pageYOffset > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 z-50 rounded-full w-14 h-14 p-0 shadow-2xl hover:shadow-2xl transition-all duration-300 bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-2 border-accent/50 hover:border-accent"
          aria-label="Наверх"
          style={{
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.1)",
          }}
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};

export default ScrollToTop;
