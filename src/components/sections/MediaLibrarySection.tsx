import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Image, ArrowRight, Camera } from "lucide-react";

export const MediaLibrarySection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/[0.02] to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Camera className="h-8 w-8 text-primary" />
          </div>

          {/* Header */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
              Galerie
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Médiathèque
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Découvrez les photos et vidéos des éditions précédentes. Revivez les meilleurs moments de l'événement.
            </p>
          </div>

          {/* CTA */}
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Button 
              asChild 
              size="lg" 
              className="text-base px-8 h-14 rounded-xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/25 hover:shadow-primary/35 transition-all duration-300 group"
            >
              <Link to="/media">
                <Image className="mr-2 h-5 w-5" />
                Visiter la Médiathèque
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Preview thumbnails (decorative) */}
          <div className="grid grid-cols-3 gap-3 mt-12 max-w-lg mx-auto">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-muted border border-border/50 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="h-6 w-6 text-primary/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
