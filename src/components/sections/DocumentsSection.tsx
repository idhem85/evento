import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, MapPin, LayoutGrid, FileText, FileDown, BookOpen } from "lucide-react";
import { getDocuments, incrementDownloadCount } from "@/utils/documentSettings";

const iconMap: Record<string, React.ElementType> = {
  book: Book,
  "map-pin": MapPin,
  "layout-grid": LayoutGrid,
  "file-text": FileText,
  "book-open": BookOpen,
};

const colorMap: Record<string, string> = {
  book: "from-violet-500 to-purple-600",
  "map-pin": "from-emerald-500 to-teal-600",
  "layout-grid": "from-blue-500 to-indigo-600",
  "file-text": "from-amber-500 to-orange-600",
  "book-open": "from-rose-500 to-pink-600",
};

export const DocumentsSection: React.FC = () => {
  const documents = getDocuments();

  const handleDownload = (documentId: string, fileUrl: string) => {
    if (!fileUrl) return;
    incrementDownloadCount(documentId);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = documentId;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            Ressources
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Documents Utiles
          </h2>
          <p className="text-muted-foreground">
            Téléchargez les documents et ressources essentiels pour l'événement
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {documents.map((doc, i) => {
            const IconComponent = iconMap[doc.iconName] || FileText;
            const gradient = colorMap[doc.iconName] || "from-primary to-primary/80";
            
            return (
              <div key={doc.id} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <Card className={`group h-full bg-white dark:bg-card/50 border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 ${
                  !doc.fileUrl ? "opacity-70" : ""
                }`}>
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    {/* Icon with gradient */}
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-foreground mb-2">{doc.title}</h3>
                    
                    {/* Description */}
                    <p className="text-xs text-muted-foreground mb-5 flex-grow">{doc.description}</p>

                    {/* Download Button */}
                    <Button 
                      variant={doc.fileUrl ? "default" : "outline"}
                      size="sm"
                      className={`mt-auto w-full rounded-xl gap-1.5 text-xs ${
                        doc.fileUrl 
                          ? `bg-gradient-to-r ${gradient} text-white shadow-lg hover:shadow-xl transition-all`
                          : "border-dashed"
                      }`}
                      disabled={!doc.fileUrl}
                      onClick={() => handleDownload(doc.id, doc.fileUrl)}
                    >
                      <FileDown className="h-3.5 w-3.5" />
                      {doc.fileUrl ? "Télécharger" : "Bientôt disponible"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
