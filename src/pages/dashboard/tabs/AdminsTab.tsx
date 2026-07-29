
import React, { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
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
import { Admin } from "../types";
import { Card } from "@/components/ui/card";
import { from } from "@/integrations/supabase/client";

const AdminsTab = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await from('admin_profiles')
          .select('*');

        if (error) {
          console.error("Error fetching admin profiles:", error);
          // Fallback to mock data
          setAdmins([
            {
              id: "1",
              name: "Admin Principal",
              email: "admin@example.com",
              role: "admin",
              lastLogin: new Date().toISOString(),
            },
            {
              id: "2",
              name: "Scanner User",
              email: "scanner@example.com",
              role: "scanner",
              lastLogin: new Date(Date.now() - 86400000).toISOString(),
            },
          ]);
        } else if (data && data.length > 0) {
          // Map Supabase admin profiles to our Admin type
          // Ensure role is properly typed as "admin" | "scanner" | "viewer"
          const mappedAdmins = data.map(admin => ({
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role as "admin" | "scanner" | "viewer",
            lastLogin: admin.last_login,
          }));
          setAdmins(mappedAdmins);
        } else {
          // If no data, set default admins
          setAdmins([
            {
              id: "1",
              name: "Admin Principal",
              email: "admin@example.com",
              role: "admin",
              lastLogin: new Date().toISOString(),
            },
          ]);
        }
      } catch (e) {
        console.error("Error in admin fetch:", e);
        // Fallback to mock data
        setAdmins([
          {
            id: "1",
            name: "Admin Principal",
            email: "admin@example.com",
            role: "admin",
            lastLogin: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <Card className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gestion des Administrateurs</h2>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Nouvel Admin
        </Button>
      </div>

      {isLoading ? (
        <p>Chargement des administrateurs...</p>
      ) : (
        <Table>
          <TableCaption>Administrateurs et leurs rôles</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Dernière connexion</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  {admin.role === 'admin' && <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Administrateur</span>}
                  {admin.role === 'scanner' && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Scanner</span>}
                  {admin.role === 'viewer' && <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Lecteur</span>}
                </TableCell>
                <TableCell>{admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : "-"}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm">Modifier</Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">Supprimer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="mt-8 p-4 border rounded-lg">
        <h3 className="font-medium mb-2">Rôles disponibles</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs mr-2">Administrateur</span>
            <span>Accès complet à toutes les fonctionnalités</span>
          </li>
          <li className="flex items-center">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-2">Scanner</span>
            <span>Peut scanner les QR codes et voir la liste des participants</span>
          </li>
          <li className="flex items-center">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2">Lecteur</span>
            <span>Peut uniquement consulter la liste des participants</span>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default AdminsTab;
