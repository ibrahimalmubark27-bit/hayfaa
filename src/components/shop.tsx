"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { pDesc, pName, pSub } from "@/lib/types";
import { fill } from "@/lib/i18n";
import { useI18n, useStore } from "@/lib/store-context";
import {
  Accent,
  CheckIcon,
  CloseIcon,
  ExchangeIcon,
  GiftIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  Reveal,
  TruckIcon,
} from "./ui";

/* localized badge labels */
const BADGE_EN: Record<string, string> = {
  "جديد": "New",
  "وصل حديثاُ": "Just In",
  "وصل حديثاً": "Just In",
  "الأكثر مبيعاً": "Best Seller",
};

function badgeLabel(p: Product, lang: "ar" | "en") {
  if (!p.badge) return null;
  return lang === "ar" ? p.badge : (BADGE_EN[p.badge] ?? p.badge);
}

function isNewBadge(p: Product) {
  return p.badge === "جديد" || p.badge === "وصل حديثاُ" || p.badge === "وصل حديثاُ";
}

/* ============================= Editorial section header ============================= */

function SectionHeader({
  num,
  en,
  lead,
  accent,
  desc,
}: {
  num: string;
  en: string;
  lead: string;
  accent: string;
  desc: string;
}) {
  return (
    <div className="mb-12 flex items-end justify-between gap-8 lg:mb-16">
      <div>
        <div className="flex items-center gap-4">
          <span className="font-display text-5xl font-bold text-mauve/25 sm:text-6xl">
            {num}
          </span>
          <span className="h-px w-12 bg-sand sm:w-20" />
          <span dir="ltr" className="font-script text-3xl text-mauve/60 sm:text-4xl">
            {en}
          </span>
        </div>
        <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
          {lead} <Accent>{accent}</Accent>
        </h2>
      </div>
      <p className="hidden max-w-[280px] text-sm leading-7 text-ink/55 lg:block">
        {desc}
      </p>
    </div>
  );
}

/* ============================= Product card ============================= */

function ProductCard({ p, index, lang }: { p: Product; index: number; lang: "ar" | "en" }) {
  const { add, setQuickView, fmt } = useStore();
  const t = useI18n();
  const [liked, setLiked] = useState(false);
  const name = pName(p, lang);
  const badge = badgeLabel(p, lang);

  return (
    <Reveal delay={(index % 3) * 90}>
      <div className={index % 3 === 1 ? "lg:mt-12" : ""}>
        <div className="group relative">
          <div
            className="relative cursor-pointer overflow-hidden rounded-[24px] bg-sand/30"
            onClick={() => setQuickView(p)}
          >
            <div className="aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={name}
                loading="lazy"
                className="h-full w-full object-cover saturate-[0.95] transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
            {badge && (
              <span
                className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-bold shadow-sm ${
                  isNewBadge(p) ? "bg-sage text-linen" : "bg-linen/95 text-mauve-deep"
                }`}
              >
                {badge}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked((v) => !v);
              }}
              aria-label={t.quickview.fav}
              className={`absolute left-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-linen/90 shadow-sm backdrop-blur-sm transition-all ${
                  liked ? "bump text-mauve" : "text-ink/35 hover:text-mauve"
                }`}
            >
              <HeartIcon filled={liked} className="h-4.5 w-4.5" />
            </button>
            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  add(p);
                }}
                className="pointer-events-auto flex translate-y-16 items-center gap-2 rounded-full bg-linen/95 px-6 py-3 text-sm font-bold text-ink opacity-0 shadow-lg shadow-ink/10 backdrop-blur-sm transition-all duration-500 ease-out hover:bg-ink hover:text-linen group-hover:translate-y-0 group-hover:opacity-100"
              >
                <PlusIcon className="h-4 w-4" />
                {t.quickview.add}
              </button>
            </div>
          </div>

          <div
            className="flex cursor-pointer items-start justify-between gap-3 pt-4"
            onClick={() => setQuickView(p)}
          >
            <div className="min-w-0">
              <h3 className="truncate font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-mauve-deep">
                {name}
              </h3>
              <p className="mt-0.5 truncate text-xs text-ink/45">{pSub(p, lang)}</p>
            </div>
            <div className="shrink-0 text-left">
              <p className="font-display text-lg font-bold text-ink">
                {fmt(p.price)}
              </p>
              {p.oldPrice ? (
                <p className="mt-0.5 text-xs text-ink/30 line-through">
                  {fmt(p.oldPrice)}
                </p>
              ) : p.stock > 0 && p.stock < 5 ? (
                <p className="mt-0.5 text-[11px] font-bold text-sage-deep">
                  {lang === "ar" ? `بقي ${p.stock} فقط` : `Only ${p.stock} left`}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ============================= Category section ============================= */

export function CategorySection({
  id,
  num,
  en,
  lead,
  accent,
  desc,
  products,
  columns = 3,
  tint = false,
}: {
  id: string;
  num: string;
  en: string;
  lead: string;
  accent: string;
  desc: string;
  products: Product[];
  columns?: 3 | 4;
  tint?: boolean;
}) {
  const { lang } = useStore();

  const gridClass =
    columns === 4
      ? "grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
      : "grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3 lg:gap-x-8";

  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-24 lg:py-28 ${
        tint ? "overflow-hidden" : ""
      }`}
    >
      {tint && <div className="absolute inset-0 bg-cream-deep/45" aria-hidden />}
      {tint && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(40rem 24rem at 92% 0%, rgba(227,201,194,.35), transparent 60%)",
          }}
          aria-hidden
        />
      )}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader num={num} en={en} lead={lead} accent={accent} desc={desc} />
        </Reveal>

        <div className={gridClass}>
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= Quick view ============================= */

