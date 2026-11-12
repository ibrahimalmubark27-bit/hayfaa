export type Product = {
  id: number;
  slug: string;
  name: string;
  subtitle: string | null;
  category: "bags" | "makeup";
  price: number;
  oldPrice: number | null;
  description: string | null;
  nameEn: string | null;
  subtitleEn: string | null;
  descriptionEn: string | null;
  image: string;
  badge: string | null;
  featured: boolean;
  stock: number;
};

/** localized product fields */
export const pName = (p: Product, lang: "ar" | "en") =>
  lang === "ar" ? p.name : p.nameEn ?? p.name;
export const pSub = (p: Product, lang: "ar" | "en") =>
  lang === "ar" ? p.subtitle : p.subtitleEn ?? p.subtitle;
export const pDesc = (p: Product, lang: "ar" | "en") =>
  lang === "ar" ? p.description : p.descriptionEn ?? p.description;

export type CartItem = {
  product: Product;
  qty: number;
};

export type Filter = "all" | "bags" | "makeup";

export const FREE_SHIPPING_THRESHOLD = 350;
export const SHIPPING_COST = 25;

export function formatPrice(v: number): string {
  return v.toLocaleString("en-US");
}
