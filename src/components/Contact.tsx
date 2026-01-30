import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

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
      <Button type="submit" size="lg" className="w-full">
        Отправить заявку
      </Button>
    </form>
  );
};

const Contact = () => {
  const contactInfo = [
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
      value: "Беларусь, Могилёв",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Начнем работу над вашим проектом
            </h2>
            <p className="text-xl text-muted-foreground">
              Свяжитесь со мной для обсуждения деталей и получения консультации
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {item.label}
                </div>
                <div className="font-semibold text-foreground">
                  {item.value}
                </div>
              </a>
            ))}
          </div>

          <div className="bg-card p-8 md:p-12 rounded-lg shadow-[var(--shadow-elegant)]">
            <h3 className="font-serif text-2xl font-bold text-card-foreground mb-6 text-center">
              Оставьте заявку
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
