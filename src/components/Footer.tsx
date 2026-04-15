import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-bold tracking-tight mb-4">
              NorSa <span className="font-light">TEXTILE</span>
            </h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              {t(
                "Laadukkaita tekstiilejä yrityksille – painatuksella tai brodeerauksella.",
                "Premium textiles for businesses – with printing or embroidery."
              )}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t("Yhteystiedot", "Contact")}
            </h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p>info@norsatextile.fi</p>
              <p>{t("Y-tunnus", "Business ID")}: [placeholder]</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t("Sivusto", "Navigation")}
            </h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p>{t("Tuotteet", "Products")}</p>
              <p>{t("Palvelut", "Services")}</p>
              <p>{t("Tietoa meistä", "About Us")}</p>
              <p>{t("Referenssit", "References")}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} NorSa Textile OY. {t("Kaikki oikeudet pidätetään.", "All rights reserved.")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
