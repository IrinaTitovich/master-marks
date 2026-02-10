import { Star, MessageSquare } from "lucide-react";

const GoogleRating = () => {
  return (
    <section className="py-8 md:py-10 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl bg-card border border-border shadow-sm p-5 md:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="font-serif text-2xl font-bold text-foreground">
                  5.0
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Средняя оценка в Google
              </p>
              <a
                href="https://www.google.com/search?q=%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82+%D0%BC%D0%BE%D0%B3%D0%B8%D0%BB%D0%B5%D0%B2&rlz=1C1GCEA_enBY1071BY1071&sca_esv=bd96da7b54c85e6e&biw=1920&bih=919&sxsrf=ANbL-n5BTOhSMUgZ8kXTTj0Ec61fox0eOA%3A1770736498787&ei=ckuLabnRL8yNwPAPrd6C0AU&ved=0ahUKEwi50oDAm8-SAxXMBhAIHS2vAFoQ4dUDCBM&uact=5&oq=%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82+%D0%BC%D0%BE%D0%B3%D0%B8%D0%BB%D0%B5%D0%B2&gs_lp=Egxnd3Mtd2l6LXNlcnAiG9C_0YDQvtC10LrRgiDQvNC-0LPQuNC70LXQsjIEECMYJzIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHjIGEAAYBxgeMgYQABgHGB4yBhAAGAcYHkjjEVCjClijCnACeAGQAQCYAVWgAVWqAQExuAEDyAEA-AEBmAIDoAJgwgIKEAAYRxjWBBiwA5gDAIgGAZAGCJIHATOgB8kIsgcBMbgHWcIHBTAuMS4yyAcIgAgB&sclient=gws-wiz-serp#lrd=0x46d051e4300295cf:0xc88c0cdba4d373f1,1,,,,"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Отзывы в Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleRating;
