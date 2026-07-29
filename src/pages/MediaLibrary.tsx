
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video } from "lucide-react";
import { getMediaItems, MediaItem } from "@/utils/mediaSettings";

const MediaLibrary = () => {
  const [mediaItems] = useState<MediaItem[]>(getMediaItems());
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  const photos = mediaItems.filter(item => item.type === 'photo');
  const videos = mediaItems.filter(item => item.type === 'video');

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Médiathèque</h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Découvrez les photos et vidéos des éditions précédentes
        </p>

        <Tabs
          defaultValue="photos"
          onValueChange={(value) => setActiveTab(value as 'photos' | 'videos')}
          className="max-w-4xl mx-auto"
        >
          <TabsList className="grid grid-cols-2 mb-8">
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
            {photos.length === 0 ? (
              <div className="text-center text-gray-500">
                Aucune photo disponible pour le moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((item, index) => (
                  <div key={index} className="overflow-hidden rounded-lg shadow-md bg-white">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos">
            {videos.length === 0 ? (
              <div className="text-center text-gray-500">
                Aucune vidéo disponible pour le moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.map((item, index) => (
                  <div key={index} className="overflow-hidden rounded-lg shadow-md bg-white">
                    <div className="aspect-video">
                      <iframe
                        src={item.url}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MediaLibrary;
