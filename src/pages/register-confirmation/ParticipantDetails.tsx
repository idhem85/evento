
import React from "react";

interface ParticipantDetailsProps {
  type: string;
  formula?: string;
  organization?: string;
  media?: string;
}

export const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({ 
  type, 
  formula, 
  organization, 
  media 
}) => {
  if (type === "exhibitor") {
    return (
      <div className="bg-blue-50 p-4 rounded mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">Détails de votre réservation:</h3>
        <ul className="text-sm text-gray-700">
          <li><strong>Formule:</strong> {formula === "formule1" ? "Formule 1 (9 m²)" : 
                                    formula === "formule2" ? "Formule 2 (12 m²)" : 
                                    "Formule 3 (16 m²)"}</li>
          <li><strong>Organisation:</strong> {organization}</li>
        </ul>
      </div>
    );
  }

  if (type === "press") {
    return (
      <div className="bg-blue-50 p-4 rounded mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">Détails de votre accréditation:</h3>
        <p className="text-sm text-gray-700"><strong>Média:</strong> {media}</p>
      </div>
    );
  }

  return null;
};
