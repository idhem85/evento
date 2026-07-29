import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Store, BookOpen, ArrowRight } from "lucide-react";

const categories = [
  {
    type: "visitor",
    icon: User,
    title: "Visiteur",
    subtitle: "Participant",
    description: "Pour les particuliers souhaitant assister à l'événement et profiter de toutes les activités",
    gradient: "from-violet-500/10 via-violet-500/5 to-transparent",
    iconBg: "bg-violet-100 dark:bg-violet-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-200 dark:border-violet-500/20",
  },
  {
    type: "exhibitor",
    icon: Store,
    title: "Exposant",
    subtitle: "Professionnel",
    description: "Pour les entreprises souhaitant présenter leurs produits et services lors de l'événement",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    iconBg: "bg-blue-100 dark:bg-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-500/20",
  },
  {
    type: "press",
    icon: BookOpen,
    title: "Presse",
    subtitle: "Média",
    description: "Pour les journalistes et médias souhaitant couvrir l'événement et réaliser des interviews",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    iconBg: "bg-amber-100 dark:bg-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-500/20",
  },
];

export const VisitorCategories: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            Inscription
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Qui êtes-vous ?
          </h2>
          <p className="text-muted-foreground">
            Choisissez la catégorie qui vous correspond et obtenez votre badge personnalisé
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.type}
                className="group animate-fade-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <Card className={`relative h-full bg-white dark:bg-card/50 border ${cat.borderColor} hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden`}>
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <CardContent className="relative p-6 md:p-8 flex flex-col items-center text-center h-full">
                    {/* Icon */}
                    <div className={`h-16 w-16 rounded-2xl ${cat.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${cat.iconColor}`} />
                    </div>

                    {/* Badge */}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-3 ${
                      cat.type === "visitor" 
                        ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
                        : cat.type === "exhibitor"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                    }`}>
                      {cat.subtitle}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground mb-3">{cat.title}</h3>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-6 flex-grow">{cat.description}</p>

                    {/* CTA */}
                    <Button 
                      asChild 
                      className={`mt-auto w-full rounded-xl group/btn ${
                        cat.type === "visitor"
                          ? "bg-violet-600 hover:bg-violet-700"
                          : cat.type === "exhibitor"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-amber-600 hover:bg-amber-700"
                      }`}
                    >
                      <Link to={`/register?type=${cat.type}`}>
                        S'inscrire
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
