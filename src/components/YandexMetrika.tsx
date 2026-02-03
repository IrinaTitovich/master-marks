import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initYandexMetrika, yandexMetrikaHit } from "@/lib/yandex-metrika";

const COUNTER_ID = import.meta.env.VITE_YANDEX_METRIKA_ID;

/**
 * Компонент инициализации Яндекс.Метрики и отслеживания переходов по страницам (SPA).
 * Рендерить внутри Router. Если VITE_YANDEX_METRIKA_ID не задан — ничего не делает.
 */
export function YandexMetrika() {
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!COUNTER_ID) return;

    if (!initialized.current) {
      initYandexMetrika(COUNTER_ID);
      initialized.current = true;
    }

    yandexMetrikaHit(COUNTER_ID, location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
}
