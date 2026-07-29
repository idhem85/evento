import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Building2, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { visitorFormSchema, VisitorFormData } from "./RegisterSchemas";
import { PhotoUpload } from "./PhotoUpload";
import { generateId, saveParticipant } from "@/utils/participantStorage";

interface VisitorFormProps {
  onSuccess?: () => void;
}

export const VisitorForm: React.FC<VisitorFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const form = useForm<VisitorFormData>({
    resolver: zodResolver(visitorFormSchema),
    defaultValues: { name: "", email: "", phone: "", organization: "" },
  });

  const onSubmit = async (data: VisitorFormData) => {
    try {
      saveParticipant({
        id: generateId(),
        type: "visitor",
        name: data.name,
        email: data.email,
        phone: data.phone,
        organization: data.organization || "",
        photo: photoUrl,
        registrationDate: new Date().toISOString(),
        scanned: false,
      });

      toast({ title: "Inscription réussie", description: "Votre e-badge a été généré avec succès." });
      navigate("/register-confirmation");
      onSuccess?.();
    } catch {
      toast({ title: "Échec de l'inscription", description: "Une erreur s'est produite.", variant: "destructive" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel><User className="h-3.5 w-3.5 mr-1.5 inline" />Nom & Prénom</FormLabel>
            <FormControl><Input placeholder="Votre nom et prénom" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel><Mail className="h-3.5 w-3.5 mr-1.5 inline" />Email</FormLabel>
            <FormControl><Input placeholder="Votre email" type="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel><Phone className="h-3.5 w-3.5 mr-1.5 inline" />Téléphone</FormLabel>
            <FormControl><Input placeholder="Votre numéro" type="tel" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="organization" render={({ field }) => (
          <FormItem>
            <FormLabel><Building2 className="h-3.5 w-3.5 mr-1.5 inline" />Organisme <span className="text-muted-foreground font-normal">(optionnel)</span></FormLabel>
            <FormControl><Input placeholder="Nom de votre organisme" {...field} /></FormControl>
            <FormDescription className="text-xs">Ce champ est optionnel</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
        <PhotoUpload value={photoUrl} onChange={setPhotoUrl} label="Photo pour le badge" hint="Prenez ou téléchargez une photo" />
        <Button type="submit" className="w-full gap-2 h-11 text-base" size="lg">
          <BadgeCheck className="h-5 w-5" />Obtenir mon E-Badge
        </Button>
      </form>
    </Form>
  );
};
