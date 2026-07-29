
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { EventSettings } from "@/utils/eventSettings";
import { useToast } from "@/hooks/use-toast";
import { saveEventSettings } from "@/utils/eventSettings";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our new components
import GeneralSettingsSection from "./branding/GeneralSettingsSection";
import ColorSettingsSection from "./branding/ColorSettingsSection";
import LogoSettingsSection from "./branding/LogoSettingsSection";

interface BrandingTabProps {
  initialSettings?: EventSettings;
}

const BrandingTab = ({ initialSettings }: BrandingTabProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<EventSettings>(initialSettings || {
    appName: 'Event Manager',
    eventName: 'Mon Événement',
    eventDate: 'Non spécifié',
    eventLocation: 'Non spécifié',
    eventDescription: '',
    menuItems: ['Accueil', 'À propos', 'Inscription', 'Contact'],
    logoUrl: null,
    primaryColor: '#9b87f5',
    secondaryColor: '#6E59A5',
    bannerUrl: null,
    countdownVisible: true,
    countdownBackgroundColor: '#F7DE45',
    countdownTextColor: '#12644F',
    countdownStyle: 'default'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [previewLogo, setPreviewLogo] = useState<string | null>(settings.logoUrl);

  const handleSettingsChange = (key: keyof EventSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    setIsSaving(true);
    try {
      // Update settings with the preview logo if it exists
      const updatedSettings = {
        ...settings,
        logoUrl: previewLogo
      };
      
      saveEventSettings(updatedSettings);
      
      toast({
        title: "Paramètres sauvegardés",
        description: "Les paramètres de l'événement ont été mis à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde des paramètres.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Card className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Palette className="mr-2 h-5 w-5" /> 
        Personnalisation de la marque
      </h2>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="colors">Couleurs</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <GeneralSettingsSection 
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        </TabsContent>
        
        <TabsContent value="colors">
          <ColorSettingsSection 
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        </TabsContent>
        
        <TabsContent value="logo">
          <LogoSettingsSection 
            settings={settings}
            previewLogo={previewLogo}
            setPreviewLogo={setPreviewLogo}
          />
        </TabsContent>
      </Tabs>
      
      <Button 
        onClick={saveSettings}
        disabled={isSaving}
        className="mt-6"
      >
        {isSaving ? "Enregistrement..." : "Appliquer les changements"}
      </Button>
    </Card>
  );
};

export default BrandingTab;
