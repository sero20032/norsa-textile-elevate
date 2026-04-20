import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import fume1 from "@/assets/Fume 1 kalite.webp";
import fume2 from "@/assets/Fume 2 kalie .webp";
import fume3 from "@/assets/Fume 3 kalite .webp";
import fume4 from "@/assets/Fume 4 kalite .webp";
import fume5 from "@/assets/Fume 5 kalite.webp";
import fume6 from "@/assets/Fume 6 kalite.webp";
import fume7 from "@/assets/Fume 7 kalite.webp";
import fume8 from "@/assets/Fume 8 kalite.webp";
import fume9 from "@/assets/Fume 9 kalite.webp";
import fume10 from "@/assets/Fume 10 kalite.webp";
import fume11 from "@/assets/Fume 11 kalite .webp";
import fume12 from "@/assets/Fume 12 kalite.webp";
import tshirtsImg from "@/assets/category-tshirts.jpg";
import capsImg from "@/assets/category-caps.jpg";

const fleeceImages = [fume1, fume2, fume3, fume4, fume5, fume6, fume7, fume8, fume9, fume10, fume11, fume12];

const fallbackProducts = [
  {
    id: "p1", name_fi: "Fleecetakki", name_en: "Fleece Jacket",
    description_fi: "Laadukas fleecetakki yritysbrändäykseen. Saatavilla useissa väreissä, painatuksella tai brodeerauksella.",
    description_en: "Premium fleece jacket for corporate branding. Available in multiple colors, with printing or embroidery.",
    category: "Fleecetakit", images: fleeceImages,
  },
  {
    id: "p2", name_fi: "Premium T-paita", name_en: "Premium T-Shirt",
    description_fi: "Korkealaatuinen t-paita, täydellinen yritysvaatteeksi.",
    description_en: "High-quality t-shirt, perfect for corporate wear.",
    category: "T-paidat", images: [tshirtsImg],
  },
  {
    id: "p3", name_fi: "Brodeerattu lippis", name_en: "Embroidered Cap",
    description_fi: "Tyylikäs lippis brodeeratulla logolla.",
    description_en: "Stylish cap with embroidered logo.",
    category: "Lippikset", images: [capsImg],
  },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);

  const { data: dbProduct } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").eq("id", id!).maybeSingle();
      return data;
    },
    enabled: !!id,
  });

  const product = dbProduct || fallbackProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="py-24 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("Tuotetta ei löytynyt", "Product not found")}</h1>
          <Link to="/tuotteet" className="text-muted-foreground underline">
            {t("Takaisin tuotteisiin", "Back to products")}
          </Link>
        </div>
      </Layout>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [];

  return (
    <Layout>
      <section className="py-24 px-4 lg:px-8">
        <div className="container mx-auto">
          <Link to="/tuotteet" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
            ← {t("Takaisin tuotteisiin", "Back to products")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            <div>
              {images.length > 0 && (
                <>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4 group">
                    <img
                      src={images[activeImage]}
                      alt={t(product.name_fi, product.name_en)}
                      className="w-full h-full object-cover"
                      width={800}
                      height={1000}
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)}
                          aria-label={t("Edellinen kuva", "Previous image")}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-md transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setActiveImage((activeImage + 1) % images.length)}
                          aria-label={t("Seuraava kuva", "Next image")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-md transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-3">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                            activeImage === idx ? "border-foreground" : "border-transparent"
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {t(product.name_fi, product.name_en)}
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-10">
                {t(product.description_fi || "", product.description_en || "")}
              </p>
              <Link to="/tarjous">
                <Button variant="default" size="lg" className="px-10">
                  {t("Pyydä tarjous", "Request a Quote")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
