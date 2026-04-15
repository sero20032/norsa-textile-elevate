import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Mail, Building } from "lucide-react";

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="py-24 px-4 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Yhteystiedot", "Contact")}
          </h1>
          <p className="text-muted-foreground mb-16">
            {t("Ota yhteyttä – vastaamme mielellämme.", "Get in touch – we're happy to help.")}
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 mt-1 text-foreground" />
              <div>
                <h3 className="font-medium mb-1">{t("Sähköposti", "Email")}</h3>
                <a href="mailto:info@norsatextile.fi" className="text-muted-foreground hover:text-foreground transition-colors">
                  info@norsatextile.fi
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Building className="h-5 w-5 mt-1 text-foreground" />
              <div>
                <h3 className="font-medium mb-1">{t("Y-tunnus", "Business ID")}</h3>
                <p className="text-muted-foreground">[placeholder]</p>
              </div>
            </div>


          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
