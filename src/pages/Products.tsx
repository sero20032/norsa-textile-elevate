import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import {
  parseVariants,
  type ColorVariant,
  DEFAULT_SWATCH_COLORS,
} from "@/lib/colorVariants";
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

export const categories = [
  { id: "1", name_fi: "Fleecetakit", name_en: "Fleece Jackets", cover_image: fume1 },
  { id: "2", name_fi: "T-paidat", name_en: "T-Shirts", cover_image: tshirtsImg },
  { id: "3", name_fi: "Lippikset", name_en: "Caps", cover_image: capsImg },
];

export type ProductRow = {
  id: string;
  name_fi: string;
  name_en: string;
  description_fi: string | null;
  description_en: string | null;
  category: string;
  images: string[];
  variants: ColorVariant[];
};

// Hardcoded fallback (used only when Supabase returns no rows)
export const products: ProductRow[] = [
  {
    id: "p1",
    name_fi: "Harmaa Fleece Takki",
    name_en: "Grey Fleece Jacket",
    description_fi: "Laadukas fleecetakki yritysbrändäykseen. Saatavilla painatuksella tai brodeerauksella.",
    description_en: "Premium fleece jacket for corporate branding. Available with printing or embroidery.",
    category: "Fleecetakit",
    images: fleeceImages,
    variants: [],
  },
  {
    id: "p2",
    name_fi: "Premium T-paita",
    name_en: "Premium T-Shirt",
    description_fi: "Korkealaatuinen t-paita painatuksella tai brodeerauksella.",
    description_en: "High-quality t-shirt with printing or embroidery.",
    category: "T-paidat",
    images: [tshirtsImg],
    variants: [],
  },
  {
    id: "p3",
    name_fi: "Brodeerattu Lippis",
    name_en: "Embroidered Cap",
    description_fi: "Tyylikäs lippis brodeerauksella tai painatuksella.",
    description_en: "Stylish cap with embroidery or printing.",
    category: "Lippikset",
    images: [capsImg],
    variants: [],
  },
];

const swatchHex = (variant: ColorVariant): string =>
  variant.hex || DEFAULT_SWATCH_COLORS[variant.color]?.hex || "#9CA3AF";

const ProductCard: React.FC<{ product: ProductRow }> = ({ product }) => {
  const { t } = useLanguage();
  const variants = product.variants ?? [];
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectedVariant = variants[selectedIdx];
  const displayImage =
    selectedVariant?.images?.[0] || product.images?.[0] || "";

  const linkTo = selectedVariant
    ? `/tuotteet/${product.id}?color=${encodeURIComponent(selectedVariant.color)}`
    : `/tuotteet/${product.id}`;

  return (
    <div className="group">
      <Link to={linkTo}>
        <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-secondary">
          {displayImage && (
            <img
              src={displayImage}
              alt={t(product.name_fi, product.name_en)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              width={800}
              height={1000}
            />
          )}
        </div>
        <h3 className="text-lg font-semibold group-hover:text-muted-foreground transition-colors">
          {t(product.name_fi, product.name_en)}
        </h3>
      </Link>

      {variants.length > 0 && (
        <div className="flex gap-2 mt-3">
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
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedIdx(idx);
                }}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedIdx === idx
                    ? "border-foreground scale-110"
                    : "border-border hover:border-foreground/50"
                }`}
                style={{ backgroundColor: swatchHex(v) }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const Products: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [dbProducts, setDbProducts] = useState<ProductRow[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name_fi, name_en, description_fi, description_en, category, images, variants");
      if (cancelled) return;
      if (error || !data || data.length === 0) {
        setDbProducts(null);
        return;
      }
      setDbProducts(
        data.map((p) => ({
          id: p.id,
          name_fi: p.name_fi,
          name_en: p.name_en,
          description_fi: p.description_fi,
          description_en: p.description_en,
          category: p.category,
          images: p.images ?? [],
          variants: parseVariants(p.variants),
        }))
      );
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const sourceProducts = dbProducts ?? products;

  const filteredProducts = useMemo(
    () =>
      selectedCategory
        ? sourceProducts.filter((p) => p.category === selectedCategory)
        : sourceProducts,
    [sourceProducts, selectedCategory]
  );

  return (
    <Layout>
      <section className="py-24 px-4 lg:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Tuotteet", "Products")}
          </h1>
          <p className="text-muted-foreground mb-12">
            {t("Selaa kategorioita ja tuotteita.", "Browse categories and products.")}
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              to="/tuotteet"
              className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                !selectedCategory
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("Kaikki", "All")}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/tuotteet?category=${cat.name_fi}`}
                className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                  selectedCategory === cat.name_fi
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(cat.name_fi, cat.name_en)}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              {t("Ei tuotteita tässä kategoriassa.", "No products in this category.")}
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