export function QuickView() {
  const { quickView: p, setQuickView, add, lang, fmt } = useStore();
  const t = useI18n();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [p?.id]);

  if (!p) return null;

  const categoryLabel =
    p.category === "bags" ? t.quickview.catBags : t.quickview.catMakeup;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="fade-in absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={() => setQuickView(null)}
      />
      <div className="modal-in relative w-full max-w-3xl overflow-hidden rounded-[28px] bg-linen shadow-2xl">
        <button
          onClick={() => setQuickView(null)}
          aria-label={t.quickview.close}
          className="absolute left-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-linen/90 text-ink/60 shadow-md backdrop-blur-sm transition hover:text-mauve-deep"
        >
          <CloseIcon className="h-4.5 w-4.5" />
        </button>
        <div className="no-scrollbar grid max-h-[86vh] overflow-y-auto md:grid-cols-2">
          <div className="bg-sand/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={pName(p, lang)}
              className="h-64 w-full object-cover saturate-[0.95] sm:h-80 md:h-full md:min-h-[540px]"
            />
          </div>
          <div className="flex flex-col p-7 sm:p-9">
            <span className="w-fit rounded-full bg-mauve/10 px-3.5 py-1 text-[11px] font-bold text-mauve-deep">
              {categoryLabel}
            </span>
            <h3 className="mt-4 font-display text-3xl font-bold text-ink">
              {pName(p, lang)}
            </h3>
            <p className="mt-1 text-sm text-ink/50">{pSub(p, lang)}</p>
            {pDesc(p, lang) && (
              <p className="mt-4 text-sm leading-8 text-ink/65">{pDesc(p, lang)}</p>
            )}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-ink">
                {fmt(p.price)}
              </span>
              {p.oldPrice && (
                <span className="text-base text-ink/30 line-through">
                  {fmt(p.oldPrice)}
                </span>
              )}
            </div>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-ink/15">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label={t.quickview.less}
                  className="grid h-11 w-11 place-items-center text-ink/55 transition-colors hover:text-mauve-deep"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-display text-lg font-bold">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(p.stock, q + 1))}
                  aria-label={t.quickview.more}
                  className="grid h-11 w-11 place-items-center text-ink/55 transition-colors hover:text-mauve-deep"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  add(p, qty);
                  setQuickView(null);
                }}
                className="flex-1 rounded-full bg-ink py-3.5 text-sm font-bold text-linen transition-all duration-300 hover:bg-mauve-deep active:scale-[0.98]"
              >
                {t.quickview.add} — {fmt(p.price * qty)}
              </button>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-2 border-t border-sand/70 pt-5 text-center">
              <div className="flex flex-col items-center gap-1.5 text-ink/55">
                <TruckIcon className="h-5 w-5 text-mauve" />
                <span className="text-[11px] font-bold">{t.quickview.d1}</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-ink/55">
                <ExchangeIcon className="h-5 w-5 text-sage-deep" />
                <span className="text-[11px] font-bold">{t.quickview.d2}</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-ink/55">
                <GiftIcon className="h-5 w-5 text-mauve" />
                <span className="text-[11px] font-bold">{t.quickview.d3}</span>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs font-bold text-mauve-deep">
              <CheckIcon className="h-3.5 w-3.5" />
              {fill(t.quickview.stock, { n: p.stock })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
