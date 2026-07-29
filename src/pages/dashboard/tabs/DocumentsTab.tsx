
import React, { useState } from "react";
import { FileText, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getDocuments, saveDocuments, DocumentItem } from "@/utils/documentSettings";

const DocumentsTab = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<DocumentItem[]>(getDocuments());
  const [isUploading, setIsUploading] = useState(false);

  const handleDocumentChange = (index: number, key: keyof DocumentItem, value: string) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index] = { ...updatedDocuments[index], [key]: value };
    setDocuments(updatedDocuments);
  };

  const handleFileUpload = (index: number, file: File | null) => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate file upload delay
    setTimeout(() => {
      const updatedDocuments = [...documents];
      updatedDocuments[index] = { 
        ...updatedDocuments[index], 
        fileUrl: URL.createObjectURL(file),
        fileName: file.name
      };
      setDocuments(updatedDocuments);
      setIsUploading(false);
      
      toast({
        title: "Fichier téléchargé",
        description: `${file.name} a été téléchargé avec succès.`,
      });
    }, 1500);
  };

  const saveChanges = () => {
    saveDocuments(documents);
    toast({
      title: "Documents sauvegardés",
      description: "Les documents ont été mis à jour avec succès.",
    });
  };

  return (
    <Card className="bg-white rounded-lg shadow">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Gestion des Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {documents.map((doc, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre du document
                  </label>
                  <Input
                    value={doc.title}
                    onChange={(e) => handleDocumentChange(index, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Input
                    value={doc.description}
                    onChange={(e) => handleDocumentChange(index, 'description', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléchargements
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 px-3 py-2 rounded-md text-gray-700 font-medium">
                      {doc.downloadCount}
                    </span>
                    <Download className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fichier PDF
                  </label>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(index, e.target.files?.[0] || null)}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex items-center mt-6">
                  {doc.fileName && (
                    <span className="text-sm text-gray-500 mr-2">
                      {doc.fileName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            onClick={saveChanges}
            disabled={isUploading}
            className="mt-4"
          >
            {isUploading ? 'Téléchargement en cours...' : 'Sauvegarder les modifications'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsTab;
