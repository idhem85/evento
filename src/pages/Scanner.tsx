
import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QrScanner } from "@/components/QrScanner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, from } from "@/integrations/supabase/client";

interface Participant {
  id: string;
  name: string;
  email: string;
  photo?: string;
  registrationDate: string;
  scanned: boolean;
}

const Scanner = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [scanning, setScanning] = useState(true);
  const [lastScanned, setLastScanned] = useState<Participant | null>(null);

  const handleScanResult = async (result: string) => {
    try {
      const scannedData = JSON.parse(result);
      
      if (!scannedData.id || !scannedData.name || !scannedData.email) {
        throw new Error('Invalid QR code data');
      }
      
      // Fetch participant from Supabase
      const { data: participant, error: fetchError } = await from('participants')
        .select('*')
        .eq('id', scannedData.id)
        .single();
      
      if (fetchError || !participant) {
        toast({
          title: "Participant Non Trouvé",
          description: "Ce QR code n'est associé à aucun participant inscrit.",
          variant: "destructive",
        });
        return;
      }
      
      // Map Supabase participant to our format
      const mappedParticipant = {
        id: participant.id,
        name: participant.name,
        email: participant.email,
        photo: participant.photo,
        registrationDate: participant.registration_date,
        scanned: participant.scanned,
      };
      
      // Check if already scanned
      if (participant.scanned) {
        toast({
          title: "Déjà Scanné",
          description: `${participant.name} a déjà été scanné.`,
          variant: "default",
        });
        setLastScanned(mappedParticipant);
        return;
      }
      
      // Update participant as scanned in Supabase
      const { error: updateError } = await from('participants')
        .update({ scanned: true })
        .eq('id', participant.id);
        
      if (updateError) {
        console.error('Error updating participant scan status:', updateError);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le statut du participant.",
          variant: "destructive",
        });
        return;
      }
      
      // Show success message
      toast({
        title: "Validation Réussie",
        description: `${participant.name} a été enregistré.`,
        variant: "default",
      });
      
      // Set last scanned participant and update its scanned status
      mappedParticipant.scanned = true;
      setLastScanned(mappedParticipant);
      
      // Pause scanning briefly
      setScanning(false);
      setTimeout(() => setScanning(true), 3000);
      
    } catch (error) {
      console.error('Error processing QR code:', error);
      toast({
        title: "QR Code Invalide",
        description: "Le QR code scanné n'est pas valide.",
        variant: "destructive",
      });
    }
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Scanner de Code QR</h1>
          <Button asChild>
            <Link to="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Tableau de bord
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {scanning ? (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">Scannez le QR Code du Participant</h2>
              <div className="max-w-md w-full">
                <QrScanner onResult={handleScanResult} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">Scan en pause</h2>
              <p>Reprendra automatiquement dans quelques secondes...</p>
            </div>
          )}

          {lastScanned && (
            <div className="mt-8 border-t pt-4">
              <h3 className="font-medium text-lg mb-2">Dernier Participant Scanné</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p><strong>Nom:</strong> {lastScanned.name}</p>
                <p><strong>Email:</strong> {lastScanned.email}</p>
                <p><strong>Statut:</strong> {lastScanned.scanned ? 'Enregistré' : 'Non Enregistré'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Scanner;
