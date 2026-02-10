import { Star, Award, MessageSquare } from "lucide-react";

const GoogleRating = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-accent/10 via-accent/5 to-background relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-card via-card to-accent/5 rounded-3xl shadow-2xl p-10 md:p-16 border-2 border-accent/30 relative overflow-hidden">
            {/* Блестящий эффект */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              {/* Левая часть - рейтинг */}
              <div className="flex flex-col items-center md:items-start flex-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-10 w-10 md:h-12 md:w-12 fill-accent text-accent drop-shadow-lg animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-serif text-6xl md:text-7xl font-bold text-foreground drop-shadow-lg">
                      5.0
                    </span>
                    <span className="text-3xl md:text-4xl text-muted-foreground font-semibold">из 5</span>
                  </div>
                  <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-medium">
                    Средняя оценка в Google
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground/80">
                    Самый высокий рейтинг в Могилеве
                  </p>
                </div>
              </div>

              {/* Правая часть - достижение */}
              <div className="flex flex-col items-center md:items-end text-center md:text-right flex-1">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                  <div className="relative">
                    <Award className="h-16 w-16 md:h-20 md:w-20 text-accent drop-shadow-lg animate-bounce" />
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl"></div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                      Больше всех отзывов
                    </div>
                    <p className="text-lg md:text-xl text-muted-foreground">
                      в категории проектирования домов
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/search?q=%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82+%D0%BC%D0%BE%D0%B3%D0%B8%D0%BB%D0%B5%D0%B2&rlz=1C1GCEA_enBY1071BY1071&sca_esv=bd96da7b54c85e6e&biw=1920&bih=919&sxsrf=ANbL-n5BTOhSMUgZ8kXTTj0Ec61fox0eOA%3A1770736498787&ei=ckuLabnRL8yNwPAPrd6C0AU&ved=0ahUKEwi50oDAm8-SAxXMBhAIHS2vAFoQ4dUDCBM&uact=5&oq=%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82+%D0%BC%D0%BE%D0%B3%D0%B8%D0%BB%D0%B5%D0%B2&gs_lp=Egxnd3Mtd2l6LXNlcnAiG9C_0YDQvtC10LrRgiDQvNC-0LPQuNC70LXQsjIEECMYJzIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHkjjEVCjClijCnACeAGQAQCYAVWgAVWqAQExuAEDyAEA-AEBmAIDoAJgwgIKEAAYRxjWBBiwA5gDAIgGAZAGCJIHATOgB8kIsgcBMbgHWcIHBTAuMS4yyAcIgAgB&sclient=gws-wiz-serp#lrd=0x46d051e4300295cf:0xc88c0cdba4d373f1,1,,,,"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-lg font-bold text-accent hover:text-accent/80 bg-accent/10 hover:bg-accent/20 px-6 py-3 rounded-full transition-all duration-300 border-2 border-accent/30 hover:border-accent shadow-lg hover:shadow-xl"
                >
                  <MessageSquare className="h-5 w-5" />
                  Читать отзывы в Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleRating;
