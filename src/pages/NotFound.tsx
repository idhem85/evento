
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-6">
        <div className="flex justify-center mb-6">
          <QrCode className="h-20 w-20 text-primary/40" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page non trouvée</h2>
        <p className="text-gray-500 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button asChild>
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
