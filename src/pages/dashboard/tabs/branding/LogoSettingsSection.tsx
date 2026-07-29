
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EventSettings } from "@/utils/eventSettings";
import { Upload } from "lucide-react";

interface LogoSettingsSectionProps {
  settings: EventSettings;
  previewLogo: string | null;
  setPreviewLogo: (url: string | null) => void;
}

const LogoSettingsSection: React.FC<LogoSettingsSectionProps> = ({
  settings,
  previewLogo,
  setPreviewLogo
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewLogo(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Logo de l'application
      </label>
      <div className="flex items-start gap-6">
        <div className="w-32 h-32 flex justify-center items-center border rounded bg-gray-50">
          {previewLogo ? (
            <img 
              src={previewLogo} 
              alt="Logo" 
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-gray-400 text-center">
              <Upload className="h-10 w-10 mx-auto mb-2" />
              <span>Aucun logo</span>
            </div>
          )}
        </div>
        <div className="space-y-4 flex-1">
          <input 
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Télécharger une image
          </Button>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Ou entrez une URL</p>
            <Input 
              value={previewLogo || ''} 
              onChange={(e) => setPreviewLogo(e.target.value || null)}
              placeholder="https://votre-domaine.com/logo.png"
            />
            <p className="text-xs text-gray-500">
              Formats supportés: PNG, JPG, SVG. Taille recommandée : 200x200px
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSettingsSection;
