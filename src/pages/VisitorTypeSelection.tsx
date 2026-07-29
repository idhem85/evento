
import React from "react";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Store, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const VisitorTypeSelection = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-3">Inscription à l'événement</h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Veuillez sélectionner votre profil pour continuer l'inscription
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Visiteur individuel */}
          <Card className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <User className="mx-auto h-12 w-12 text-primary" />
              <CardTitle className="mt-4">Visiteur Participant</CardTitle>
              <CardDescription>
                Pour les particuliers souhaitant assister à l'événement
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Accès aux conférences générales</li>
                <li>• Visite de l'exposition</li>
                <li>• Participation aux ateliers ouverts</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center pt-2 pb-6">
              <Button asChild size="lg">
                <Link to="/register?type=visitor">S'inscrire</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Exposant */}
          <Card className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Store className="mx-auto h-12 w-12 text-primary" />
              <CardTitle className="mt-4">Exposant</CardTitle>
              <CardDescription>
                Pour les entreprises souhaitant exposer à l'événement
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Espace d'exposition dédié</li>
                <li>• Présentation dans le catalogue officiel</li>
                <li>• Accès aux espaces VIP</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center pt-2 pb-6">
              <Button asChild size="lg">
                <Link to="/register?type=exhibitor">S'inscrire</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Presse */}
          <Card className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="mx-auto h-12 w-12 text-primary" />
              <CardTitle className="mt-4">Presse</CardTitle>
              <CardDescription>
                Pour les journalistes et médias
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Accès à l'espace presse</li>
                <li>• Interviews avec les conférenciers</li>
                <li>• Kit média et communiqués exclusifs</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center pt-2 pb-6">
              <Button asChild size="lg">
                <Link to="/register?type=press">S'inscrire</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default VisitorTypeSelection;
