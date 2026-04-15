import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import hoodiesImg from "@/assets/category-hoodies.jpg";
import tshirtsImg from "@/assets/category-tshirts.jpg";
import capsImg from "@/assets/category-caps.jpg";

const fallbackProducts = [
  {
    id: "p1",
    name_fi: "Classic Huppari",
    name_en: "Classic Hoodie",
    description_fi: "Laadukas huppari yritysbrändäykseen. Saatavilla painatuksella tai brodeerauksella.",
    description_en: "Premium hoodie for corporate branding. Available with printing or embroidery.",
    category: "Hupparit",
    images: [hoodiesImg],
  },
  {
    id: "p2",
    name_fi: "Premium T-paita",
    name_en: "Premium T-Shirt",
    description_fi: "Korkealaatuinen t-paita, täydellinen yritysvaatteeksi. Monipuoliset painatusmahdollisuudet.",
    description_en: "High-quality t-shirt, perfect for corporate wear. Versatile printing options.",
    category: "T-paidat",
    images: [tshirtsImg],
  },
  {
    id: "p3",
    name_fi: "Brodeerattu lippis",
    name_en: "Embroidered Cap",
    description_fi: "Tyylikäs lippis brodeeratulla logolla. Erinomainen promootiotuote.",
    description_en: "Stylish cap with embroidered logo. Excellent promotional product.",
    category: "Lippikset",
    images: [capsImg],
  },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);

  const product = fallbackProducts.find((p) => p.id === id);

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

  return (
    <Layout>
      <section className="py-24 px-4 lg:px-8">
        <div className="container mx-auto">
          <Link to="/tuotteet" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
            ← {t("Takaisin tuotteisiin", "Back to products")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            {/* Image gallery */}
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4">
                <img
                  src={product.images[activeImage]}
                  alt={t(product.name_fi, product.name_en)}
                  className="w-full h-full object-cover"
                  width={800}
                  height={1000}
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
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
            </div>

            {/* Product info */}
            <div className="flex flex-col justify-center">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {t(product.name_fi, product.name_en)}
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-10">
                {t(product.description_fi, product.description_en)}
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
