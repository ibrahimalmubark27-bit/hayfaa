import { createContext, useContext } from "react";
import type { CartItem, Filter, Product } from "./types";
import { STRINGS, type Lang, type Strings } from "./i18n";
import type { Currency } from "./currency";

export type StoreValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** format a QAR amount in the active currency + language */
  fmt: (v: number) => string;
  t: Strings;
  items: CartItem[];
  count: number;
  subtotal: number;
  freeShippingGap: number;
  add: (p: Product, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (b: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  filter: Filter;
  setFilter: (f: Filter) => void;
  toast: string | null;
  showToast: (m: string) => void;
  goToShop: (f?: Filter) => void;
};

export const StoreContext = createContext<StoreValue | null>(null);

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within StoreContext.Provider");
  }
  return ctx;
}

/** localized strings for the current language */
export function useI18n(): Strings {
  return useStore().t;
}

export { STRINGS };
