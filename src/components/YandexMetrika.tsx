import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { yandexMetrikaHit } from "@/lib/yandex-metrika";

const COUNTER_ID = import.meta.env.VITE_YANDEX_METRIKA_ID;

/**
 * Отправляет в Метрику просмотр страницы при каждом переходе по маршруту (SPA).
 * Первый просмотр отправляется при инициализации в yandex-metrika.ts.
 */
export function YandexMetrika() {
  const location = useLocation();
  const prevKey = useRef<string | null>(null);

  useEffect(() => {
    if (!COUNTER_ID) return;
    const key = location.pathname + location.search + location.hash;
    // Отправляем hit только при смене маршрута (первый просмотр уже отправлен в init)
    if (prevKey.current !== null && prevKey.current !== key) {
      yandexMetrikaHit(COUNTER_ID, key);
    }
    prevKey.current = key;
  }, [location.pathname, location.search, location.hash]);

  return null;
}
