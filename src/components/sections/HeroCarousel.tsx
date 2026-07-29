import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, MapPin, BadgeCheck } from "lucide-react";
import { getEventSettings } from "@/utils/eventSettings";

interface HeroCarouselProps {
  carouselImages: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ carouselImages }) => {
  const settings = getEventSettings();
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, [carouselImages.length]);

  useEffect(() => {
    if (!isAutoPlaying || carouselImages.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next, carouselImages.length]);

  const goTo = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <div className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden group">
      {/* Slides */}
      {carouselImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === current 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          <img 
            src={image.src} 
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            {/* Event Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 animate-fade-in">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-white/90">
                {settings.eventDate || "Événement à venir"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-4 animate-fade-in" style={{ animationDelay: "150ms" }}>
              {settings.eventName || "Bienvenue à l'Événement"}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-white/80 max-w-xl mb-8 animate-fade-in" style={{ animationDelay: "300ms" }}>
              Inscrivez-vous et obtenez votre badge digital pour accéder à l'événement
            </p>

            {/* Info Pills */}
            <div className="flex flex-wrap gap-3 mb-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
              {settings.eventDate && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-sm text-white/80">
                  <Calendar className="h-4 w-4" />
                  {settings.eventDate}
                </div>
              )}
              {settings.eventLocation && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-sm text-white/80">
                  <MapPin className="h-4 w-4" />
                  {settings.eventLocation}
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "500ms" }}>
              <Button 
                asChild 
                size="lg" 
                className="text-base px-8 h-14 rounded-xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 group"
              >
                <Link to="/visitor-type">
                  Demandez Votre Badge
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="text-base px-8 h-14 rounded-xl border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                <Link to="/about">
                  En Savoir Plus
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {carouselImages.length > 1 && (
        <>            <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {carouselImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === current 
                  ? "w-8 h-2.5 bg-primary shadow-lg shadow-primary/50" 
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
