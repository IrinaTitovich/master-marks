import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Lazy loading для UI компонентов, которые не критичны для первоначальной отрисовки
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
const TooltipProvider = lazy(() => import("@/components/ui/tooltip").then(m => ({ default: m.TooltipProvider })));

// Lazy loading для страниц для улучшения производительности
const Index = lazy(() => import("./pages/Index"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ProjectsCatalog = lazy(() => import("./pages/ProjectsCatalog"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const AboutArchitectPage = lazy(() => import("./pages/AboutArchitectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Компонент загрузки
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
      <p className="text-muted-foreground">Загрузка...</p>
    </div>
  </div>
);

const App = () => (
  <BrowserRouter 
    basename={import.meta.env.BASE_URL}
    future={{
      v7_startTransition: true,
    }}
  >
    <ScrollToTop />
    <Suspense fallback={<PageLoader />}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsCatalog />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<AboutArchitectPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </Suspense>
  </BrowserRouter>
);

export default App;
