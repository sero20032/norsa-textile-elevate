import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { parseVariants } from "@/lib/colorVariants";
import tshirtsImg from "@/assets/category-tshirts.jpg";
import capsImg from "@/assets/category-caps.jpg";

const fleeceImages = Array.from({ length: 12 }, (_, index) => `/products/fume/fume-${index + 1}.webp`);
const fleeceThumbnails = Array.from({ length: 12 }, (_, index) => `/products/fume/thumbs/fume-${index + 1}-thumb.webp`);

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
  const [searchParams, setSearchParams] = useSearchParams();
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
  const variants = useMemo(() => parseVariants((product as { variants?: unknown })?.variants), [product]);

  const colorParam = searchParams.get("color");
  const activeVariantIdx = Math.max(
    0,
    variants.findIndex((v) => v.color === colorParam)
  );
  const activeVariant = variants[activeVariantIdx];

  const images = useMemo(() => {
    if (activeVariant?.images?.length) return activeVariant.images;
    if (product?.id === "p1") return fleeceImages;
    return product?.images && product.images.length > 0 ? product.images : [];
  }, [activeVariant, product]);

  const thumbnailImages = useMemo(() => {
    if (!activeVariant && product?.id === "p1" && images.length === fleeceThumbnails.length) {
      return fleeceThumbnails;
    }
    return images;
  }, [images, activeVariant, product?.id]);

  useEffect(() => {
    setActiveImage(0);
  }, [product?.id, activeVariant?.color]);

  useEffect(() => {
    images.forEach((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
    });
  }, [images]);

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
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)}
                          aria-label={t("Edellinen kuva", "Previous image")}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-md transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveImage((activeImage + 1) % images.length)}
                          aria-label={t("Seuraava kuva", "Next image")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground rounded-full p-2 shadow-md transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                  {thumbnailImages.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {thumbnailImages.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImage(idx)}
                          className={`w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                            activeImage === idx ? "border-foreground" : "border-transparent"
                          }`}
                          aria-label={`${t(product.name_fi, product.name_en)} ${idx + 1}`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
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
                {t(product.description_fi || "", product.description_en || "")}
              </p>
              {variants.length > 0 && (
                <div className="mb-8">
                  <p className="text-sm font-medium mb-3">
                    {t("Väri", "Color")}:{" "}
                    <span className="text-muted-foreground">
                      {activeVariant
                        ? t(activeVariant.color_label_fi, activeVariant.color_label_en)
                        : ""}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    {variants.map((v) => {
                      const isActive = v.color === activeVariant?.color;
                      return (
                        <button
                          key={v.color}
                          type="button"
                          onClick={() => {
                            const next = new URLSearchParams(searchParams);
                            next.set("color", v.color);
                            setSearchParams(next, { replace: true });
                          }}
                          aria-label={t(v.color_label_fi, v.color_label_en)}
                          title={t(v.color_label_fi, v.color_label_en)}
                          className={`w-8 h-8 rounded-full border transition-all ${
                            isActive
                              ? "ring-2 ring-foreground ring-offset-2 ring-offset-background border-transparent"
                              : "border-border hover:scale-110"
                          }`}
                          style={{ backgroundColor: v.hex }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
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
