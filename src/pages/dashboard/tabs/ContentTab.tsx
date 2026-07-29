
import React, { useState } from "react";
import { BarChart, Image, LinkIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ContentTab = () => {
  const { toast } = useToast();
  const [statistics, setStatistics] = useState({
    visitors: "1500",
    sponsors: "12", 
    exhibitors: "45",
    speakers: "30"
  });
  const [socialMedia, setSocialMedia] = useState({
    facebook: { enabled: true, url: "https://facebook.com/your-page" },
    instagram: { enabled: true, url: "https://instagram.com/your-account" },
    tiktok: { enabled: false, url: "https://tiktok.com/@your-account" },
    linkedin: { enabled: true, url: "https://linkedin.com/company/your-company" }
  });
  
  const handleSocialMediaChange = (platform, field, value) => {
    setSocialMedia(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
  };

  const handleStatisticChange = (key, value) => {
    setStatistics(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSave = () => {
    // Save statistics to localStorage
    localStorage.setItem('eventStatistics', JSON.stringify(statistics));
    
    toast({
      title: "Contenu sauvegardé",
      description: "Vos modifications ont été enregistrées avec succès.",
    });
  };
  
  return (
    <Card className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Gestion du Contenu</h2>
      
      <div className="space-y-8">
        {/* Banner section */}
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Image className="mr-2 h-5 w-5" /> Bannières du Slider
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="aspect-video bg-gray-100 flex items-center justify-center mb-2">
                  <span className="text-gray-400">Image {index}</span>
                </div>
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="mb-2"
                />
                <Input 
                  placeholder={`Titre bannière ${index}`} 
                  className="mb-2" 
                />
                <Textarea 
                  placeholder={`Description bannière ${index}`} 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Statistics section */}
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <BarChart className="mr-2 h-5 w-5" /> Statistiques des éditions précédentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre de visiteurs
              </label>
              <Input 
                type="number" 
                value={statistics.visitors}
                onChange={(e) => handleStatisticChange('visitors', e.target.value)}
                placeholder="ex: 1500" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre de sponsors
              </label>
              <Input 
                type="number" 
                value={statistics.sponsors}
                onChange={(e) => handleStatisticChange('sponsors', e.target.value)}
                placeholder="ex: 12" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre d'exposants
              </label>
              <Input 
                type="number" 
                value={statistics.exhibitors}
                onChange={(e) => handleStatisticChange('exhibitors', e.target.value)}
                placeholder="ex: 45" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre d'intervenants
              </label>
              <Input 
                type="number" 
                value={statistics.speakers}
                onChange={(e) => handleStatisticChange('speakers', e.target.value)}
                placeholder="ex: 30" 
              />
            </div>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <LinkIcon className="mr-2 h-5 w-5" /> Liens réseaux sociaux
          </h3>
          
          <div className="space-y-4">
            {/* Facebook */}
            <div className="flex items-start gap-4 border p-4 rounded-md">
              <div className="flex items-center h-6">
                <Checkbox 
                  id="facebook" 
                  checked={socialMedia.facebook.enabled}
                  onCheckedChange={(checked) => handleSocialMediaChange('facebook', 'enabled', checked)}
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="facebook" className="text-base font-medium">Facebook</Label>
                <Input 
                  value={socialMedia.facebook.url} 
                  onChange={(e) => handleSocialMediaChange('facebook', 'url', e.target.value)}
                  disabled={!socialMedia.facebook.enabled}
                  placeholder="https://facebook.com/your-page" 
                />
              </div>
            </div>
            
            {/* Instagram */}
            <div className="flex items-start gap-4 border p-4 rounded-md">
              <div className="flex items-center h-6">
                <Checkbox 
                  id="instagram" 
                  checked={socialMedia.instagram.enabled}
                  onCheckedChange={(checked) => handleSocialMediaChange('instagram', 'enabled', checked)}
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="instagram" className="text-base font-medium">Instagram</Label>
                <Input 
                  value={socialMedia.instagram.url} 
                  onChange={(e) => handleSocialMediaChange('instagram', 'url', e.target.value)}
                  disabled={!socialMedia.instagram.enabled}
                  placeholder="https://instagram.com/your-account" 
                />
              </div>
            </div>
            
            {/* TikTok */}
            <div className="flex items-start gap-4 border p-4 rounded-md">
              <div className="flex items-center h-6">
                <Checkbox 
                  id="tiktok" 
                  checked={socialMedia.tiktok.enabled}
                  onCheckedChange={(checked) => handleSocialMediaChange('tiktok', 'enabled', checked)}
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="tiktok" className="text-base font-medium">TikTok</Label>
                <Input 
                  value={socialMedia.tiktok.url} 
                  onChange={(e) => handleSocialMediaChange('tiktok', 'url', e.target.value)}
                  disabled={!socialMedia.tiktok.enabled}
                  placeholder="https://tiktok.com/@your-account" 
                />
              </div>
            </div>
            
            {/* LinkedIn */}
            <div className="flex items-start gap-4 border p-4 rounded-md">
              <div className="flex items-center h-6">
                <Checkbox 
                  id="linkedin" 
                  checked={socialMedia.linkedin.enabled}
                  onCheckedChange={(checked) => handleSocialMediaChange('linkedin', 'enabled', checked)}
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="linkedin" className="text-base font-medium">LinkedIn</Label>
                <Input 
                  value={socialMedia.linkedin.url} 
                  onChange={(e) => handleSocialMediaChange('linkedin', 'url', e.target.value)}
                  disabled={!socialMedia.linkedin.enabled}
                  placeholder="https://linkedin.com/company/your-company" 
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Sponsor Logos */}
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Image className="mr-2 h-5 w-5" /> Logos des Sponsors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="aspect-video bg-gray-100 flex items-center justify-center mb-2">
                  <span className="text-gray-400">Logo {index}</span>
                </div>
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="mb-2"
                />
                <Input 
                  placeholder={`Nom du sponsor ${index}`} 
                />
              </div>
            ))}
          </div>
        </div>
        
        <Button onClick={handleSave}>
          Sauvegarder les modifications
        </Button>
      </div>
    </Card>
  );
};

export default ContentTab;
