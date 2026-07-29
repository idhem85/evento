import * as z from "zod";

export const visitorFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  phone: z.string().min(8, { message: "Veuillez entrer un numéro de téléphone valide." }),
  organization: z.string().optional(),
});

export const exhibitorFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  phone: z.string().min(8, { message: "Veuillez entrer un numéro de téléphone valide." }),
  organization: z.string().min(2, { message: "Veuillez entrer le nom de votre organisme." }),
  formula: z.enum(["formule1", "formule2", "formule3"], {
    required_error: "Veuillez choisir une formule.",
  }),
});

export const pressFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  phone: z.string().min(8, { message: "Veuillez entrer un numéro de téléphone valide." }),
  media: z.string().min(2, { message: "Veuillez entrer le nom de votre média." }),
});

export type VisitorFormData = z.infer<typeof visitorFormSchema>;
export type ExhibitorFormData = z.infer<typeof exhibitorFormSchema>;
export type PressFormData = z.infer<typeof pressFormSchema>;

export type VisitorType = "visitor" | "exhibitor" | "press";

export interface Participant {
  id: string;
  type: VisitorType;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  media?: string;
  formula?: string;
  pressCard?: string | null;
  photo?: string | null;
  registrationDate: string;
  scanned: boolean;
}
