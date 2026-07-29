
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Store, BookOpen } from "lucide-react";

export const VisitorCategories: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Qui êtes-vous ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <User className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Visiteur Participant</h3>
              <p className="text-gray-600 mb-6">Pour les particuliers souhaitant assister à l'événement</p>
              <Button asChild className="mt-auto">
                <Link to="/register?type=visitor">S'inscrire</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Store className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Exposant</h3>
              <p className="text-gray-600 mb-6">Pour les entreprises souhaitant exposer à l'événement</p>
              <Button asChild className="mt-auto">
                <Link to="/register?type=exhibitor">S'inscrire</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Presse</h3>
              <p className="text-gray-600 mb-6">Pour les journalistes souhaitant couvrir l'événement</p>
              <Button asChild className="mt-auto">
                <Link to="/register?type=press">S'inscrire</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
