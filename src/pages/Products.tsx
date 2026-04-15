import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import hoodiesImg from "@/assets/category-hoodies.jpg";
import tshirtsImg from "@/assets/category-tshirts.jpg";
import capsImg from "@/assets/category-caps.jpg";

const fallbackCategories = [
  { id: "1", name_fi: "Hupparit", name_en: "Hoodies", cover_image: hoodiesImg },
  { id: "2", name_fi: "T-paidat", name_en: "T-Shirts", cover_image: tshirtsImg },
  { id: "3", name_fi: "Lippikset", name_en: "Caps", cover_image: capsImg },
];

const fallbackProducts = [
  { id: "p1", name_fi: "Classic Huppari", name_en: "Classic Hoodie", category: "Hupparit", images: [hoodiesImg] },
  { id: "p2", name_fi: "Premium T-paita", name_en: "Premium T-Shirt", category: "T-paidat", images: [tshirtsImg] },
  { id: "p3", name_fi: "Brodeerattu lippis", name_en: "Embroidered Cap", category: "Lippikset", images: [capsImg] },
];

const Products: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const filteredProducts = selectedCategory
    ? fallbackProducts.filter((p) => p.category === selectedCategory)
    : fallbackProducts;

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

          {/* Category filters */}
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
            {fallbackCategories.map((cat) => (
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

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/tuotteet/${product.id}`}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.images[0]}
                    alt={t(product.name_fi, product.name_en)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={1000}
                  />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-muted-foreground transition-colors">
                  {t(product.name_fi, product.name_en)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    fallbackCategories.find((c) => c.name_fi === product.category)?.name_fi || "",
                    fallbackCategories.find((c) => c.name_fi === product.category)?.name_en || ""
                  )}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
