"use client";

import { useState } from "react";
import { useI18n, useStore } from "@/lib/store-context";
import { CURRENCIES, type Currency } from "@/lib/currency";
import {
  BagIcon,
  CloseIcon,
  InstagramIcon,
  Logo,
  WhatsappIcon,
} from "./ui";

function LangSwitch() {
  const { lang, setLang } = useStore();
  return (
    <div className="flex items-center rounded-full border border-ink/15 p-0.5 text-[11px] font-bold">
      <button
        onClick={() => setLang("ar")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "ar" ? "bg-ink text-linen" : "text-ink/50 hover:text-ink"
        }`}
      >
        عربي
      </button>
      <button
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-ink text-linen" : "text-ink/50 hover:text-ink"
        }`}
      >
        EN
      </button>
    </div>
  );
}

function CurrencySwitch() {
  const { currency, setCurrency } = useStore();
  return (
    <div className="flex items-center rounded-full border border-ink/15 p-0.5 text-[11px] font-bold">
      {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          aria-label={CURRENCIES[c].name}
          title={CURRENCIES[c].name}
          className={`rounded-full px-2 py-1 transition-colors ${
            currency === c ? "bg-ink text-linen" : "text-ink/50 hover:text-ink"
          }`}
        >
          {c === "QAR" ? "ر.ق" : CURRENCIES[c].symbol}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { count, setDrawerOpen } = useStore();
  const t = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV = [
    { label: t.nav.bags, a: "#bags" },
    { label: t.nav.makeup, a: "#makeup" },
    { label: t.nav.story, a: "#story" },
    { label: t.nav.reviews, a: "#reviews" },
    { label: t.nav.contact, a: "#contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-sand/70 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
          <nav className="hidden flex-1 items-center gap-6 xl:flex">
            {NAV.map((item) => (
              <a
                key={item.a}
                href={item.a}
                className="whitespace-nowrap text-[13px] font-bold text-ink/65 transition-colors hover:text-mauve-deep"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#top" className="shrink-0" aria-label={t.nav.home}>
            <Logo size="md" />
          </a>

          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <CurrencySwitch />
              <LangSwitch />
            </div>
            <a
              href="https://wa.me/963999000000"
              target="_blank"
              rel="noreferrer"
              aria-label={t.nav.whats}
              className="hidden h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-ink hover:text-ink sm:grid"
            >
              <WhatsappIcon className="h-5 w-5" />
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label={t.nav.cart}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-ink hover:text-ink"
            >
              <BagIcon className="h-5 w-5" />
              {count > 0 && (
                <span
                  key={count}
                  className="bump absolute -left-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-mauve px-1 text-[10px] font-bold text-linen"
                >
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={t.nav.menu}
              className="flex flex-col gap-1.5 p-2 lg:hidden"
            >
              <span className="h-0.5 w-6 rounded bg-ink" />
              <span className="h-0.5 w-4 rounded bg-ink/70" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div
            className="fade-in absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fade-in absolute inset-y-0 right-0 flex w-[86%] max-w-xs flex-col bg-cream p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <Logo size="md" />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label={t.nav.close}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink/60"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex items-center justify-between gap-2">
              <CurrencySwitch />
              <LangSwitch />
            </div>
            <nav className="mt-6 flex flex-col gap-5">
              {NAV.map((item) => (
                <a
                  key={item.a}
                  href={item.a}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl font-bold text-ink/80 transition-colors hover:text-mauve-deep"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setDrawerOpen(true);
                }}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-bold text-linen transition-colors hover:bg-mauve-deep"
              >
                <BagIcon className="h-4 w-4" />
                {t.nav.cart} {count > 0 ? `(${count})` : ""}
              </button>
            </nav>
            <div className="mt-auto flex items-center gap-3">
              <a
                href="https://wa.me/963999000000"
                target="_blank"
                rel="noreferrer"
                aria-label={t.nav.whats}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink/60"
              >
                <WhatsappIcon className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/hayfaa.beauty"
                target="_blank"
                rel="noreferrer"
                aria-label={t.nav.insta}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink/60"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
