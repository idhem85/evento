import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, BookOpen, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { pressFormSchema, PressFormData } from "./RegisterSchemas";
import { PhotoUpload } from "./PhotoUpload";
import { generateId, saveParticipant } from "@/utils/participantStorage";

export const PressForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [pressCardUrl, setPressCardUrl] = useState<string | null>(null);

  const form = useForm<PressFormData>({
    resolver: zodResolver(pressFormSchema),
    defaultValues: { name: "", email: "", phone: "", media: "" },
  });

  const onSubmit = async (data: PressFormData) => {
    try {
      saveParticipant({
        id: generateId(),
        type: "press",
        name: data.name,
        email: data.email,
        phone: data.phone,
        media: data.media,
        pressCard: pressCardUrl,
        photo: photoUrl,
        registrationDate: new Date().toISOString(),
        scanned: false,
      });

      toast({ title: "Accréditation réussie", description: "Votre demande d'accréditation a été enregistrée." });
      navigate("/register-confirmation");
    } catch {
      toast({ title: "Échec de l'accréditation", description: "Une erreur s'est produite.", variant: "destructive" });
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <FormField control={form.control} name="media" render={({ field }) => (
          <FormItem>
            <FormLabel><BookOpen className="h-3.5 w-3.5 mr-1.5 inline" />Média</FormLabel>
            <FormControl><Input placeholder="Nom de votre média" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <PhotoUpload
          value={pressCardUrl}
          onChange={setPressCardUrl}
          label="Carte de presse"
          hint="Téléchargez votre carte de presse"
          variant="rectangle"
        />
        <PhotoUpload
          value={photoUrl}
          onChange={setPhotoUrl}
          label="Photo d'identité"
          hint="Ajoutez une photo pour votre badge"
        />
        <Button type="submit" className="w-full gap-2 h-11 text-base" size="lg">
          <CreditCard className="h-5 w-5" />Demander mon accréditation
        </Button>
      </form>
    </Form>
  );
};
