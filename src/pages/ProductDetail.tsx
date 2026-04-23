import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { products, type ProductRow } from "./Products";
import {
  parseVariants,
  type ColorVariant,
  DEFAULT_SWATCH_COLORS,
} from "@/lib/colorVariants";

const swatchHex = (variant: ColorVariant): string =>
  variant.hex || DEFAULT_SWATCH_COLORS[variant.color]?.hex || "#9CA3AF";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState<ProductRow | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("products")
        .select("id, name_fi, name_en, description_fi, description_en, category, images, variants")
        .eq("id", id)
        .maybeSingle();
      if (cancelled) return;
      if (error || !data) {
        // Fallback to hardcoded
        setProduct(products.find((p) => p.id === id) ?? null);
        return;
      }
      setProduct({
        id: data.id,
        name_fi: data.name_fi,
        name_en: data.name_en,
        description_fi: data.description_fi,
        description_en: data.description_en,
        category: data.category,
        images: data.images ?? [],
        variants: parseVariants(data.variants),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const variants = product?.variants ?? [];
  const colorParam = searchParams.get("color");

  const selectedVariantIdx = useMemo(() => {
    if (!variants.length) return -1;
    if (colorParam) {
      const idx = variants.findIndex((v) => v.color === colorParam);
      if (idx >= 0) return idx;
    }
    return 0;
  }, [variants, colorParam]);

  const selectedVariant = selectedVariantIdx >= 0 ? variants[selectedVariantIdx] : null;

  const images = useMemo(() => {
    if (selectedVariant?.images?.length) return selectedVariant.images;
    return product?.images ?? [];
  }, [selectedVariant, product]);

  // Reset gallery index when variant/product changes
  useEffect(() => {
    setActiveImage(0);
  }, [selectedVariantIdx, product?.id]);

  if (product === undefined) {
    return (
      <Layout>
        <div className="py-24 px-4 text-center">
          <p className="text-muted-foreground">{t("Ladataan...", "Loading...")}</p>
        </div>
      </Layout>
    );
  }

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

  const handleSelectVariant = (variant: ColorVariant) => {
    const next = new URLSearchParams(searchParams);
    next.set("color", variant.color);
    setSearchParams(next, { replace: true });
  };

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
                {t(product.description_fi ?? "", product.description_en ?? "")}
              </p>

              {variants.length > 0 && (
                <div className="mb-8">
                  <p className="text-sm font-medium mb-3">
                    {t("Väri", "Color")}
                    {selectedVariant && (
                      <span className="text-muted-foreground font-normal ml-2">
                        {t(selectedVariant.color_label_fi, selectedVariant.color_label_en) ||
                          DEFAULT_SWATCH_COLORS[selectedVariant.color]?.[
                            t("fi", "en") as "fi" | "en"
                          ] ||
                          selectedVariant.color}
                      </span>
                    )}
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {variants.map((v, idx) => {
                      const label =
                        t(v.color_label_fi, v.color_label_en) ||
                        DEFAULT_SWATCH_COLORS[v.color]?.[
                          t("fi", "en") as "fi" | "en"
                        ] ||
                        v.color;
                      return (
                        <button
                          key={`${v.color}-${idx}`}
                          type="button"
                          aria-label={label}
                          title={label}
                          onClick={() => handleSelectVariant(v)}
                          className={`w-9 h-9 rounded-full border-2 transition-all ${
                            selectedVariantIdx === idx
                              ? "border-foreground scale-110"
                              : "border-border hover:border-foreground/50"
                          }`}
                          style={{ backgroundColor: swatchHex(v) }}
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
