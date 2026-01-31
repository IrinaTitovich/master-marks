import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Phone, MapPin, Navigation, RotateCcw, Instagram } from "lucide-react";

const ContactForm = () => {
  const location = useLocation();
  
  // Загружаем сохраненные данные из localStorage
  const loadSavedData = () => {
    try {
      const saved = localStorage.getItem("contactFormData");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || "",
          phone: parsed.phone || "",
          email: parsed.email || "",
          message: "",
        };
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
    }
    return {
      name: "",
      phone: "",
      email: "",
      message: "",
    };
  };

  const [formData, setFormData] = useState(loadSavedData);

  // Сохраняем данные в localStorage при изменении (кроме message)
  useEffect(() => {
    try {
      localStorage.setItem("contactFormData", JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      }));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  }, [formData.name, formData.phone, formData.email]);

  // Предзаполнение сообщения из location.state
  useEffect(() => {
    if (location.state?.prefillMessage) {
      setFormData(prev => ({
        ...prev,
        message: location.state.prefillMessage,
      }));
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Заявка от ${formData.name}`);
    const body = encodeURIComponent(
      `Имя: ${formData.name}\n` +
      `Телефон: ${formData.phone}\n` +
      `Email: ${formData.email}\n\n` +
      `Сообщение:\n${formData.message}`
    );
    
    // Открываем mailto с двумя адресами
    window.location.href = `mailto:larisa_matsukova@tut.by,vashproekt.by@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
            Ваше имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
            placeholder="Иван Иванов"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
            placeholder="+375 (XX) XXX-XX-XX"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
          Email
        </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
            placeholder="your@email.com"
          />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-none"
          placeholder="Расскажите о вашем проекте..."
        />
      </div>
      <div>
        <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base sm:text-lg py-4 sm:py-6 shadow-lg hover:shadow-xl transition-all whitespace-normal break-words">
          Отправить заявку
        </Button>
        <p className="text-sm text-muted-foreground mt-3 text-center">
          Вы получите консультацию бесплатно
        </p>
      </div>
    </form>
  );
};

const Contact = () => {
  const [mapOpen, setMapOpen] = useState(false);
  const [mapProvider, setMapProvider] = useState<"google" | "yandex">("google");
  const [mapKey, setMapKey] = useState(0);

  // Определяем источник трафика при монтировании
  useEffect(() => {
    const referrer = document.referrer.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (referrer.includes("yandex") || referrer.includes("yandex.ru") || userAgent.includes("yabrowser")) {
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

  const fullAddress = "пер. 1ый Хвойный д.3, Могилёв, Беларусь";
  const shortAddress = "Могилёв, Беларусь";
  const encodedAddress = encodeURIComponent(fullAddress);
  
  // Координаты для карты (примерные координаты Могилёва, можно уточнить)
  // Для точного адреса "пер. 1ый хвойный д.3" нужно уточнить координаты
  const lat = 53.8945;
  const lon = 30.3307;
  
  // Ссылки для карт (iframe)
  // Google Maps через поиск адреса
  const googleMapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  // Яндекс Карты
  const yandexMapUrl = `https://yandex.ru/map-widget/v1/?ll=${lon},${lat}&z=15&pt=${lon},${lat}&l=map`;
  
  // Ссылки для навигаторов
  const googleNavUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const yandexNavUrl = `yandexnavi://build_route?lat_to=${lat}&lon_to=${lon}`;

  // Функция для возврата карты к исходному адресу
  const resetMap = () => {
    setMapKey(prev => prev + 1);
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
      href: "tel:+375296745773",
    },
    {
      icon: Mail,
      label: "Email",
      value: "vashproekt.by@gmail.com",
      href: "mailto:vashproekt.by@gmail.com",
    },
    {
      icon: MapPin,
      label: "Локация",
      value: shortAddress,
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
    <section id="contact" className="py-16 sm:py-24 bg-background overflow-x-hidden scroll-mt-20 sm:scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-full">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 break-words px-2">
              Начнем работу над вашим проектом
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-2 break-words px-2">
              Получите бесплатную консультацию и расчет стоимости проекта
            </p>
            <p className="text-base sm:text-lg text-muted-foreground/80 break-words px-2">
              Работаем по всей Могилевской области
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-12">
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
                    <div className="text-sm text-muted-foreground mb-2 break-words">
                      {item.label}
                    </div>
                    <div className={`font-semibold text-foreground text-sm sm:text-base ${isPhone ? "whitespace-nowrap" : "break-words"}`}>
                      {item.value}
                    </div>
                  </button>
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
                  <div className={`font-semibold text-foreground text-sm sm:text-base ${isPhone ? "whitespace-nowrap" : "break-words"}`}>
                    {item.value}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Диалог с картой */}
          <Dialog open={mapOpen} onOpenChange={setMapOpen}>
            <DialogContent className="max-w-4xl w-full p-0">
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-card-foreground mb-4">
                  Консультации по адресу
                </h3>
                <p className="text-muted-foreground mb-4">
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
                          window.open(`https://yandex.ru/maps/?pt=30.3307,53.8945&z=15&l=map`, "_blank");
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

          <div id="contact-form" className="bg-card p-6 sm:p-8 md:p-12 rounded-lg shadow-[var(--shadow-elegant)] w-full overflow-x-hidden scroll-mt-20 sm:scroll-mt-24">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-card-foreground mb-2 text-center break-words">
              Оставьте заявку
            </h3>
            <p className="text-center text-muted-foreground mb-6 text-sm sm:text-base break-words">
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
