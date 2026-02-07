import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Phone,
  MapPin,
  Navigation,
  RotateCcw,
  Instagram,
  Copy,
  Check,
} from "lucide-react";

const PHONE_NUMBER = "+375296745773";

const Contact = () => {
  const [mapOpen, setMapOpen] = useState(false);
  const [mapProvider, setMapProvider] = useState<"google" | "yandex">("google");
  const [mapKey, setMapKey] = useState(0);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const copyPhone = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(PHONE_NUMBER);
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    } catch {
      // fallback: открыть tel: если clipboard недоступен
      window.location.href = `tel:${PHONE_NUMBER}`;
    }
  };

  // Определяем источник трафика при монтировании
  useEffect(() => {
    const referrer = document.referrer.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();

    if (
      referrer.includes("yandex") ||
      referrer.includes("yandex.ru") ||
      userAgent.includes("yabrowser")
    ) {
      setMapProvider("yandex");
    } else {
      setMapProvider("google");
    }
  }, []);

  // Обработчик события для открытия карты из навигации
  useEffect(() => {
    const handleOpenMap = () => {
      setMapOpen(true);
    };

    window.addEventListener("openLocationMap", handleOpenMap);
    return () => window.removeEventListener("openLocationMap", handleOpenMap);
  }, []);

  const fullAddress = "пер. 1 Хвойный д. 3, Могилёв, Беларусь";
  const shortAddress = "пер. 1 Хвойный д. 3, Могилёв";
  const encodedAddress = encodeURIComponent(fullAddress);

  // Координаты для карты: пер. 1 Хвойный д. 3, Могилёв
  const lat = 53.8945;
  const lon = 30.3307;

  // Ссылки для карт (iframe) — адрес в запросе, чтобы карта открывалась на нужной локации
  const googleMapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const yandexMapUrl = `https://yandex.ru/map-widget/v1/?ll=${lon},${lat}&z=16&pt=${lon},${lat}&l=map`;

  // Ссылки для навигаторов
  const googleNavUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const yandexNavUrl = `yandexnavi://build_route?lat_to=${lat}&lon_to=${lon}`;

  // Функция для возврата карты к исходному адресу
  const resetMap = () => {
    setMapKey((prev) => prev + 1);
  };

  const contactInfo: Array<{
    icon: typeof Phone;
    label: string;
    value: string;
    href: string;
    onClick?: (e: React.MouseEvent) => void;
  }> = [
    {
      icon: Phone,
      label: "Телефон",
      value: "+375 (29) 674-57-73",
      href: `tel:${PHONE_NUMBER}`,
    },
    {
      icon: MapPin,
      label: "Локация",
      value: "Могилев, Беларусь",
      href: "#",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setMapOpen(true);
      },
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@vashproekt.by",
      href: "https://www.instagram.com/vashproekt.by/?hl=ru",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-background overflow-x-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-full">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 break-words px-2">
              Начнем работу над вашим проектом
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-2 break-words px-2">
              Позвоните для бесплатной консультации
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
            {contactInfo.map((item, index) => {
              const isPhone = item.label === "Телефон";
              if (item.onClick) {
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="group flex flex-col items-center text-center p-4 sm:p-6 bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2 cursor-pointer w-full"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <item.icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    {item.label && (
                      <div className="text-sm text-muted-foreground mb-2 break-words">
                        {item.label}
                      </div>
                    )}
                    <div
                      className={`font-semibold text-foreground text-sm sm:text-base ${
                        isPhone ? "whitespace-nowrap" : "break-words"
                      }`}
                    >
                      {item.value}
                    </div>
                  </button>
                );
              }
              if (isPhone) {
                return (
                  <div
                    key={index}
                    className="group relative flex flex-col items-center text-center p-4 sm:p-6 bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2"
                  >
                    <a
                      href={item.href}
                      className="flex flex-col items-center flex-1"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <item.icon className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-2 break-words">
                        {item.label}
                      </div>
                      <div className="font-semibold text-foreground text-sm sm:text-base whitespace-nowrap">
                        {item.value}
                      </div>
                    </a>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={copyPhone}
                          className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                          aria-label={
                            phoneCopied
                              ? "Номер скопирован"
                              : "Копировать номер телефона"
                          }
                        >
                          {phoneCopied ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipPortal>
                        <TooltipContent>
                          {phoneCopied
                            ? "Номер скопирован"
                            : "Скопировать телефон"}
                        </TooltipContent>
                      </TooltipPortal>
                    </Tooltip>
                  </div>
                );
              }
              return (
                <a
                  key={index}
                  href={item.href}
                  className="group flex flex-col items-center text-center p-4 sm:p-6 bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <item.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-2 break-words">
                    {item.label}
                  </div>
                  <div
                    className={`font-semibold text-foreground text-sm sm:text-base break-words`}
                  >
                    {item.value}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Диалог с картой */}
          <Dialog open={mapOpen} onOpenChange={setMapOpen}>
            <DialogContent className="fixed inset-0 left-0 top-0 right-0 bottom-0 max-w-none w-auto p-0 flex items-center justify-center translate-x-0 translate-y-0 bg-transparent border-none shadow-none pointer-events-none [&>*]:pointer-events-auto [&>button]:absolute [&>button]:right-4 [&>button]:top-4 [&>button]:z-10 [&>button]:bg-black/70 [&>button]:text-white [&>button]:hover:bg-black/90 [&>button]:rounded-full [&>button]:h-10 [&>button]:w-10">
              <div className="max-w-4xl w-full max-h-[90vh] overflow-auto mx-4 bg-background rounded-lg shadow-lg border p-6 pointer-events-auto">
                <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
                  Могилев, Беларусь
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {fullAddress}
                </p>

                {/* Карта */}
                <div className="w-full h-96 rounded-lg overflow-hidden mb-4 border border-border relative">
                  {mapProvider === "google" ? (
                    <iframe
                      key={mapKey}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={googleMapUrl}
                    />
                  ) : (
                    <iframe
                      key={mapKey}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      src={yandexMapUrl}
                    />
                  )}
                  {/* Кнопка возврата к адресу */}
                  <Button
                    onClick={resetMap}
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm hover:bg-background"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Вернуть к адресу
                  </Button>
                </div>

                {/* Кнопки навигаторов */}
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-semibold text-card-foreground text-center mb-2">
                    Открыть в навигаторе для поездки:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => window.open(googleNavUrl, "_blank")}
                      className="flex-1 bg-[#4285F4] hover:bg-[#357AE8] text-white font-bold text-base sm:text-lg py-6 sm:py-7 shadow-lg hover:shadow-xl transition-all"
                      size="lg"
                    >
                      <Navigation className="mr-3 h-6 w-6 sm:h-7 sm:w-7" />
                      Google Maps
                    </Button>
                    <Button
                      onClick={() => {
                        // Пытаемся открыть в приложении Яндекс Навигатор
                        window.location.href = yandexNavUrl;
                        // Если не получилось, открываем веб-версию
                        setTimeout(() => {
                          window.open(
                            `https://yandex.ru/maps/?pt=30.3307,53.8945&z=15&l=map`,
                            "_blank"
                          );
                        }, 500);
                      }}
                      className="flex-1 bg-[#FC3F1D] hover:bg-[#E02E0F] text-white font-bold text-base sm:text-lg py-6 sm:py-7 shadow-lg hover:shadow-xl transition-all"
                      size="lg"
                    >
                      <Navigation className="mr-3 h-6 w-6 sm:h-7 sm:w-7" />
                      Яндекс Навигатор
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-[var(--shadow-elegant)] p-8 sm:p-12 text-center w-full overflow-x-hidden scroll-mt-20 sm:scroll-mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-card-foreground mb-4">
              Готовы начать работу над вашим проектом?
            </h2>
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 h-11 rounded-md px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg transition-colors [&_svg]:shrink-0"
            >
              <Phone className="mr-2 h-5 w-5" />
              Позвонить
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
