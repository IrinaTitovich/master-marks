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
 * Создаёт очередь window.ym как в официальном сниппете.
 * tag.js при загрузке обрабатывает ym.a и выполняет все отложенные вызовы (init, hit и т.д.).
 */
function ensureMetrikaQueue(): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as Record<string, unknown>;
  if (w.ym) return;
  w.ym = function (...args: unknown[]) {
    const ym = w.ym as { a?: unknown[] };
    ym.a = ym.a || [];
    ym.a.push(args); // массив аргументов, как при push(arguments) в официальном коде
  } as typeof window.ym;
  (w.ym as { l?: number }).l = 1 * Date.now();
}

let metrikaScriptScheduled = false;

/** Подключает tag.js (один раз). После загрузки tag.js обработает очередь ym.a и инициализирует счётчик. */
function injectMetrikaScript(): void {
  if (typeof document === "undefined") return;
  if (metrikaScriptScheduled) return;
  if (Array.from(document.scripts).some((s) => s.src?.startsWith("https://mc.yandex.ru/metrika/"))) return;
  metrikaScriptScheduled = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = METRIKA_SCRIPT_URL;
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(script, first);
}

const DELAY_MS = 4000;

/** Отложенная загрузка tag.js: через 4 с или по первому scroll/click/keydown. Счётчик заработает после загрузки tag.js. */
function scheduleMetrikaScript(): void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const run = () => {
    injectMetrikaScript();
    if (timeoutId !== null) clearTimeout(timeoutId);
    ["scroll", "click", "keydown"].forEach((ev) => window.removeEventListener(ev, run));
  };

  timeoutId = setTimeout(run, DELAY_MS);
  ["scroll", "click", "keydown"].forEach((ev) => window.addEventListener(ev, run, { once: true, passive: true }));
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

  ensureMetrikaQueue();
  scheduleMetrikaScript();
  if (!window.ym) return;

  // trackLinks: false — иначе Метрика перехватывает клики по ссылкам (в т.ч. tel:)
  // cookie: false — отключаем сторонние куки
  // webvisor: false — Вебвизор использует WebSocket и блокирует back/forward cache (bfcache)
  const initParams = {
    clickmap: true,
    trackLinks: false,
    accurateTrackBounce: true,
    webvisor: false,
    ecommerce: "dataLayer",
    cookie: false,
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
