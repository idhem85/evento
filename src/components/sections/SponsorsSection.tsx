import React, { useState } from "react";

interface Sponsor {
  id: number;
  name: string;
  logo: string;
}

interface SponsorsSectionProps {
  sponsors: Sponsor[];
}

export const SponsorsSection: React.FC<SponsorsSectionProps> = ({ sponsors }) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/20" />
      
      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            Partenaires
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Nos Sponsors
          </h2>
          <p className="text-muted-foreground">
            Découvrez les entreprises et organisations qui soutiennent cet événement
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="group relative bg-white dark:bg-card/50 rounded-2xl p-6 border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex items-center justify-center"
            >
              {/* Image */}
              {!failedImages[sponsor.id] && (
                <img 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} logo`} 
                  className={`h-12 w-auto max-w-full object-contain transition-all duration-300 ${
                    loadedImages[sponsor.id] 
                      ? "opacity-100 scale-100 group-hover:scale-110" 
                      : "opacity-0"
                  }`}
                  onLoad={() => setLoadedImages(prev => ({ ...prev, [sponsor.id]: true }))}
                  onError={() => setFailedImages(prev => ({ ...prev, [sponsor.id]: true }))}
                />
              )}
              
              {/* Fallback */}
              {(failedImages[sponsor.id] || !loadedImages[sponsor.id]) && (
                <div className="flex flex-col items-center gap-2 animate-fade-in">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {sponsor.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground text-center">
                    {sponsor.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
