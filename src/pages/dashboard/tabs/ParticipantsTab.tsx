import React, { useState, useEffect } from "react";
import { Download, Users, Check, X, Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Participant } from "../types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getParticipants, getExhibitors, getPressMembers, updateParticipant } from "@/utils/participantUtils";

const ParticipantsTab = () => {
  const { toast } = useToast();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [exhibitors, setExhibitors] = useState<Participant[]>([]);
  const [pressMembers, setPressMembers] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAllParticipants = async () => {
    try {
      setIsLoading(true);
      const loadedParticipants = await getParticipants();
      const loadedExhibitors = await getExhibitors();
      const loadedPressMembers = await getPressMembers();
      
      setParticipants(loadedParticipants);
      setExhibitors(loadedExhibitors);
      setPressMembers(loadedPressMembers);
    } catch (error) {
      console.error('Error loading participants:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données des participants",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load all participant types
    loadAllParticipants();
  }, [toast]);

  const handleApprove = async (participant: Participant, type: string) => {
    try {
      const updatedParticipant = { ...participant, approved: true };
      await updateParticipant(updatedParticipant, type);
      
      toast({
        title: "Participation approuvée",
        description: `La participation de ${participant.name} a été approuvée.`,
      });
      
      // Update local state
      if (type === 'exhibitors') {
        setExhibitors(exhibitors.map(p => p.id === participant.id ? updatedParticipant : p));
      } else if (type === 'press') {
        setPressMembers(pressMembers.map(p => p.id === participant.id ? updatedParticipant : p));
      }
      
      // Simulate email sending
      setTimeout(() => {
        toast({
          title: "Email envoyé",
          description: `Email de confirmation envoyé à ${participant.email}`,
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error approving participant:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'approuver la participation",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (participant: Participant, type: string) => {
    try {
      const updatedParticipant = { ...participant, approved: false };
      await updateParticipant(updatedParticipant, type);
      
      toast({
        title: "Participation rejetée",
        description: `La participation de ${participant.name} a été rejetée.`,
      });
      
      // Update local state
      if (type === 'exhibitors') {
        setExhibitors(exhibitors.map(p => p.id === participant.id ? updatedParticipant : p));
      } else if (type === 'press') {
        setPressMembers(pressMembers.map(p => p.id === participant.id ? updatedParticipant : p));
      }
    } catch (error) {
      console.error('Error rejecting participant:', error);
      toast({
        title: "Erreur",
        description: "Impossible de rejeter la participation",
        variant: "destructive",
      });
    }
  };

  const exportParticipantData = (data: Participant[], type: string) => {
    if (data.length === 0) {
      toast({
        title: "Export impossible",
        description: `Aucun ${type} à exporter`,
        variant: "destructive",
      });
      return;
    }

    try {
      const headers = ["Nom", "Email", "Téléphone", "Organisation", "Date d'inscription", "Scanné"];
      const csvContent = [
        headers.join(','),
        ...data.map(p => 
          [
            p.name,
            p.email,
            p.phone || "",
            p.organization || "",
            new Date(p.registrationDate).toLocaleDateString(),
            p.scanned ? "Oui" : "Non"
          ].join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `${type}_${new Date().toLocaleDateString()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export réussi",
        description: `La liste des ${type} a été exportée au format CSV.`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export des données.",
        variant: "destructive",
      });
    }
  };

  const renderParticipantsTable = (data: Participant[], type?: string) => {
    if (data.length === 0) {
      return <p>Aucune donnée disponible pour le moment.</p>;
    }

    return (
      <Table>
        <TableCaption>Liste complète</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Organisation</TableHead>
            <TableHead>Date d'inscription</TableHead>
            <TableHead>Statut</TableHead>
            {(type === 'exhibitors' || type === 'press') && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell>{participant.name}</TableCell>
              <TableCell>{participant.email}</TableCell>
              <TableCell>{participant.phone || "-"}</TableCell>
              <TableCell>{participant.organization || "-"}</TableCell>
              <TableCell>{new Date(participant.registrationDate).toLocaleDateString()}</TableCell>
              <TableCell>
                {participant.scanned ? (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Scanné</span>
                ) : (
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Non Scanné</span>
                )}
                {type !== 'participants' && participant.approved !== undefined && (
                  participant.approved ? 
                    <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Approuvé</span> :
                    <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">En attente</span>
                )}
              </TableCell>
              {(type === 'exhibitors' || type === 'press') && (
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 text-green-600"
                      onClick={() => handleApprove(participant, type)}
                      disabled={participant.approved === true}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 text-red-600"
                      onClick={() => handleReject(participant, type)}
                      disabled={participant.approved === false}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {participant.approved === true && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-2 text-blue-600"
                        onClick={() => {
                          toast({
                            title: "Email envoyé",
                            description: `Email de confirmation envoyé à ${participant.email}`,
                          });
                        }}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Gestion des participants
        </h2>
        <Button variant="outline" onClick={loadAllParticipants} className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" /> Actualiser
        </Button>
      </div>

      {isLoading ? (
        <p>Chargement des données...</p>
      ) : (
        <Tabs defaultValue="participants" className="space-y-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="exhibitors">Exposants</TabsTrigger>
            <TabsTrigger value="press">Presse</TabsTrigger>
          </TabsList>
          
          <TabsContent value="participants" className="space-y-4">
            <div className="flex justify-end mb-2">
              <Button variant="outline" onClick={() => exportParticipantData(participants, 'participants')}>
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>
            {renderParticipantsTable(participants, 'participants')}
          </TabsContent>
          
          <TabsContent value="exhibitors" className="space-y-4">
            <div className="flex justify-end mb-2">
              <Button variant="outline" onClick={() => exportParticipantData(exhibitors, 'exposants')}>
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>
            {renderParticipantsTable(exhibitors, 'exhibitors')}
          </TabsContent>
          
          <TabsContent value="press" className="space-y-4">
            <div className="flex justify-end mb-2">
              <Button variant="outline" onClick={() => exportParticipantData(pressMembers, 'presse')}>
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>
            {renderParticipantsTable(pressMembers, 'press')}
          </TabsContent>
        </Tabs>
      )}
    </Card>
  );
};

export default ParticipantsTab;
