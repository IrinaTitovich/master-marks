import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { yandexMetrikaHit } from "@/lib/yandex-metrika";

const COUNTER_ID = import.meta.env.VITE_YANDEX_METRIKA_ID;

/**
 * Отправляет в Метрику просмотр страницы при каждом переходе по маршруту (SPA).
 * Инициализация счётчика выполняется в main.tsx при загрузке страницы.
 */
export function YandexMetrika() {
  const location = useLocation();

  useEffect(() => {
    if (!COUNTER_ID) return;
    yandexMetrikaHit(COUNTER_ID, location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
}
