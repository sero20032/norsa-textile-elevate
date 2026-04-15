import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/tuotteet", label: t("Tuotteet", "Products") },
    { to: "/palvelut", label: t("Palvelut", "Services") },
    { to: "/tietoa", label: t("Tietoa meistä", "About Us") },
    { to: "/referenssit", label: t("Referenssit", "References") },
    { to: "/yhteystiedot", label: t("Yhteystiedot", "Contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-foreground">
            NorSa <span className="font-light">TEXTILE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                location.pathname === link.to
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {lang === "fi" ? "EN" : "FI"}
          </button>
          <Link to="/tarjous">
            <Button variant="nav" size="sm">
              {t("Pyydä tarjous", "Request a Quote")}
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="text-sm font-medium text-muted-foreground"
          >
            {lang === "fi" ? "EN" : "FI"}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium py-2 text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/tarjous" onClick={() => setMobileOpen(false)}>
              <Button variant="nav" size="sm" className="w-full mt-2">
                {t("Pyydä tarjous", "Request a Quote")}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
