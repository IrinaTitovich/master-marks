import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import ProjectExamples from "@/components/ProjectExamples";
import Portfolio from "@/components/Portfolio";
import RealProjects from "@/components/RealProjects";
import Contact from "@/components/Contact";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Прокрутка к секции contact, если перешли с ProjectsCatalog
    if (location.state?.scrollToContact) {
      setTimeout(() => {
        const contactElement = document.getElementById("contact");
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <ProjectExamples />
      <Portfolio />
      <RealProjects />
      <Contact />
      
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Архитектор-Конструктор. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
