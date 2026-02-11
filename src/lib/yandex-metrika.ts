/**
 * Яндекс.Метрика — установка как в коде из интерфейса Метрики (копировать счётчик).
 * Загрузчик и вызов init совпадают с официальным сниппетом; для SPA при смене маршрута вызывается hit().
 * ID счётчика задаётся через VITE_YANDEX_METRIKA_ID.
 */

declare global {
  interface Window {
    ym?: ((id: number, method: string, ...args: unknown[]) => void) & {
      a?: unknown[];
      l?: number;
    };
  }
}

const METRIKA_SCRIPT_URL = "https://mc.yandex.ru/metrika/tag.js";

export type YandexMetrikaOptions = {
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  ecommerce?: string;
  cookie?: boolean;
};

/**
 * Официальный загрузчик Метрики (как в коде «Скопировать» в настройках счётчика).
 * Создаёт window.ym, ставит в очередь вызовы и подключает tag.js.
 */
function injectMetrikaLoader(): void {
  (function (m: Window, e: Document, t: string, r: string, i: string) {
    const w = m as unknown as Record<string, unknown>;
    w[i] =
      w[i] ||
      function (...args: unknown[]) {
        const ym = w[i] as { a?: unknown[] };
        ym.a = ym.a || [];
        ym.a.push(args);
      };
    (w[i] as { l?: number }).l = 1 * Date.now();
    const k = e.createElement(t) as HTMLScriptElement;
    const a = e.getElementsByTagName(t)[0];
    k.async = true;
    k.src = r;
    a.parentNode?.insertBefore(k, a);
  })(window, document, "script", METRIKA_SCRIPT_URL, "ym");
}

/**
 * Загружает счётчик и инициализирует его так же, как в коде из интерфейса Метрики.
 */
export function initYandexMetrika(
  counterId: number | string,
  options: YandexMetrikaOptions = {}
): void {
  if (typeof window === "undefined") return;

  const id =
    typeof counterId === "string" ? parseInt(counterId, 10) : counterId;
  if (!id || Number.isNaN(id)) return;

  // Если скрипт уже есть — только init (повторный вызов при hot reload и т.п.)
  const hasScript = Array.from(document.scripts).some(
    (s) =>
      s.src === METRIKA_SCRIPT_URL ||
      s.src.startsWith("https://mc.yandex.ru/metrika/")
  );
  if (!hasScript) {
    injectMetrikaLoader();
  }

  if (!window.ym) return;

  // trackLinks: false — иначе Метрика перехватывает клики по ссылкам (в т.ч. tel:)
  // и браузер показывает «сайт инициирует вызов»
  // cookie: false — отключаем использование сторонних кук для соответствия новым требованиям браузеров
  const initParams = {
    clickmap: true,
    trackLinks: false,
    accurateTrackBounce: true,
    webvisor: true,
    ecommerce: "dataLayer",
    cookie: false, // Отключаем сторонние куки для соответствия новым требованиям браузеров
    ...options,
  };

  window.ym(id, "init", initParams);
  console.log("[Yandex Metrika] init, counter ID:", id);
}

/**
 * Отправляет просмотр страницы (для переходов по SPA без перезагрузки).
 */
export function yandexMetrikaHit(
  counterId: number | string,
  url?: string
): void {
  if (typeof window === "undefined" || !window.ym) return;

  const id =
    typeof counterId === "string" ? parseInt(counterId, 10) : counterId;
  if (!id || Number.isNaN(id)) return;

  const hitUrl = url ?? location.href;
  window.ym(id, "hit", hitUrl, { title: document.title });
  console.log("[Yandex Metrika] hit:", hitUrl);
}
