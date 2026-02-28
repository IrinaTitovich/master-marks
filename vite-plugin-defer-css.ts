import type { Plugin } from "vite";

const CRITICAL_CSS = `
html{overflow-x:hidden;scrollbar-gutter:stable}
body{margin:0;background:hsl(0 0% 98%);color:hsl(220 15% 15%);overflow-x:hidden}
#root,.min-h-screen{min-height:100vh;min-height:100dvh}
#root>div{width:100%;max-width:100%;overflow-x:hidden}
/* Hero-зона: резерв места и выравнивание со статическим shell */
#hero .absolute.inset-0{aspect-ratio:16/9;min-height:100dvh}
/* Fallback шрифты: font-size-adjust уменьшает CLS при смене на Playfair/Inter */
.font-serif,h1{font-family:Georgia,"Times New Roman",serif;font-size-adjust:0.48}
.font-sans,body{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size-adjust:0.46}
`;

/**
 * Делает основной CSS неблокирующим: инлайнит критический минимум и подгружает полный CSS асинхронно.
 * Убирает "Render blocking" для index-*.css (Lighthouse).
 */
export default function deferCssPlugin(): Plugin {
  return {
    name: "vite-plugin-defer-css",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const linkRegex = /<link([^>]*rel=["']stylesheet["'][^>]*)href=["']([^"']*assets[^"']*\.css)["']([^>]*)>/i;
        const match = html.match(linkRegex);
        if (!match) return html;

        const fullTag = match[0];
        const beforeHref = match[1];
        const href = match[2];
        const afterHref = match[3];

        const deferredLink = `<link${beforeHref}href="${href}"${afterHref} media="print" onload="this.media='all'">`;
        const noscriptFallback = `<noscript><link rel="stylesheet" href="${href}"></noscript>`;
        const criticalStyle = `<style id="critical-css">${CRITICAL_CSS}</style>`;

        return html.replace(fullTag, criticalStyle + "\n    " + deferredLink + "\n    " + noscriptFallback);
      },
    },
  };
}
