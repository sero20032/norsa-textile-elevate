import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-textile.jpg";
import hoodiesImg from "@/assets/Fume 1 kalite.webp";
import hoodiesImg from "@/assets/Fume 1 kalite.webp";
import capsImg from "@/assets/category-caps.jpg";

const fallbackCategories = [
  { id: "1", name_fi: "Fleecetakit", name_en: "Fleece Jackets", cover_image: hoodiesImg },
  { id: "2", name_fi: "T-paidat", name_en: "T-Shirts", cover_image: "https://byyxgghbxfnahqzszcmc.supabase.co/storage/v1/object/public/products/tshirt/tshirt%20grey/grey%201%20kalite.webp" },
  { id: "3", name_fi: "Lippikset", name_en: "Caps", cover_image: capsImg },
];

const Index: React.FC = () => {
  const { t } = useLanguage();

  const { data: dbCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*");
      return data;
    },
  });

  const categories = dbCategories && dbCategories.length > 0 ? dbCategories : fallbackCategories;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="NorSa Textile premium fabrics"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 tracking-tight">
            NorSa <span className="font-light">TEXTILE</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto font-light">
            {t(
              "Laadukkaita tekstiilejä yrityksille – painatuksella tai brodeerauksella.",
              "Premium textiles for businesses – with printing or embroidery."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tarjous">
              <Button variant="hero-outline" size="lg" className="px-10 py-6 text-sm">
                {t("Pyydä tarjous", "Request a Quote")}
              </Button>
            </Link>
            <Link to="/tuotteet">
              <Button variant="hero-outline" size="lg" className="px-10 py-6 text-sm">
                {t("Tutustu tuotteisiin", "Browse Products")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t("Tuotekategoriat", "Product Categories")}
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-lg mx-auto">
            {t(
              "Tutustu valikoimaamme ja pyydä tarjous.",
              "Explore our range and request a quote."
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/tuotteet?category=${cat.name_fi}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg"
              >
                <img
                  src={cat.cover_image}
                  alt={t(cat.name_fi, cat.name_en)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={1000}
                />
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-8">
                  <h3 className="text-2xl font-semibold text-primary-foreground">
                    {t(cat.name_fi, cat.name_en)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-24 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {t("Tarvitsetko tekstiilejä yrityksellesi?", "Need textiles for your business?")}
          </h2>
          <p className="text-primary-foreground/70 mb-10 max-w-lg mx-auto">
            {t(
              "Ota yhteyttä ja kerro tarpeistasi – räätälöimme ratkaisun juuri sinulle.",
              "Get in touch and tell us your needs – we'll tailor a solution for you."
            )}
          </p>
          <Link to="/tarjous">
            <Button variant="hero-outline" size="lg" className="px-10 py-6 text-sm">
              {t("Pyydä tarjous", "Request a Quote")}
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
