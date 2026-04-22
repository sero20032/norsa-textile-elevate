import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { products } from "./Products";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find((p) => p.id === id);

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

  const images = product.images;

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
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4">
                    <img
                      src={images[activeImage]}
                      alt={t(product.name_fi, product.name_en)}
                      className="w-full h-full object-cover"
                      width={800}
                      height={1000}
                      loading="eager"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-md transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveImage((activeImage + 1) % images.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-md transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImage(idx)}
                          className={`w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                            activeImage === idx ? "border-foreground" : "border-transparent"
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                            width={80}
                            height={80}
                          />
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
              <p className="text-muted-foreground leading-relaxed mb-8">
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
