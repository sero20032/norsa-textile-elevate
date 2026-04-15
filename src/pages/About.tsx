import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="py-24 px-4 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            {t("Tietoa meistä", "About Us")}
          </h1>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              {t(
                "NorSa Textile OY on suomalainen tekstiilialan yritys, joka on erikoistunut laadukkaiden yritystekstiilien toimittamiseen. Tarjoamme kattavan valikoiman tuotteita huppareista t-paitoihin ja lippispainoista brodeerauksiin.",
                "NorSa Textile OY is a Finnish textile company specializing in delivering premium corporate textiles. We offer a comprehensive range of products from hoodies to t-shirts, with printing and embroidery services."
              )}
            </p>
            <p>
              {t(
                "Palvelemme yrityksiä kaikenkokoisissa tilauksissa – pienistä promootiotuotteista suuriin yritysvaatetilauksiin. Asiakastyytyväisyys ja laatu ovat toimintamme kulmakivet.",
                "We serve businesses with orders of all sizes – from small promotional products to large corporate clothing orders. Customer satisfaction and quality are the cornerstones of our operations."
              )}
            </p>
            <p>
              {t(
                "Ota yhteyttä ja kerro tarpeistasi – löydämme yhdessä parhaan ratkaisun yrityksellesi.",
                "Get in touch and tell us about your needs – together we'll find the best solution for your business."
              )}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
