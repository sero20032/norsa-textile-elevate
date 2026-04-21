export type ColorVariant = {
  color: string;
  color_label_fi: string;
  color_label_en: string;
  hex: string;
  images: string[];
};

export const DEFAULT_SWATCH_COLORS: Record<string, { hex: string; fi: string; en: string }> = {
  grey: { hex: "#9CA3AF", fi: "Harmaa", en: "Grey" },
  red: { hex: "#DC2626", fi: "Punainen", en: "Red" },
  blue: { hex: "#2563EB", fi: "Sininen", en: "Blue" },
  green: { hex: "#16A34A", fi: "Vihreä", en: "Green" },
  navy: { hex: "#1E3A8A", fi: "Tummansininen", en: "Navy" },
  black: { hex: "#111827", fi: "Musta", en: "Black" },
};

export const parseVariants = (raw: unknown): ColorVariant[] => {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (v): v is ColorVariant =>
      v && typeof v === "object" && typeof (v as ColorVariant).color === "string"
  );
};
