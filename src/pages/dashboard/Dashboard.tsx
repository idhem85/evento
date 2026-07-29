import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LogOut, Scan, LayoutDashboard, Users, FileText, Image, Settings, Palette, Clock, Megaphone, BarChart3, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getEventSettings } from "@/utils/eventSettings";
import { 
  SidebarProvider, Sidebar, SidebarHeader, SidebarContent, 
  SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarGroup, SidebarGroupLabel
} from "@/components/ui/sidebar";

import ParticipantsTab from "./tabs/ParticipantsTab";
import ContentTab from "./tabs/ContentTab";
import AdminsTab from "./tabs/AdminsTab";
import BrandingTab from "./tabs/BrandingTab";
import SettingsTab from "./tabs/SettingsTab";
import DocumentsTab from "./tabs/DocumentsTab";
import MediaTab from "./tabs/MediaTab";
import EventCountdownTab from "./tabs/EventCountdownTab";
import BannerTab from "./tabs/BannerTab";

const tabs = [
  { id: "participants", label: "Participants", icon: Users, desc: "Gérer les inscrits" },
  { id: "documents", label: "Documents", icon: FileText, desc: "Fichiers et ressources" },
  { id: "media", label: "Médiathèque", icon: Image, desc: "Photos et vidéos" },
  { id: "content", label: "Contenu", icon: BarChart3, desc: "Pages et sections" },
  { id: "banner", label: "Bannière", icon: Megaphone, desc: "Images à la une" },
  { id: "countdown", label: "Countdown", icon: Clock, desc: "Compte à rebours" },
  { id: "admins", label: "Administration", icon: Users, desc: "Gestion des admins" },
  { id: "branding", label: "Personnalisation", icon: Palette, desc: "Couleurs et logo" },
  { id: "settings", label: "Paramètres", icon: Settings, desc: "Configuration" },
];

const Dashboard = () => {
  const { toast } = useToast();
  const { isAuthenticated, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState(getEventSettings());
  const [activeTab, setActiveTab] = useState("participants");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);

    const handleSettingsChange = () => setSettings(getEventSettings());
    window.addEventListener("storage", handleSettingsChange);
    const interval = setInterval(() => setSettings(getEventSettings()), 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("storage", handleSettingsChange);
    };
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const primaryColor = settings.primaryColor || "#9b87f5";

  const renderTabContent = () => {
    const tabMap: Record<string, React.ReactNode> = {
      participants: <ParticipantsTab />,
      documents: <DocumentsTab />,
      media: <MediaTab />,
      content: <ContentTab />,
      banner: <BannerTab />,
      countdown: <EventCountdownTab />,
      admins: <AdminsTab />,
      branding: <BrandingTab initialSettings={settings} />,
      settings: <SettingsTab />,
    };
    return tabMap[activeTab] || <ParticipantsTab />;
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-gradient-to-br from-background via-background to-muted/20">
        {/* Sidebar */}
        <Sidebar className="border-r border-border/50 bg-card">
          <SidebarHeader>
            <div className="p-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-bold text-sm">Evento Manager</h1>
                  <p className="text-[10px] text-muted-foreground">Tableau de bord</p>
                </div>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="py-2">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                Gestion
              </SidebarGroupLabel>
              <SidebarMenu>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <SidebarMenuItem key={tab.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative group w-full transition-all duration-200 ${
                          isActive 
                            ? "bg-primary/10 text-primary font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-0.5 before:bg-primary before:rounded-full" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                        <div className="flex-1 flex items-center justify-between">
                          <span className="text-sm">{tab.label}</span>
                          {isActive && <ChevronRight className="h-3 w-3 text-primary" />}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border/30 p-4 space-y-2">
            <Button
              asChild
              className="w-full gap-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: primaryColor }}
            >
              <Link to="/scanner">
                <Scan className="h-4 w-4" />
                Scanner QR
              </Link>
            </Button>
            <Button variant="outline" onClick={logout} className="w-full gap-2 text-muted-foreground">
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="h-14 border-b border-border/30 bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
            <div>
              <h2 className="font-semibold text-sm">
                {tabs.find((t) => t.id === activeTab)?.label || "Dashboard"}
              </h2>
              <p className="text-[11px] text-muted-foreground">
                {tabs.find((t) => t.id === activeTab)?.desc || ""}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="hidden sm:inline">Événement :</span>
              <span className="font-medium text-foreground">{settings.eventName}</span>
            </div>
          </header>

          {/* Tab content */}
          <div className="flex-1 overflow-auto p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <p className="text-sm text-muted-foreground animate-pulse">Chargement...</p>
                </div>
              </div>
            ) : (
              <div key={activeTab} className="animate-fade-in">
                {renderTabContent()}
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
