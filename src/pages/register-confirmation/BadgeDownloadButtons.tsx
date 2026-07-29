
import React from "react";
import { Button } from "@/components/ui/button";
import { FileImage, FileText } from "lucide-react";

interface BadgeDownloadButtonsProps {
  onDownloadImage: () => void;
  onDownloadPDF: () => void;
}

export const BadgeDownloadButtons: React.FC<BadgeDownloadButtonsProps> = ({
  onDownloadImage,
  onDownloadPDF
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button 
        onClick={onDownloadImage} 
        className="flex-1"
      >
        <FileImage className="mr-2 h-4 w-4" />
        Télécharger en PNG
      </Button>
      
      <Button 
        onClick={onDownloadPDF} 
        className="flex-1 bg-primary/80 hover:bg-primary"
      >
        <FileText className="mr-2 h-4 w-4" />
        Télécharger en PDF
      </Button>
    </div>
  );
};
