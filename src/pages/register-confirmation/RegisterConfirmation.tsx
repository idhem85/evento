
import React, { useRef } from "react";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/Badge";
import { Card, CardContent } from "@/components/ui/card";
import { getEventSettings } from "@/utils/eventSettings";
import { ApprovalPendingAlert } from "./ApprovalPendingAlert";
import { ParticipantDetails } from "./ParticipantDetails";
import { BadgeDownloadButtons } from "./BadgeDownloadButtons";
import { downloadBadgeAsImage, downloadBadgeAsPDF } from "./badgeUtils";
import { useParticipant } from "./useParticipant";

const RegisterConfirmation = () => {
  const { toast } = useToast();
  const { participant } = useParticipant();
  const badgeRef = useRef<HTMLDivElement>(null);
  const settings = getEventSettings();

  if (!participant) {
    return <Layout><div>Loading...</div></Layout>;
  }

  const qrCodeData = JSON.stringify({
    id: participant.id,
    name: participant.name,
    email: participant.email,
    type: participant.type || "visitor",
    organization: participant.organization,
    media: participant.media,
    formula: participant.formula,
    registrationDate: participant.registrationDate,
    eventName: settings.eventName
  });

  const handleDownloadAsImage = () => {
    downloadBadgeAsImage(badgeRef, participant.name);
  };

  const handleDownloadAsPDF = () => {
    downloadBadgeAsPDF(badgeRef, participant.name);
  };

  const getConfirmationMessage = () => {
    switch(participant.type) {
      case "exhibitor":
        return participant.approved 
          ? `Merci pour votre réservation d'espace d'exposition, ${participant.name}!` 
          : `Votre demande d'espace d'exposition est en attente d'approbation, ${participant.name}.`;
      case "press":
        return participant.approved 
          ? `Votre demande d'accréditation presse a été approuvée, ${participant.name}!` 
          : `Votre demande d'accréditation presse est en attente de validation, ${participant.name}.`;
      default:
        return `Merci pour votre inscription, ${participant.name}!`;
    }
  };

  const requiresApproval = (participant.type === "exhibitor" || participant.type === "press");
  const isPending = requiresApproval && participant.approved !== true;

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-4">Confirmation d'Inscription</h1>
            <p className="text-gray-700 mb-4">
              {getConfirmationMessage()}
              {participant.type === "visitor" && " Voici votre badge d'accès à l'événement."}
              {participant.type === "exhibitor" && !isPending && " Notre équipe vous contactera bientôt pour finaliser les détails de votre stand."}
              {participant.type === "press" && !isPending && " Votre badge sera disponible au bureau d'accueil presse le jour de l'événement."}
            </p>

            {isPending ? (
              <ApprovalPendingAlert participantType={participant.type || ""} />
            ) : (
              <>
                <div className="flex flex-col items-center justify-center mb-6">
                  <Badge 
                    ref={badgeRef}
                    id={participant.id}
                    name={participant.name}
                    email={participant.email}
                    organization={participant.organization}
                    type={participant.type}
                    photo={participant.photo}
                  />
                </div>

                <ParticipantDetails 
                  type={participant.type || "visitor"}
                  formula={participant.formula}
                  organization={participant.organization}
                  media={participant.media}
                />

                <BadgeDownloadButtons 
                  onDownloadImage={handleDownloadAsImage}
                  onDownloadPDF={handleDownloadAsPDF}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RegisterConfirmation;
