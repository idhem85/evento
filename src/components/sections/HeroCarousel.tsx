
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
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
  
  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {carouselImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative h-[50vh] md:h-[60vh] w-full">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-6">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">{settings.eventName}</h1>
                  <p className="text-xl mb-8">{settings.eventDate} • {settings.eventLocation}</p>
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link to="/visitor-type">Demandez Votre Badge</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-10" />
        <CarouselNext className="right-4 z-10" />
      </Carousel>
    </div>
  );
};
