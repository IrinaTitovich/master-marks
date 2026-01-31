import { ReactNode, useEffect, useRef, useState } from "react";

interface WatermarkImageProps {
  src: string;
  alt: string;
  className?: string;
  children?: ReactNode;
  subtle?: boolean; // Для главной страницы - более незаметный водяной знак
  width?: number;
  height?: number;
  sizes?: string;
  srcSet?: string;
}

const WatermarkImage = ({ 
  src, 
  alt, 
  className = "", 
  children, 
  subtle = false,
  width,
  height,
  sizes,
  srcSet
}: WatermarkImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(src);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      // Используем requestIdleCallback для обработки canvas вне критического пути
      const processImage = () => {
        const ctx = canvas.getContext("2d", { 
          willReadFrequently: false, // Оптимизация для производительности
          alpha: true 
        });
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;

        // Рисуем изображение
        ctx.drawImage(img, 0, 0);

      if (subtle) {
        // Более незаметный водяной знак для главной страницы
        ctx.save();
        ctx.globalAlpha = 0.08; // Очень прозрачный
        ctx.fillStyle = "white";
        ctx.font = `bold ${Math.max(img.width / 15, 30)}px Arial`; // Меньший размер
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Поворачиваем контекст
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 4);
        
        // Рисуем текст водяного знака
        ctx.fillText("Ваш проект", 0, 0);
        ctx.restore();
      } else {
        // Стандартный водяной знак для страниц проектов
        ctx.save();
        ctx.globalAlpha = 0.2; // Менее заметный чем было
        ctx.fillStyle = "white";
        ctx.font = `bold ${Math.max(img.width / 12, 35)}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Поворачиваем контекст
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 4);
        
        // Рисуем текст водяного знака
        ctx.fillText("Ваш проект", 0, 0);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
        ctx.lineWidth = 1;
        ctx.strokeText("Ваш проект", 0, 0);
        
        ctx.restore();
      }

        // Конвертируем canvas в изображение асинхронно
        const convertToBlob = () => {
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setImageSrc(url);
            }
          }, "image/jpeg", 0.9);
        };

        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(convertToBlob, { timeout: 1000 });
        } else {
          setTimeout(convertToBlob, 0);
        }
      };

      // Используем requestIdleCallback если доступен, иначе выполняем сразу
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(processImage, { timeout: 500 });
      } else {
        setTimeout(processImage, 0);
      }
    };

    img.onerror = () => {
      // Если не удалось загрузить, используем оригинальное изображение
      setImageSrc(src);
    };

    img.src = src;
  }, [src, subtle]);

  return (
    <div 
      className="relative select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        draggable={false}
        loading="lazy"
        width={width}
        height={height}
        sizes={sizes}
        srcSet={srcSet}
        decoding="async"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {children}
    </div>
  );
};

export default WatermarkImage;
