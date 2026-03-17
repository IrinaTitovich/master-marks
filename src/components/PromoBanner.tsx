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

      <div
        className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
    </section>
  );
};

export default PromoBanner;
