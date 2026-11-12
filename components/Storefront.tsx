"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CartItem, Filter, Product } from "@/lib/types";
import { FREE_SHIPPING_THRESHOLD, pName } from "@/lib/types";
import { fill, type Lang } from "@/lib/i18n";
import { formatMoney, type Currency } from "@/lib/currency";
import { STRINGS, StoreContext, type StoreValue } from "@/lib/store-context";
import {
  BagIcon,
  BackToTop,
  CheckIcon,
  Marquee,
  ScrollProgress,
} from "./ui";
import { Header } from "./Header";
import {
  CinematicBand,
  Founder,
  Footer,
  Gallery,
  Hero,
  Manifesto,
  Newsletter,
  ProcessStrip,
  Testimonials,
  TrustStrip,
  WordMarquee,
} from "./sections";
import { CategorySection, QuickView } from "./shop";
import { CartDrawer } from "./cart";

export default function Storefront({ products }: { products: Product[] }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* language */
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const s = localStorage.getItem("hb-lang");
      if (s === "ar" || s === "en") setLang(s);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("hb-lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  /* currency (base: QAR) */
  const [currency, setCurrency] = useState<Currency>("QAR");

  useEffect(() => {
    try {
      const s = localStorage.getItem("hb-cur");
      if (s === "QAR" || s === "USD" || s === "EUR") setCurrency(s);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("hb-cur", currency);
    } catch {
      /* ignore */
    }
  }, [currency]);

  const fmt = useCallback(
    (v: number) => formatMoney(v, currency, lang),
    [currency, lang]
  );

  const bags = useMemo(
    () => products.filter((p) => p.category === "bags"),
    [products]
  );
  const makeup = useMemo(
    () => products.filter((p) => p.category === "makeup"),
    [products]
  );

  /* hydrate cart from localStorage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("hb-cart-v1");
      if (raw) {
        const saved = JSON.parse(raw) as { id: number; qty: number }[];
        setItems(
          saved
            .map((s) => {
              const p = products.find((pp) => pp.id === s.id);
              return p
                ? { product: p, qty: Math.min(Math.max(1, s.qty), p.stock) }
                : null;
            })
            .filter((x): x is CartItem => x !== null)
        );
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, [products]);

  /* persist cart */
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      "hb-cart-v1",
      JSON.stringify(items.map((i) => ({ id: i.product.id, qty: i.qty })))
    );
  }, [items, hydrated]);

  const showToast = useCallback((m: string) => {
    setToast(m);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const add = useCallback(
    (p: Product, qty = 1) => {
      if (p.stock <= 0) {
        showToast(STRINGS[lang].toast.out);
        return;
      }
      setItems((prev) => {
        const ex = prev.find((i) => i.product.id === p.id);
        if (ex) {
          return prev.map((i) =>
            i.product.id === p.id
              ? { ...i, qty: Math.min(i.qty + qty, p.stock) }
              : i
          );
        }
        return [...prev, { product: p, qty: Math.min(qty, p.stock) }];
      });
      showToast(fill(STRINGS[lang].toast.added, { name: pName(p, lang) }));
    },
    [showToast, lang]
  );

  const setQty = useCallback((id: number, qty: number) => {
    setItems((prev) =>
      prev.flatMap((i) =>
        i.product.id === id
          ? qty <= 0
            ? []
            : [{ ...i, qty: Math.min(qty, i.product.stock) }]
          : [i]
      )
    );
  }, []);

  const remove = useCallback(
    (id: number) => setItems((prev) => prev.filter((i) => i.product.id !== id)),
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  const goToShop = useCallback((f?: Filter) => {
    if (f) setFilter(f);
    const el = document.getElementById("bags");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, []);

  /* lock body scroll when overlays open */
  useEffect(() => {
    const locked = drawerOpen || quickView !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, quickView]);

  const value = useMemo<StoreValue>(
    () => ({
      lang,
      setLang,
      currency,
      setCurrency,
      fmt,
      t: STRINGS[lang],
      items,
      count,
      subtotal,
      freeShippingGap: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
      add,
      setQty,
      remove,
      clear,
      drawerOpen,
      setDrawerOpen,
      quickView,
      setQuickView,
      filter,
      setFilter,
      toast,
      showToast,
      goToShop,
    }),
    [
      lang,
      currency,
      fmt,
      items,
      count,
      subtotal,
      add,
      setQty,
      remove,
      clear,
      drawerOpen,
      quickView,
      filter,
      toast,
      showToast,
      goToShop,
    ]
  );

  return (
    <StoreContext.Provider value={value}>
      <div className="grain relative">
        <ScrollProgress />
        <Marquee items={STRINGS[lang].ribbon} />
        <Header />
        <main>
          <Hero products={products} />
          <WordMarquee />
          <TrustStrip />
          <Manifesto />
          <Founder />
          <CategorySection
            id="bags"
            num="٠١"
            en="The Bags"
            lead="شنط"
            accent="تعيش معكِ"
            desc="جلد طبيعي، ألوان هادية، وتفاصيل مصنوعة لتبقى. كل شنطة وصلت هيفاء بنفسها."
            products={bags}
          />
          <CinematicBand />
          <CategorySection
            id="makeup"
            num="٠٢"
            en="Makeup"
            lead="مكياج"
            accent="بدرجات هادية"
            desc="ظلال وشفايف وفرش بدرجات تتناسق مع بعض — إطلالة يومية خفيفة وواثقة."
            products={makeup}
            columns={4}
            tint
          />
          <ProcessStrip />
          <Testimonials />
          <Gallery />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
        <QuickView />
        <BackToTop />
        {toast && (
          <div
            key={toast}
            className="toast-pop fixed bottom-6 left-1/2 z-[95] flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-linen shadow-2xl"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-sage text-linen">
              <CheckIcon className="h-3 w-3" />
            </span>
            {toast}
          </div>
        )}
        {/* mobile cart bar */}
        {count > 0 && !drawerOpen && (
          <div className="fade-in fixed inset-x-3 bottom-3 z-[70] lg:hidden">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex w-full items-center justify-between rounded-2xl bg-ink px-5 py-4 text-linen shadow-2xl shadow-ink/30 transition-transform duration-200 active:scale-[0.99]"
            >
              <span className="flex items-center gap-2.5 text-sm font-bold">
                <span className="relative">
                  <BagIcon className="h-5 w-5" />
                  <span className="absolute -left-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-0.5 text-[9px] font-bold text-mauve-deep">
                    {count}
                  </span>
                </span>
                عرض السلة
              </span>
              <span className="font-display text-lg font-bold">
                {fmt(subtotal)}
              </span>
            </button>
          </div>
        )}
      </div>
    </StoreContext.Provider>
  );
}
