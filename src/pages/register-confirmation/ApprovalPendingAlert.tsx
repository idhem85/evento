
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ApprovalPendingAlertProps {
  participantType: string;
}

export const ApprovalPendingAlert: React.FC<ApprovalPendingAlertProps> = ({ participantType }) => {
  return (
    <Alert className="mb-6 bg-yellow-50 border-yellow-200">
      <AlertTitle className="text-yellow-800">Demande en attente d'approbation</AlertTitle>
      <AlertDescription className="text-yellow-700">
        {participantType === "exhibitor" 
          ? "Votre demande de participation en tant qu'exposant est actuellement en cours d'examen par notre équipe. Vous recevrez un email de confirmation avec votre badge une fois votre participation approuvée." 
          : "Votre demande d'accréditation presse est en cours d'examen. Vous recevrez un email de confirmation avec votre badge une fois votre accréditation approuvée."}
      </AlertDescription>
    </Alert>
  );
};
