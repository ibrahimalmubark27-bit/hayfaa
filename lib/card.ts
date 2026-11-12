/**
 * Card brand detection (auto-recognizes Visa / Mastercard / mada / NAPS)
 * based on the card number prefix (BIN).
 */
export type CardBrand = "visa" | "mastercard" | "mada" | "naps";

const META: Record<CardBrand, { ar: string; en: string }> = {
  visa: { ar: "فيزا", en: "Visa" },
  mastercard: { ar: "ماستركارد", en: "Mastercard" },
  mada: { ar: "مدى", en: "mada" },
  naps: { ar: "NAPS", en: "NAPS" },
};

export function detectCardBrand(raw: string): CardBrand | null {
  const d = raw.replace(/\D/g, "");
  if (d.length < 2) return null;
  if (d.startsWith("4")) return "visa";
  if (/^5[1-5]/.test(d) || /^2[2-7]/.test(d)) return "mastercard";
  if (d.startsWith("50")) return "mada";
  return "naps";
}

export function brandName(b: CardBrand, lang: "ar" | "en"): string {
  return META[b][lang];
}
