
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Book, MapPin, LayoutGrid, FileText } from "lucide-react";
import { getDocuments, incrementDownloadCount } from "@/utils/documentSettings";

interface Document {
  id: string;
  title: string;
  description: string;
  iconName: string;
  fileUrl: string;
}

export const DocumentsSection: React.FC = () => {
  const documents = getDocuments();

  const handleDownload = (documentId: string, fileUrl: string) => {
    // If no file is uploaded yet, don't do anything
    if (!fileUrl) return;
    
    // Increment download count
    incrementDownloadCount(documentId);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = documentId;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Documents Utiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {documents.map((doc) => {
            // Select icon based on iconName
            let IconComponent;
            switch(doc.iconName) {
              case 'book': IconComponent = Book; break;
              case 'map-pin': IconComponent = MapPin; break;
              case 'layout-grid': IconComponent = LayoutGrid; break;
              case 'file-text': IconComponent = FileText; break;
              default: IconComponent = FileText;
            }
            
            return (
              <Card key={doc.id} className="bg-white shadow hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <IconComponent className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{doc.description}</p>
                  <Button 
                    variant={doc.fileUrl ? "default" : "outline"} 
                    className="mt-auto flex items-center"
                    disabled={!doc.fileUrl}
                    onClick={() => handleDownload(doc.id, doc.fileUrl)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {doc.fileUrl ? "Télécharger" : "Bientôt disponible"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
