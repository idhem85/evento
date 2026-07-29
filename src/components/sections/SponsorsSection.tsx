
import React from "react";

interface Sponsor {
  id: number;
  name: string;
  logo: string;
}

interface SponsorsSectionProps {
  sponsors: Sponsor[];
}

export const SponsorsSection: React.FC<SponsorsSectionProps> = ({ sponsors }) => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Nos Sponsors</h2>
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="flex items-center justify-center p-4">
              <img 
                src={sponsor.logo} 
                alt={`${sponsor.name} logo`} 
                className="max-h-16 max-w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
