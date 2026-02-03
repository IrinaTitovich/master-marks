/**
 * Яндекс.Метрика — инициализация и отправка просмотров для SPA.
 * Счётчик ID задаётся через переменную окружения VITE_YANDEX_METRIKA_ID.
 */

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

const SCRIPT_URL = "https://mc.yandex.ru/metrika/tag.js";

export type YandexMetrikaOptions = {
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  trackHash?: boolean;
};

const defaultOptions: YandexMetrikaOptions = {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true,
  trackHash: false, // для SPA лучше отправлять hit вручную при смене маршрута
};

/**
 * Загружает скрипт Метрики и инициализирует счётчик.
 * Вызывать один раз при старте приложения (в браузере).
 */
export function initYandexMetrika(
  counterId: number | string,
  options: YandexMetrikaOptions = {}
): void {
  if (typeof window === "undefined") return;

  const id =
    typeof counterId === "string" ? parseInt(counterId, 10) : counterId;
  if (!id || Number.isNaN(id)) return;

  const init = () => {
    window.ym =
      window.ym ||
      (function (...args: unknown[]) {
        (window.ym!.a = window.ym!.a || []).push(args);
      } as Window["ym"]);
    window.ym(id, "init", { ...defaultOptions, ...options });
  };

  if (
    document.scripts &&
    Array.from(document.scripts).some((s) => s.src === SCRIPT_URL)
  ) {
    init();
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = SCRIPT_URL;
  script.onload = init;
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(script, first);
}

/**
 * Отправляет просмотр страницы (hit) в Метрику.
 * Вызывать при каждом переходе по маршруту в SPA.
 */
export function yandexMetrikaHit(
  counterId: number | string,
  url?: string
): void {
  if (typeof window === "undefined" || !window.ym) return;

  const id =
    typeof counterId === "string" ? parseInt(counterId, 10) : counterId;
  if (!id || Number.isNaN(id)) return;

  const path =
    url ??
    window.location.pathname + window.location.search + window.location.hash;
  window.ym(id, "hit", path);
}
