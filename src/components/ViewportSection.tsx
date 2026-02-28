import { useEffect, useRef, useState, type ReactNode } from "react";

type ViewportSectionProps = {
  /** id для якоря (навигация к секции); пока контент не в viewport — вешается на плейсхолдер */
  id: string;
  /** Минимальная высота плейсхолдера (как у fallback), чтобы не было CLS */
  minHeight: string;
  children: ReactNode;
  /** Запас в px до viewport, когда уже подгружать (по умолчанию 200px) */
  rootMargin?: string;
};

/**
 * Рендерит children только когда секция попадает в viewport (или близко к нему).
 * До этого показывается плейсхолдер с minHeight — страница подгружается по частям, меньше DOM и работы.
 */
const ViewportSection = ({
  id,
  minHeight,
  children,
  rootMargin = "200px 0px 200px 0px",
}: ViewportSectionProps) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      id={!isInView ? id : undefined}
      className="w-full"
      style={{ minHeight }}
      aria-hidden={!isInView}
    >
      {isInView ? children : null}
    </div>
  );
};

export default ViewportSection;
