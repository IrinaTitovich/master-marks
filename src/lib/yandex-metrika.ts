/**
 * Яндекс.Метрика — инициализация и отправка просмотров для SPA.
 * Счётчик ID задаётся через переменную окружения VITE_YANDEX_METRIKA_ID.
 */

declare global {
  interface Window {
    ym?: ((id: number, method: string, ...args: unknown[]) => void) & {
      a?: unknown[];
    };
  }
}

const SCRIPT_BASE = "https://mc.yandex.ru/metrika/tag.js";

export type YandexMetrikaOptions = {
  defer?: boolean;
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  trackHash?: boolean;
  ssr?: boolean;
  ecommerce?: string;
  referrer?: string;
  url?: string;
};

const defaultOptions: YandexMetrikaOptions = {
  defer: true, // SPA: отключаем автоотправку просмотров, используем hit() при смене маршрута
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true,
  trackHash: true,
  ssr: true,
  ecommerce: "dataLayer",
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
    // Для SPA обязательно defer: true и вызов hit() при смене страницы
    const initOptions = {
      ...defaultOptions,
      ...options,
      referrer: document.referrer,
      url: location.href,
    } as Record<string, unknown>;
    window.ym(id, "init", initOptions);
    // Первый просмотр отправляем сразу после инициализации (проверка Метрики и отчёты)
    const initialPath =
      window.location.pathname + window.location.search + window.location.hash;
    window.ym(id, "hit", initialPath);
  };

  const scriptUrl = `${SCRIPT_BASE}?id=${id}`;
  if (
    document.scripts &&
    Array.from(document.scripts).some(
      (s) => s.src === scriptUrl || s.src.startsWith(SCRIPT_BASE)
    )
  ) {
    init();
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = scriptUrl;
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
