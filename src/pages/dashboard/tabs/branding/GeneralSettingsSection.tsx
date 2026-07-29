
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EventSettings } from "@/utils/eventSettings";

interface GeneralSettingsSectionProps {
  settings: EventSettings;
  onSettingsChange: (key: keyof EventSettings, value: any) => void;
}

const GeneralSettingsSection: React.FC<GeneralSettingsSectionProps> = ({
  settings,
  onSettingsChange
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Nom de l'application
          </Label>
          <Input 
            value={settings.appName} 
            onChange={(e) => onSettingsChange('appName', e.target.value)}
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Nom de l'événement
          </Label>
          <Input 
            value={settings.eventName} 
            onChange={(e) => onSettingsChange('eventName', e.target.value)}
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Date de l'événement
          </Label>
          <Input 
            value={settings.eventDate} 
            onChange={(e) => onSettingsChange('eventDate', e.target.value)}
          />
        </div>
        
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Lieu de l'événement
          </Label>
          <Input 
            value={settings.eventLocation} 
            onChange={(e) => onSettingsChange('eventLocation', e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-1">
          Description de l'événement
        </Label>
        <Input 
          value={settings.eventDescription || ''} 
          onChange={(e) => onSettingsChange('eventDescription', e.target.value)}
        />
      </div>
    </div>
  );
};

export default GeneralSettingsSection;
