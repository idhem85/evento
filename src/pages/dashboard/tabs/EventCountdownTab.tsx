
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getEventSettings, saveEventSettings } from "@/utils/eventSettings";
import { Clock, CalendarIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const EventCountdownTab = () => {
  const { toast } = useToast();
  const settings = getEventSettings();
  
  const [eventDate, setEventDate] = useState(settings.eventDate?.split(" ")[0] || "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isCountdownVisible, setIsCountdownVisible] = useState(
    settings.countdownVisible !== undefined ? settings.countdownVisible : true
  );
  const [countdownStyle, setCountdownStyle] = useState("default");
  const [backgroundColor, setBackgroundColor] = useState(
    settings.countdownBackgroundColor || "#F7DE45"
  );
  const [textColor, setTextColor] = useState(
    settings.countdownTextColor || "#12644F"
  );
  const [isSaving, setIsSaving] = useState(false);

  // Parse existing date if available
  React.useEffect(() => {
    const dateParts = eventDate.split('/');
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed in Date
      const year = parseInt(dateParts[2], 10);
      
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        setSelectedDate(new Date(year, month, day));
      }
    }
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, 'dd/MM/yyyy');
      setEventDate(formattedDate);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Update the event settings with countdown configuration
    const updatedSettings = {
      ...settings,
      eventDate: eventDate + (settings.eventDate?.includes(" ") 
        ? " " + settings.eventDate.split(" ").slice(1).join(" ") 
        : ""),
      countdownVisible: isCountdownVisible,
      countdownBackgroundColor: backgroundColor,
      countdownTextColor: textColor,
      countdownStyle: countdownStyle
    };
    
    try {
      saveEventSettings(updatedSettings);
      toast({
        title: "Paramètres sauvegardés",
        description: "Les paramètres du compte à rebours ont été mis à jour avec succès.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres du compte à rebours.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Paramètres du Compte à Rebours</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="eventDate">Date de l'événement</Label>
            <div className="flex flex-col space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-gray-500">ou saisir manuellement (Format: JJ/MM/AAAA)</p>
              <Input 
                id="eventDate"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="showCountdown">Afficher le compte à rebours</Label>
              <Switch 
                id="showCountdown" 
                checked={isCountdownVisible} 
                onCheckedChange={setIsCountdownVisible}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Style du compte à rebours</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={countdownStyle === "default" ? "default" : "outline"} 
                onClick={() => setCountdownStyle("default")}
              >
                Standard
              </Button>
              <Button 
                variant={countdownStyle === "minimal" ? "default" : "outline"} 
                onClick={() => setCountdownStyle("minimal")}
              >
                Minimal
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bgColor">Couleur d'arrière-plan</Label>
              <div className="flex gap-2 items-center">
                <div 
                  className="h-8 w-8 rounded-md border" 
                  style={{ backgroundColor: backgroundColor }}
                />
                <Input
                  id="bgColor"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="textColor">Couleur du texte</Label>
              <div className="flex gap-2 items-center">
                <div 
                  className="h-8 w-8 rounded-md border" 
                  style={{ backgroundColor: textColor }}
                />
                <Input
                  id="textColor"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Aperçu</h3>
          <div className="p-4 rounded-md" style={{ backgroundColor: backgroundColor }}>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold" style={{ color: textColor }}>24</span>
                <span className="uppercase font-bold" style={{ color: textColor }}>Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold" style={{ color: textColor }}>12</span>
                <span className="uppercase font-bold" style={{ color: textColor }}>Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold" style={{ color: textColor }}>45</span>
                <span className="uppercase font-bold" style={{ color: textColor }}>Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold" style={{ color: textColor }}>30</span>
                <span className="uppercase font-bold" style={{ color: textColor }}>Seconds</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Position du compte à rebours</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline">Sous le slider</Button>
              <Button variant="outline">Section dédiée</Button>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleSave} 
        disabled={isSaving}
        className="mt-4"
      >
        {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
      </Button>
    </Card>
  );
};

export default EventCountdownTab;
