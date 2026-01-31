import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="404 - Страница не найдена | Ваш проект"
        description="Запрашиваемая страница не найдена. Вернитесь на главную страницу или просмотрите каталог готовых проектов домов."
        url="/404"
        canonical="/404"
      />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-gray-600">Страница не найдена</p>
          <a href="/" className="text-blue-500 underline hover:text-blue-700">
            Вернуться на главную
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
