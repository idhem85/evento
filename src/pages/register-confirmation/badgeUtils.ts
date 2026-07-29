
import { toast } from "@/hooks/use-toast";
import generatePDF from "react-to-pdf";

export const downloadBadgeAsImage = (badgeRef: React.RefObject<HTMLDivElement>, participantName: string) => {
  if (!badgeRef.current) {
    toast({
      title: "Erreur",
      description: "Impossible de générer le badge.",
      variant: "destructive",
    });
    return;
  }

  try {
    import('html2canvas').then(html2canvas => {
      html2canvas.default(badgeRef.current!).then(canvas => {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = `badge_${participantName.replace(/\s+/g, "_")}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Badge Téléchargé",
          description: "Le badge a été téléchargé avec succès au format image.",
        });
      });
    });
  } catch (error) {
    console.error("Error downloading badge as image:", error);
    toast({
      title: "Erreur",
      description: "Impossible de télécharger le badge.",
      variant: "destructive",
    });
  }
};

export const downloadBadgeAsPDF = async (badgeRef: React.RefObject<HTMLDivElement>, participantName: string) => {
  if (!badgeRef.current) {
    toast({
      title: "Erreur",
      description: "Impossible de générer le badge.",
      variant: "destructive",
    });
    return;
  }

  try {
    await generatePDF(() => badgeRef.current, {
      filename: `badge_${participantName.replace(/\s+/g, "_")}.pdf`,
      page: {
        margin: 10,
        format: [400, 600],
      }
    });
    
    toast({
      title: "Badge Téléchargé",
      description: "Le badge a été téléchargé avec succès au format PDF.",
    });
  } catch (error) {
    console.error("Error downloading badge as PDF:", error);
    toast({
      title: "Erreur",
      description: "Impossible de télécharger le badge au format PDF.",
      variant: "destructive",
    });
  }
};
