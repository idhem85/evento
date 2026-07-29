import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Facebook, Instagram, Twitter, Linkedin,
  LayoutDashboard, QrCode, ChevronRight,
  Calendar, MapPin
} from "lucide-react";
import { getEventSettings } from "@/utils/eventSettings";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/about", label: "À propos" },
  { to: "/register?type=visitor", label: "Inscription", highlight: true },
  { to: "/contact", label: "Contact" },
];

const quickActions = [
  { to: "/scanner", label: "Scanner", icon: QrCode, variant: "outline" as const },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, variant: "default" as const },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const settings = getEventSettings();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("fr");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname + location.search]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    const basePath = path.split("?")[0];
    return location.pathname === basePath || location.pathname.startsWith(basePath + "/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* ===== STICKY NAV ===== */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/40" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {settings.logoUrl ? (
                <div className="relative">
                  <img src={settings.logoUrl} alt={settings.appName} className="h-9 w-9 rounded-xl object-cover ring-2 ring-primary/20 transition-all group-hover:ring-primary/40 group-hover:scale-105" />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-base shadow-lg shadow-primary/25 group-hover:shadow-primary/40 group-hover:scale-105 transition-all">
                  E
                </div>
              )}
              <div className="hidden sm:block">
                <span className="font-bold text-base text-foreground">{settings.appName}</span>
                {settings.eventDate && (
                  <p className="text-[10px] text-muted-foreground -mt-0.5">{settings.eventDate}</p>
                )}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? "text-primary bg-primary/10"
                      : link.highlight
                      ? "text-primary hover:bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Quick Actions */}
              <div className="hidden md:flex items-center gap-2">
                {quickActions.map((action) => (
                  <Link key={action.to} to={action.to}>
                    <Button 
                      variant={action.variant}
                      size="sm"
                      className={`gap-1.5 text-xs h-9 rounded-xl ${
                        action.variant === "default" 
                          ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" 
                          : "border-border/60 hover:border-primary/30 hover:text-primary"
                      }`}
                    >
                      <action.icon className="h-3.5 w-3.5" />
                      <span className="hidden xl:inline">{action.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>

              {/* Language Toggle */}
              <div className="hidden md:flex items-center gap-1 bg-muted/60 rounded-xl p-0.5 border border-border/40">
                <button
                  onClick={() => setLanguage("fr")}
                  className={`px-2.5 py-1 rounded-[10px] text-[11px] font-semibold tracking-wider transition-all ${
                    language === "fr" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2.5 py-1 rounded-[10px] text-[11px] font-semibold tracking-wider transition-all ${
                    language === "en" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden relative h-10 w-10 flex items-center justify-center rounded-xl hover:bg-muted/60 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <div className="relative h-5 w-5">
                  <span className={`absolute left-0 block h-0.5 w-full bg-foreground rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`} />
                  <span className={`absolute left-0 top-1/2 block h-0.5 w-full bg-foreground rounded-full -translate-y-1/2 transition-all duration-200 ${
                    mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`} />
                  <span className={`absolute left-0 block h-0.5 w-full bg-foreground rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ===== MOBILE MENU ===== */}
        <div className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-4 space-y-3">
              {/* Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.to)
                        ? "bg-primary/10 text-primary"
                        : link.highlight
                        ? "text-primary bg-primary/5 hover:bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="border-t border-border/30 pt-3 space-y-2">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-4">
                  Actions rapides
                </p>
                <div className="grid grid-cols-2 gap-2 px-1">
                  <Link to="/scanner">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/10 transition-all">
                      <QrCode className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-foreground">Scanner</span>
                    </div>
                  </Link>
                  <Link to="/dashboard">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all">
                      <LayoutDashboard className="h-5 w-5" />
                      <span className="text-sm font-medium">Dashboard</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Language */}
              <div className="border-t border-border/30 pt-3 px-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Langue :</span>
                  <button
                    onClick={() => setLanguage("fr")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      language === "fr" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    }`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      language === "en" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main className="pt-16 md:pt-20 min-h-screen animate-fade-in">
        {children}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="relative mt-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-primary/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 sm:px-6">
          {/* Main Footer Grid */}
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Brand - 4 columns */}
              <div className="lg:col-span-4 space-y-4">
                <Link to="/" className="flex items-center gap-3 group">
                  {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt={settings.appName} className="h-10 w-10 rounded-xl ring-2 ring-primary/20" />
                  ) : (
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                      E
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-lg text-foreground">{settings.appName}</span>
                  </div>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  {settings.eventDescription || "Application moderne de gestion d'événements avec inscriptions, badges digitaux et contrôle d'accès."}
                </p>
                {settings.eventDate && settings.eventLocation && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 rounded-lg text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {settings.eventDate}
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 rounded-lg text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {settings.eventLocation}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation - 3 columns */}
              <div className="lg:col-span-3">
                <h4 className="font-semibold text-sm text-foreground mb-4">Navigation</h4>
                <ul className="space-y-2.5">
                  {[...navLinks, { to: "/scanner", label: "Scan Badge" }, { to: "/dashboard", label: "Dashboard" }].map((link) => (
                    <li key={link.to}>
                      <Link 
                        to={link.to} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group/link"
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="h-3 w-3 opacity-0 -ml-1 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inscription - 3 columns */}
              <div className="lg:col-span-3">
                <h4 className="font-semibold text-sm text-foreground mb-4">Inscription</h4>
                <ul className="space-y-2.5">
                  <li>
                    <Link to="/register?type=visitor" className="text-sm text-muted-foreground hover:text-primary transition-colors">Visiteur</Link>
                  </li>
                  <li>
                    <Link to="/register?type=exhibitor" className="text-sm text-muted-foreground hover:text-primary transition-colors">Exposant</Link>
                  </li>
                  <li>
                    <Link to="/register?type=press" className="text-sm text-muted-foreground hover:text-primary transition-colors">Presse</Link>
                  </li>
                  <li>
                    <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Connexion Organisateur</Link>
                  </li>
                </ul>
              </div>

              {/* Social - 2 columns */}
              <div className="lg:col-span-2">
                <h4 className="font-semibold text-sm text-foreground mb-4">Suivez-nous</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      className="h-10 w-10 rounded-xl bg-muted/60 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {settings.appName}. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Mentions légales
              </Link>
              <Link to="/contact" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
