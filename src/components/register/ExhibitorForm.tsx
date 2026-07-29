import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Building2, Store, Radio, Square, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { exhibitorFormSchema, ExhibitorFormData } from "./RegisterSchemas";
import { PhotoUpload } from "./PhotoUpload";
import { generateId, saveParticipant } from "@/utils/participantStorage";

const formulas = [
  {
    id: "formule1" as const,
    name: "Formule 1",
    size: "9 m²",
    icon: Radio,
    desc: "Stand nu",
    perks: ["Stand nu", "Visibilité Logo", "Invitations / Badges"],
  },
  {
    id: "formule2" as const,
    name: "Formule 2",
    size: "12 m²",
    icon: Square,
    desc: "Stand équipé",
    perks: ["Stand équipé", "Visibilité Logo", "Invitations / Badges"],
  },
  {
    id: "formule3" as const,
    name: "Formule 3",
    size: "16 m²",
    icon: Maximize,
    desc: "Stand premium",
    perks: ["Stand premium", "Visibilité Logo", "Invitations / Badges"],
  },
];

const formulaIcons: Record<string, React.ReactNode> = {
  formule1: <Radio className="h-4 w-4" />,
  formule2: <Square className="h-4 w-4" />,
  formule3: <Maximize className="h-4 w-4" />,
};

export const ExhibitorForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const form = useForm<ExhibitorFormData>({
    resolver: zodResolver(exhibitorFormSchema),
    defaultValues: { name: "", email: "", phone: "", organization: "", formula: "formule1" },
  });

  const onSubmit = async (data: ExhibitorFormData) => {
    try {
      saveParticipant({
        id: generateId(),
        type: "exhibitor",
        name: data.name,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        formula: data.formula,
        photo: photoUrl,
        registrationDate: new Date().toISOString(),
        scanned: false,
      });

      toast({ title: "Réservation réussie", description: "Votre demande de stand a été enregistrée." });
      navigate("/register-confirmation");
    } catch {
      toast({ title: "Échec de la réservation", description: "Une erreur s'est produite.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      {/* Pricing cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" />
          Nos formules d'exposition
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {formulas.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.id} className="bg-card border border-border/60 rounded-xl p-4 space-y-2 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-sm">{f.name}</h4>
                </div>
                <p className="text-2xl font-bold text-primary">{f.size}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
                <ul className="space-y-1">
                  {f.perks.map((p, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">• {p}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

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
          <FormField control={form.control} name="organization" render={({ field }) => (
            <FormItem>
              <FormLabel><Building2 className="h-3.5 w-3.5 mr-1.5 inline" />Organisme</FormLabel>
              <FormControl><Input placeholder="Nom de votre organisme" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="formula" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5"><Store className="h-3.5 w-3.5" />Choisissez votre formule</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {formulas.map((f) => (
                    <label key={f.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/40 ${
                      field.value === f.id ? "border-primary bg-primary/5" : "border-border"
                    }`}>
                      <RadioGroupItem value={f.id} id={f.id} />
                      <div className="flex items-center gap-2">
                        {formulaIcons[f.id]}
                        <span className="text-sm font-medium">{f.name}</span>
                        <span className="text-xs text-muted-foreground">({f.size})</span>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <PhotoUpload value={photoUrl} onChange={setPhotoUrl} label="Photo (optionnel)" hint="Ajoutez une photo pour votre badge" />
          <Button type="submit" className="w-full gap-2 h-11 text-base" size="lg">
            <Store className="h-5 w-5" />Réserver mon stand
          </Button>
        </form>
      </Form>
    </div>
  );
};
