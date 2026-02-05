import { startTransition } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initYandexMetrika } from "@/lib/yandex-metrika";

// Счётчик загружается сразу при открытии страницы (нужно для проверки в интерфейсе Метрики)
const counterId = import.meta.env.VITE_YANDEX_METRIKA_ID;
if (counterId) initYandexMetrika(counterId);

// GitHub Pages 404.html workaround: handle redirect from 404.html
const urlParams = new URLSearchParams(window.location.search);
const redirectPath = urlParams.get("p");
if (redirectPath) {
  window.history.replaceState({}, "", redirectPath);
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

try {
  const root = createRoot(rootElement);
  // Используем startTransition для неблокирующего рендеринга
  startTransition(() => {
    root.render(<App />);
  });
} catch (error) {
  // Минимальная обработка ошибок для уменьшения размера бандла
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Ошибка загрузки приложения</h1>
      <p>Пожалуйста, обновите страницу.</p>
    </div>
  `;
}
