
import React from "react";
import { Card } from "@/components/ui/card";

interface ExhibitorPackage {
  id: string;
  name: string;
  size: string;
  features: string[];
  pricePerSqm: number;
  currency: string;
}

interface ExhibitorPriceTableProps {
  packages: ExhibitorPackage[];
}

export const ExhibitorPriceTable: React.FC<ExhibitorPriceTableProps> = ({ packages }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {packages.map((pkg) => (
        <Card key={pkg.id} className="overflow-hidden border-2 hover:border-primary transition-all">
          <div className="bg-muted p-6 text-center">
            <h3 className="text-xl font-bold">{pkg.name}</h3>
            <p className="text-muted-foreground">{pkg.size}</p>
            <div className="mt-4 mb-2">
              <span className="text-3xl font-bold text-primary">{pkg.pricePerSqm}</span>
              <span className="text-lg ml-1">{pkg.currency}/m²</span>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-2">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );
};
