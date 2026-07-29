
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EventSettings } from "@/utils/eventSettings";
import { Separator } from "@/components/ui/separator";

interface ColorSettingsSectionProps {
  settings: EventSettings;
  onSettingsChange: (key: keyof EventSettings, value: any) => void;
}

const ColorSettingsSection: React.FC<ColorSettingsSectionProps> = ({
  settings,
  onSettingsChange
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Primary Color */}
        <div className="space-y-4">
          <Label className="block text-base font-medium">
            Couleur Principale
          </Label>
          <div className="space-y-2">
            <div className="flex gap-4 items-center">
              <div className="w-8 h-8 rounded-full border" style={{backgroundColor: settings.primaryColor}} />
              <Input 
                type="color"
                value={settings.primaryColor}
                onChange={(e) => onSettingsChange('primaryColor', e.target.value)}
                className="w-16 h-10"
              />
              <Input 
                value={settings.primaryColor}
                onChange={(e) => onSettingsChange('primaryColor', e.target.value)}
                className="w-32"
              />
            </div>
            <p className="text-sm">Aperçu:</p>
            <Button style={{backgroundColor: settings.primaryColor}}>Bouton Principal</Button>
          </div>
        </div>
        
        {/* Secondary Color */}
        <div className="space-y-4">
          <Label className="block text-base font-medium">
            Couleur Secondaire
          </Label>
          <div className="space-y-2">
            <div className="flex gap-4 items-center">
              <div className="w-8 h-8 rounded-full border" style={{backgroundColor: settings.secondaryColor}} />
              <Input 
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => onSettingsChange('secondaryColor', e.target.value)}
                className="w-16 h-10"
              />
              <Input 
                value={settings.secondaryColor}
                onChange={(e) => onSettingsChange('secondaryColor', e.target.value)}
                className="w-32"
              />
            </div>
            <p className="text-sm">Aperçu:</p>
            <Button variant="outline" style={{borderColor: settings.secondaryColor, color: settings.secondaryColor}}>
              Bouton Secondaire
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mt-4 mb-2">Prévisualisation des couleurs</h3>
        <Separator className="my-4" />
        <div className="p-6 border rounded-lg">
          <div className="flex gap-4 flex-wrap">
            <Button style={{backgroundColor: settings.primaryColor}}>
              Bouton Principal
            </Button>
            <Button variant="outline" style={{borderColor: settings.secondaryColor, color: settings.secondaryColor}}>
              Bouton Secondaire
            </Button>
            <Button variant="ghost" style={{color: settings.primaryColor}}>
              Bouton Fantôme
            </Button>
            <Button variant="link" style={{color: settings.primaryColor}}>
              Bouton Lien
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSettingsSection;
