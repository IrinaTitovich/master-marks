/**
 * Утилиты для оптимизации изображений
 * Поддержка современных форматов и адаптивных размеров
 */

export interface ImageSource {
  src: string;
  srcset?: string;
  sizes?: string;
  type?: string;
}

/**
 * Генерирует srcset для адаптивных изображений
 * @param basePath - базовый путь к изображению
 * @param widths - массив ширин для генерации
 * @returns строка srcset
 */
export const generateSrcSet = (basePath: string, widths: number[]): string => {
  return widths.map(width => `${basePath}?w=${width} ${width}w`).join(', ');
};

/**
 * Генерирует sizes атрибут для адаптивных изображений
 * @param breakpoints - объект с breakpoints и размерами
 * @returns строка sizes
 */
export const generateSizes = (breakpoints: Record<string, string>): string => {
  const entries = Object.entries(breakpoints).sort((a, b) => {
    const widthA = parseInt(a[0]) || 0;
    const widthB = parseInt(b[0]) || 0;
    return widthB - widthA;
  });
  
  return entries.map(([breakpoint, size]) => {
    if (breakpoint === 'default') return size;
    return `(max-width: ${breakpoint}px) ${size}`;
  }).join(', ');
};

/**
 * Проверяет поддержку WebP формата
 */
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * Проверяет поддержку AVIF формата
 */
export const supportsAVIF = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    
    const avif = new Image();
    avif.onload = () => resolve(true);
    avif.onerror = () => resolve(false);
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

/**
 * Получает оптимальный формат изображения
 */
export const getOptimalImageFormat = async (): Promise<'avif' | 'webp' | 'jpg'> => {
  if (await supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpg';
};

/**
 * Генерирует путь к оптимизированному изображению
 * @param basePath - базовый путь
 * @param format - формат (avif, webp, jpg)
 * @param width - ширина (опционально)
 */
export const getOptimizedImagePath = (
  basePath: string, 
  format: 'avif' | 'webp' | 'jpg' = 'jpg',
  width?: number
): string => {
  // В реальном проекте здесь была бы логика конвертации изображений
  // Пока возвращаем оригинальный путь
  // TODO: Интегрировать с системой оптимизации изображений
  if (width) {
    return `${basePath}?w=${width}&format=${format}`;
  }
  return basePath;
};
