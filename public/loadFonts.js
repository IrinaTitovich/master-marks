/**
 * Асинхронная загрузка Google Fonts для предотвращения блокировки рендеринга
 * Этот скрипт загружает шрифты после загрузки страницы
 */
(function() {
  // Проверяем, поддерживает ли браузер динамическую загрузку CSS
  if (document.createElement('link').relList && document.createElement('link').relList.supports && document.createElement('link').relList.supports('preload')) {
    // Если preload поддерживается, скрипт уже загрузил шрифты через onload
    return;
  }

  // Fallback для старых браузеров
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap';
  link.media = 'print';
  link.onload = function() {
    this.media = 'all';
  };
  document.head.appendChild(link);
})();
