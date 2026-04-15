import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    title_fi: "Painatus",
    title_en: "Printing",
    desc_fi: "Laadukas silkkipaino ja digitaalinen painatus yrityksesi tarpeisiin. Soveltuu suurille ja pienille erille.",
    desc_en: "High-quality screen printing and digital printing for your business needs. Suitable for large and small batches.",
  },
  {
    title_fi: "Brodeeraus",
    title_en: "Embroidery",
    desc_fi: "Tarkka ja kestävä brodeeraus, joka antaa tuotteellesi ammattimaisen ilmeen.",
    desc_en: "Precise and durable embroidery that gives your product a professional look.",
  },
  {
    title_fi: "Yritysvaatteet",
    title_en: "Corporate Wear",
    desc_fi: "Räätälöidyt yritysvaatekokoelmat brändisi näköisiksi. Suunnittelusta toimitukseen.",
    desc_en: "Customized corporate clothing collections to match your brand. From design to delivery.",
  },
  {
    title_fi: "Promootiotuotteet",
    title_en: "Promotional Products",
    desc_fi: "Laadukkaat promootiotuotteet tapahtumiin ja kampanjoihin.",
    desc_en: "Quality promotional products for events and campaigns.",
  },
];

const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="py-24 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Palvelut", "Services")}
          </h1>
          <p className="text-muted-foreground mb-16 max-w-xl">
            {t(
              "Tarjoamme monipuolisia tekstiilipalveluita yrityksille.",
              "We offer versatile textile services for businesses."
            )}
          </p>

          <div className="space-y-12">
            {services.map((s, i) => (
              <div key={i} className="border-b border-border pb-12 last:border-0">
                <h2 className="text-2xl font-semibold mb-4">
                  {t(s.title_fi, s.title_en)}
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {t(s.desc_fi, s.desc_en)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/tarjous">
              <Button variant="default" size="lg" className="px-10">
                {t("Pyydä tarjous", "Request a Quote")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
