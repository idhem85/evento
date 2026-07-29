import React from "react";
import { getEventSettings } from "@/utils/eventSettings";
import { Calendar, MapPin, BadgeCheck, Users, Clock } from "lucide-react";

export const EventInformation: React.FC = () => {
  const settings = getEventSettings();

  const stats = [
    { icon: Users, label: "Participants", value: "500+" },
    { icon: Clock, label: "Durée", value: "2 jours" },
    { icon: BadgeCheck, label: "Conférences", value: "20+" },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            L'Événement
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            À Propos de l'Événement
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {settings.eventDescription || "Un événement unique pour découvrir les dernières innovations, rencontrer des experts et développer votre réseau professionnel."}
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {/* Date Card */}
          <div className="group relative bg-white dark:bg-card/50 rounded-2xl p-8 border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 animate-fade-in">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] rounded-tr-2xl transition-all group-hover:bg-primary/10" />
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Date</h3>
              <p className="text-muted-foreground">{settings.eventDate || "À venir"}</p>
            </div>
          </div>

          {/* Location Card */}
          <div className="group relative bg-white dark:bg-card/50 rounded-2xl p-8 border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] rounded-tr-2xl transition-all group-hover:bg-primary/10" />
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Lieu</h3>
              <p className="text-muted-foreground">{settings.eventLocation || "À déterminer"}</p>
            </div>
          </div>

          {/* Badges Card */}
          <div className="group relative bg-white dark:bg-card/50 rounded-2xl p-8 border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] rounded-tr-2xl transition-all group-hover:bg-primary/10" />
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BadgeCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Badges</h3>
              <p className="text-muted-foreground">Inscription obligatoire — Badge digital offert</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/10">
            <div className="grid grid-cols-3 gap-8">
              {stats.map(({ icon: Icon, label, value }, i) => (
                <div key={label} className="text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
