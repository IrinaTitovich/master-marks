import { useEffect, useState } from "react";
import { TreePalm } from "lucide-react";

const VACATION_ANNOUNCEMENT_EXPIRES_AT = new Date("2026-08-23T08:00:00+03:00");
const CHECK_INTERVAL_MS = 60 * 1000;

const isAnnouncementActive = () =>
  Date.now() < VACATION_ANNOUNCEMENT_EXPIRES_AT.getTime();

const VacationAnnouncement = () => {
  const [isActive, setIsActive] = useState(isAnnouncementActive);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIsActive(isAnnouncementActive());
    }, CHECK_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <div
      className="mb-4 flex w-full max-w-fit items-center gap-2 rounded-xl border border-accent/60 bg-primary-foreground/95 px-3 py-2 text-primary shadow-[var(--shadow-elegant)] backdrop-blur-sm sm:w-auto"
      role="status"
      aria-live="polite"
      aria-label="Объявление об отпуске"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <TreePalm className="h-4 w-4" aria-hidden="true" />
      </div>
      <h2 className="font-serif text-base font-bold leading-tight sm:text-lg">
        Отпуск с 07.08.2026 до 23.08.2026
      </h2>
    </div>
  );
};

export default VacationAnnouncement;
