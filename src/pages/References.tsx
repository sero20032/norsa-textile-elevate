import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";

const References: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="py-24 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Referenssit", "References")}
          </h1>
          <p className="text-muted-foreground mb-16">
            {t(
              "Asiakkaidemme luottamus on meille tärkeintä.",
              "Our clients' trust means everything to us."
            )}
          </p>

          {/* Placeholder grid for future logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/2] rounded-lg bg-secondary flex items-center justify-center"
              >
                <span className="text-sm text-muted-foreground">{t("Logo", "Logo")}</span>
              </div>
            ))}
          </div>

          {/* Placeholder testimonials */}
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="border-l-2 border-border pl-6">
                <p className="text-muted-foreground italic mb-2">
                  "{t(
                    "Erinomaista palvelua ja laadukkaita tuotteita. Suosittelemme lämpimästi.",
                    "Excellent service and quality products. Highly recommended."
                  )}"
                </p>
                <p className="text-sm font-medium">
                  — {t("Yrityksen nimi", "Company Name")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default References;
