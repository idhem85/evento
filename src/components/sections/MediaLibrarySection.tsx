
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

export const MediaLibrarySection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Médiathèque</h2>
        <p className="text-center text-xl text-gray-600 mb-10">Découvrez les photos et vidéos des éditions précédentes</p>
        <div className="flex justify-center">
          <Button asChild size="lg" className="flex items-center">
            <Link to="/media">
              <Image className="mr-2 h-5 w-5" />
              Visiter la Médiathèque
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
