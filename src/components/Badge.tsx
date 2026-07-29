import React from "react";
import QRCode from "qrcode.react";
import { Card, CardContent } from "@/components/ui/card";
import { getEventSettings } from "@/utils/eventSettings";
import { Badge as UIBadge } from "@/components/ui/badge";
import { ShieldCheck, Calendar, MapPin } from "lucide-react";

interface BadgeProps {
  id: string;
  name: string;
  email: string;
  organization?: string;
  type?: string;
  photo?: string;
}

const typeConfig = {
  visitor: { label: "Visiteur", gradient: "from-primary/20 via-primary/5 to-background", badge: "outline" as const },
  exhibitor: { label: "Exposant", gradient: "from-amber-500/20 via-amber-500/5 to-background", badge: "secondary" as const },
  press: { label: "Presse", gradient: "from-blue-500/20 via-blue-500/5 to-background", badge: "default" as const },
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ id, name, email, organization, type = "visitor", photo }, ref) => {
    const settings = getEventSettings();
    const cfg = typeConfig[type as keyof typeof typeConfig] || typeConfig.visitor;

    return (
      <div ref={ref} className="animate-scale-in">
        <Card className="w-[360px] mx-auto overflow-hidden border-0 shadow-xl">
          {/* Event header with gradient */}
          <div className={`bg-gradient-to-r ${cfg.gradient} p-5 text-center relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")` }} />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 bg-background/60 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                <ShieldCheck className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Badge Officiel</span>
              </div>
              <h2 className="font-bold text-xl text-foreground">{settings.eventName}</h2>
              <div className="flex items-center justify-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{settings.eventDate}</span>
                {settings.eventLocation && (
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{settings.eventLocation}</span>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute left-0 right-0 -top-[1px] h-3 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              {/* Left: Info */}
              <div className="flex-1 min-w-0 space-y-2">
                <UIBadge variant={cfg.badge} className="text-[10px] px-2 py-0.5">
                  {cfg.label}
                </UIBadge>
                <h3 className="font-bold text-lg text-foreground leading-tight">{name}</h3>
                {organization && (
                  <p className="text-sm text-muted-foreground">{organization}</p>
                )}
                <p className="text-xs text-muted-foreground/60 truncate">{email}</p>
              </div>

              {/* Right: Photo */}
              <div className="shrink-0">
                {photo ? (
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-border shadow-sm">
                    <img src={photo} alt={name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-border">
                    <span className="text-3xl font-bold text-primary/40">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* QR Code */}
            <div className="mt-5 pt-4 border-t border-border/50">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <QRCode value={id} size={120} level="H" includeMargin />
                </div>
                <p className="text-[10px] text-muted-foreground font-mono">
                  ID: {id.slice(0, 8).toUpperCase()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

Badge.displayName = "Badge";
