
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventSettings, getEventSettings, saveEventSettings } from "@/utils/eventSettings";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";

const SettingsTab = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<EventSettings>(getEventSettings());
  const [isSaving, setIsSaving] = useState(false);

  const handleSettingsChange = (key: keyof EventSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleMenuItemChange = (index: number, value: string) => {
    const newMenuItems = [...settings.menuItems];
    newMenuItems[index] = value;
    setSettings(prev => ({ ...prev, menuItems: newMenuItems }));
  };

  const saveSettings = () => {
    setIsSaving(true);
    try {
      saveEventSettings(settings);
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
        <Settings className="mr-2 h-5 w-5" />
        Paramètres de l'Événement
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de l'événement
            </label>
            <Input 
              value={settings.eventName} 
              onChange={(e) => handleSettingsChange('eventName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date de l'événement
            </label>
            <Input 
              value={settings.eventDate} 
              onChange={(e) => handleSettingsChange('eventDate', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lieu de l'événement
            </label>
            <Input 
              value={settings.eventLocation} 
              onChange={(e) => handleSettingsChange('eventLocation', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description de l'événement
          </label>
          <Textarea 
            value={settings.eventDescription} 
            onChange={(e) => handleSettingsChange('eventDescription', e.target.value)}
            rows={4}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Éléments du menu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settings.menuItems.map((item, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Élément {index + 1}
                </label>
                <Input 
                  value={item} 
                  onChange={(e) => handleMenuItemChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={saveSettings}
          disabled={isSaving}
        >
          {isSaving ? 'Sauvegarde en cours...' : 'Sauvegarder les modifications'}
        </Button>
      </div>
    </Card>
  );
};

export default SettingsTab;
