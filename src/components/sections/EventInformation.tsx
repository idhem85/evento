
import React from "react";
import { getEventSettings } from "@/utils/eventSettings";

export const EventInformation: React.FC = () => {
  const settings = getEventSettings();
  
  // Apply the branding colors
  const primaryColor = settings.primaryColor || "#9b87f5";
  
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10" style={{ color: primaryColor }}>À Propos de l'Événement</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-700 mb-8">{settings.eventDescription}</p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3" style={{ color: primaryColor }}>Date</h3>
              <p className="text-gray-700">{settings.eventDate}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3" style={{ color: primaryColor }}>Lieu</h3>
              <p className="text-gray-700">{settings.eventLocation}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3" style={{ color: primaryColor }}>Badges</h3>
              <p className="text-gray-700">Inscription obligatoire</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
