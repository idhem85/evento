import React from "react";
import { useSearchParams } from "react-router-dom";
import { User, Store, BookOpen } from "lucide-react";
import { Layout } from "@/components/Layout";
import { VisitorForm } from "@/components/register/VisitorForm";
import { ExhibitorForm } from "@/components/register/ExhibitorForm";
import { PressForm } from "@/components/register/PressForm";

const config = {
  visitor: {
    title: "Inscription Visiteur",
    description: "Remplissez le formulaire pour recevoir votre badge d'accès à l'événement",
    icon: User,
  },
  exhibitor: {
    title: "Inscription Exposant",
    description: "Réservez votre espace d'exposition en remplissant le formulaire ci-dessous",
    icon: Store,
  },
  press: {
    title: "Demande d'Accréditation Presse",
    description: "Demandez votre accréditation presse pour accéder à l'espace média",
    icon: BookOpen,
  },
} as const;

const Register = () => {
  const [searchParams] = useSearchParams();
  const visitorType = (searchParams.get("type") as keyof typeof config) || "visitor";
  const { title, description, icon: Icon } = config[visitorType] || config.visitor;

  return (
    <Layout>
      <div className="container mx-auto py-6 md:py-10 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground mt-2">{description}</p>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm animate-scale-in">
            {visitorType === "exhibitor" && <ExhibitorForm />}
            {visitorType === "press" && <PressForm />}
            {(visitorType === "visitor" || !["exhibitor", "press"].includes(visitorType)) && <VisitorForm />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
