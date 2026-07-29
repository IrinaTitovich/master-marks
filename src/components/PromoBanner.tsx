import { BadgePercent, Phone, Snowflake } from "lucide-react";

const PromoBanner = () => {
  return (
    <section
      className="relative overflow-hidden bg-background py-8 text-primary"
      aria-label="Предзапись на зимние месяцы со скидкой"
    >
      <div
        className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 rounded-2xl border border-primary/15 bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 p-5 text-center shadow-lg sm:flex-row sm:justify-between sm:p-6 sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md">
              <Snowflake className="h-8 w-8" aria-hidden="true" />
            </div>

            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm font-bold uppercase tracking-wide text-yellow-300">
                <BadgePercent className="h-4 w-4" aria-hidden="true" />
                Скидка 10%
              </div>
              <h2 className="font-serif text-2xl font-bold leading-tight sm:text-3xl">
                Открыта предзапись на зимние месяцы
              </h2>
              <p className="mt-2 text-base font-medium text-primary/80 sm:text-lg">
                Забронируйте проектирование заранее и получите выгодные условия
                на старт работ зимой.
              </p>
            </div>
          </div>

          <a
            href="tel:+375296745773"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-md transition-transform hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-100"
          >
            Позвонить
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
