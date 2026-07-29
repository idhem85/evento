
import React, { useState, useRef } from "react";
import { Image, Video, Plus, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { getMediaItems, saveMediaItems, MediaItem } from "@/utils/mediaSettings";

const MediaTab = () => {
  const { toast } = useToast();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(getMediaItems());
  const [newItemType, setNewItemType] = useState<'photo' | 'video'>('photo');
  const [isUploading, setIsUploading] = useState(false);
  
  // Form refs for resetting
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  
  const handleAddItem = () => {
    if (!titleRef.current?.value) {
      toast({
        title: "Titre requis",
        description: "Veuillez saisir un titre pour cet élément.",
        variant: "destructive",
      });
      return;
    }
    
    if (newItemType === 'photo' && !fileRef.current?.files?.length && !urlRef.current?.value) {
      toast({
        title: "Image requise",
        description: "Veuillez télécharger une image ou saisir une URL.",
        variant: "destructive",
      });
      return;
    }
    
    if (newItemType === 'video' && !urlRef.current?.value) {
      toast({
        title: "URL requise",
        description: "Veuillez saisir l'URL de la vidéo YouTube.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newItem: MediaItem = {
        id: `${newItemType}${Date.now()}`,
        type: newItemType,
        title: titleRef.current?.value || '',
        description: descriptionRef.current?.value || '',
        url: newItemType === 'photo' && fileRef.current?.files?.length 
          ? URL.createObjectURL(fileRef.current.files[0]) 
          : urlRef.current?.value || '',
        date: new Date().toISOString().split('T')[0]
      };
      
      // For YouTube videos, convert regular URL to embed URL if needed
      if (newItemType === 'video' && newItem.url) {
        // Handle YouTube URLs
        if (newItem.url.includes('youtube.com/watch')) {
          const videoId = new URL(newItem.url).searchParams.get('v');
          if (videoId) {
            newItem.url = `https://www.youtube.com/embed/${videoId}`;
          }
        } else if (newItem.url.includes('youtu.be/')) {
          const videoId = newItem.url.split('/').pop();
          if (videoId) {
            newItem.url = `https://www.youtube.com/embed/${videoId}`;
          }
        }
      }
      
      const updatedItems = [...mediaItems, newItem];
      setMediaItems(updatedItems);
      saveMediaItems(updatedItems);
      
      toast({
        title: "Média ajouté",
        description: `${newItem.title} a été ajouté à la médiathèque.`,
      });
      
      // Reset form
      if (titleRef.current) titleRef.current.value = '';
      if (descriptionRef.current) descriptionRef.current.value = '';
      if (urlRef.current) urlRef.current.value = '';
      if (fileRef.current) fileRef.current.value = '';
      
      setIsUploading(false);
    }, 1500);
  };
  
  const handleDeleteItem = (id: string) => {
    const updatedItems = mediaItems.filter(item => item.id !== id);
    setMediaItems(updatedItems);
    saveMediaItems(updatedItems);
    
    toast({
      title: "Élément supprimé",
      description: "L'élément a été supprimé de la médiathèque."
    });
  };
  
  const saveChanges = () => {
    saveMediaItems(mediaItems);
    toast({
      title: "Médiathèque sauvegardée",
      description: "Les modifications ont été enregistrées avec succès.",
    });
  };
  
  return (
    <Card className="bg-white rounded-lg shadow">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Image className="mr-2 h-5 w-5" />
          Gestion de la Médiathèque
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="items" className="space-y-6">
          <TabsList>
            <TabsTrigger value="items">Éléments existants</TabsTrigger>
            <TabsTrigger value="add">Ajouter un élément</TabsTrigger>
          </TabsList>
          
          <TabsContent value="items">
            <div className="space-y-6">
              <Tabs defaultValue="photos">
                <TabsList className="mb-4">
                  <TabsTrigger value="photos" className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Photos
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Vidéos
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="photos">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mediaItems.filter(item => item.type === 'photo').map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
                        <div className="aspect-square">
                          <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium truncate">{item.title}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="videos">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mediaItems.filter(item => item.type === 'video').map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
                        <div className="aspect-video">
                          <iframe 
                            src={item.url} 
                            title={item.title} 
                            className="w-full h-full"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium truncate">{item.title}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <Button onClick={saveChanges}>
                Sauvegarder les modifications
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="add">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Button
                  variant={newItemType === 'photo' ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setNewItemType('photo')}
                >
                  <Image className="h-4 w-4" />
                  Photo
                </Button>
                <Button
                  variant={newItemType === 'video' ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setNewItemType('video')}
                >
                  <Video className="h-4 w-4" />
                  Vidéo YouTube
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre
                  </label>
                  <Input
                    ref={titleRef}
                    placeholder="Titre de l'élément"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    ref={descriptionRef}
                    placeholder="Description de l'élément"
                    rows={3}
                  />
                </div>
                
                {newItemType === 'photo' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Télécharger une image
                    </label>
                    <Input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-2">ou</p>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL de l'image
                      </label>
                      <Input
                        ref={urlRef}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                )}
                
                {newItemType === 'video' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL YouTube
                    </label>
                    <Input
                      ref={urlRef}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format accepté: URL YouTube standard ou raccourcie (youtu.be)
                    </p>
                  </div>
                )}
                
                <Button 
                  onClick={handleAddItem} 
                  disabled={isUploading}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isUploading ? 'Ajout en cours...' : 'Ajouter à la médiathèque'}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MediaTab;
