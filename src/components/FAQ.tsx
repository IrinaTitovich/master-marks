import { useMemo, useEffect, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string | ReactNode;
  /** Текст ответа для JSON-LD (если answer — JSX, укажите здесь плоский текст) */
  answerPlainText?: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
}

const FAQ = ({
  items,
  title = "Часто задаваемые вопросы",
  description,
}: FAQProps) => {
  // Генерируем Schema.org FAQPage структурированные данные
  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            item.answerPlainText ??
            (typeof item.answer === "string" ? item.answer : ""),
        },
      })),
    }),
    [items]
  );

  // Добавляем JSON-LD в head
  useEffect(() => {
    // Удаляем старые FAQ JSON-LD скрипты
    const oldScripts = document.querySelectorAll(
      'script[type="application/ld+json"][data-faq="true"]'
    );
    oldScripts.forEach((script) => script.remove());

    // Создаем новый script
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute("data-faq", "true");
    script.textContent = JSON.stringify(faqJsonLd);
    document.head.appendChild(script);

    // Cleanup при размонтировании
    return () => {
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"][data-faq="true"]'
      );
      scripts.forEach((script) => script.remove());
    };
  }, [faqJsonLd]);

  return (
    <section
      id="faq"
      className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-accent-foreground" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-card-foreground mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-accent transition-colors py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                  {typeof item.answer === "string" ? (
                    item.answer
                  ) : (
                    <div className="space-y-4">{item.answer}</div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
