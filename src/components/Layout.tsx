import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Menu, X } from "lucide-react";
import { getEventSettings } from "@/utils/eventSettings";

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/about", label: "À propos" },
  { to: "/register?type=visitor", label: "Visiter" },
  { to: "/register?type=exhibitor", label: "Exposer" },
  { to: "/register?type=press", label: "Presse" },
  { to: "/contact", label: "Contact" },
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

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname + location.search]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path.split("?")[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Sticky Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-border/50" : "bg-white"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt={settings.appName} className="h-8 w-8 rounded-lg transition-transform group-hover:scale-105" />
              ) : (
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  E
                </div>
              )}
              <span className="font-bold text-lg text-foreground">{settings.appName}</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              {/* Language toggle */}
              <div className="hidden md:flex items-center gap-1.5 bg-muted/50 rounded-lg p-1">
                <button
                  onClick={() => setLanguage("fr")}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${
                    language === "fr" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${
                    language === "en" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <div className="relative h-5 w-5">
                  <span className={`absolute top-0 left-0 h-0.5 w-full bg-foreground rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`} />
                  <span className={`absolute top-1/2 left-0 h-0.5 w-full bg-foreground rounded-full -translate-y-1/2 transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`} />
                  <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-foreground rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - animated */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="border-t border-border/50 bg-white/95 backdrop-blur-xl px-4 py-3 space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile language */}
            <div className="flex items-center gap-2 pt-2 px-3">
              <span className="text-xs text-muted-foreground">Langue :</span>
              <button
                onClick={() => setLanguage("fr")}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  language === "fr" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  language === "en" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16 animate-fade-in">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-3">
              <Link to="/" className="flex items-center gap-2">
                {settings.logoUrl ? (
                  <img src={settings.logoUrl} alt={settings.appName} className="h-8 w-8 rounded-lg" />
                ) : (
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">E</div>
                )}
                <span className="font-bold text-lg">{settings.appName}</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {settings.eventDescription || "Application de gestion d'événements"}
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Navigation</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Suivez-nous</h4>
              <div className="flex gap-2">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 pt-6 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {settings.appName}. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
