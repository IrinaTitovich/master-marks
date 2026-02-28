import { Tag, ArrowRight } from "lucide-react";

const PromoBanner = () => {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const offset = window.innerWidth < 768 ? 20 : 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-primary">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, currentColor 20px, currentColor 21px)",
        }}
        aria-hidden="true"
      />

      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

      <div className="relative container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <span className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg rotate-[-12deg] bg-accent shadow-md shadow-accent/30 ring-1 ring-accent/50">
              <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-accent-foreground" />
            </span>
            <div className="text-center sm:text-left">
              <p className="text-[13px] leading-tight sm:text-base font-bold text-primary-foreground tracking-wide">
                Скидки на проектирование до середины марта
              </p>
              <p className="text-[11px] sm:text-sm text-primary-foreground/70 mt-0.5">
                Успейте заказать проект по выгодной цене
              </p>
            </div>
          </div>

          <button
            onClick={scrollToContact}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2 text-[13px] font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 hover:scale-105 active:scale-100 sm:w-auto sm:py-2.5 sm:text-sm"
          >
            Узнать подробнее
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
