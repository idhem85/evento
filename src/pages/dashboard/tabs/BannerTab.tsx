
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getEventSettings, saveEventSettings } from "@/utils/eventSettings";
import { Image } from "lucide-react";
import { Label } from "@/components/ui/label";

const BannerTab = () => {
  const { toast } = useToast();
  const settings = getEventSettings();
  
  const [bannerUrl, setBannerUrl] = useState<string>(settings.bannerUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewBanner, setPreviewBanner] = useState<string>(settings.bannerUrl || 'https://via.placeholder.com/1200x400?text=Event+Banner');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerUrl(e.target.value);
    setPreviewBanner(e.target.value || 'https://via.placeholder.com/1200x400?text=Event+Banner');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setBannerUrl(event.target.result);
          setPreviewBanner(event.target.result);
        }
        setIsUploading(false);
      };
      
      reader.onerror = () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to read the file.",
        });
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    try {
      const updatedSettings = {
        ...settings,
        bannerUrl: bannerUrl || null
      };
      
      saveEventSettings(updatedSettings);
      
      toast({
        title: "Banner Saved",
        description: "The event banner has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save the banner settings.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Image className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Paramètres de la Bannière</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <div className="mb-4">
            <Label className="text-lg font-medium">Aperçu de la Bannière</Label>
            <div className="mt-2 border rounded-lg overflow-hidden">
              <img 
                src={previewBanner} 
                alt="Preview" 
                className="w-full h-[300px] object-cover" 
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/1200x400?text=Preview+Unavailable';
                }}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Télécharger une image</Label>
              <Input 
                id="file-upload"
                type="file" 
                onChange={handleFileUpload}
                accept="image/*"
                disabled={isUploading}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="banner-url">Ou entrer une URL d'image</Label>
              <Input 
                id="banner-url"
                value={bannerUrl} 
                onChange={handleUrlChange}
                placeholder="https://example.com/banner-image.jpg"
                className="mt-2"
              />
            </div>
            
            <Button 
              onClick={handleSave} 
              disabled={isSaving || isUploading}
              className="mt-4"
              style={{
                backgroundColor: settings.primaryColor,
                color: "white"
              }}
            >
              {isSaving ? "Sauvegarde en cours..." : "Sauvegarder la Bannière"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BannerTab;
