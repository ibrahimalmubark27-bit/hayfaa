"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import type { Product } from "@/lib/types";
import { pName } from "@/lib/types";
import { fill } from "@/lib/i18n";
import { useI18n, useStore } from "@/lib/store-context";
import {
  Accent,
  ArrowIcon,
  BagIcon,
  BrushIcon,
  CheckIcon,
  Counter,
  FlowerMark,
  GiftIcon,
  InstagramIcon,
  Logo,
  Parallax,
  PlusIcon,
  Reveal,
  SectionHeading,
  ShieldIcon,
  SparkleIcon,
  StarIcon,
  StitchDivider,
  TiktokIcon,
  TruckIcon,
  WhatsappIcon,
  ExchangeIcon,
} from "./ui";

/* ============================= HERO ============================= */

const HERO_IMG = "/images/hero-a.jpg";

export function Hero({ products }: { products: Product[] }) {
  const { lang, add, fmt } = useStore();
  const t = useI18n();
  const heroProduct = products.find((p) => p.slug === "bag-lian") ?? products[0];

  const CHIPS = [
    { label: t.hero.chips[0], href: "#bags", Icon: BagIcon },
    { label: t.hero.chips[1], href: "#makeup", Icon: BrushIcon },
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(56rem 34rem at 88% 0%, rgba(227,201,194,.4), transparent 62%), radial-gradient(46rem 30rem at 4% 92%, rgba(230,233,224,.55), transparent 62%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 pt-14 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-32 lg:pt-20">
        {/* ---------- copy ---------- */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-mauve">
            <span className="h-px w-10 bg-mauve/40" />
            <p className="text-[11px] font-bold tracking-[0.35em]">{t.hero.eyebrow}</p>
          </div>

          <h1 className="mt-8 font-display text-[3.2rem] font-bold leading-[1.3] text-ink sm:text-7xl sm:leading-[1.22]">
            <span className="mask-line">
              <span style={{ "--line-delay": "120ms" } as CSSProperties}>
                {t.hero.h1a}
              </span>
            </span>
            <span className="mask-line">
              <span style={{ "--line-delay": "340ms" } as CSSProperties}>
                {t.hero.h1b} <Accent>{t.hero.h1accent}</Accent>
              </span>
            </span>
          </h1>

          <p
            className="mask-line mt-8 max-w-md text-[15px] font-medium leading-8 text-ink/55"
            style={{ "--line-delay": "560ms" } as CSSProperties}
          >
            <span>{t.hero.desc}</span>
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-7">
            <a
              href="#bags"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-bold text-linen transition-colors duration-500 hover:bg-mauve-deep"
            >
              {t.hero.cta1}
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
            </a>
            <a
              href="#makeup"
              className="group inline-flex items-center gap-3 text-sm font-bold text-ink/60 transition-colors duration-300 hover:text-mauve-deep"
            >
              {t.hero.cta2}
              <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {CHIPS.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="flex items-center gap-2 rounded-full border border-ink/15 bg-linen/70 px-5 py-2.5 text-[13px] font-bold text-ink/65 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-linen"
              >
                <c.Icon className="h-4 w-4" />
                {c.label}
              </a>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-5 text-sm">
            <div>
              <p className="font-display text-2xl font-bold text-ink">
                <Counter to={2500} prefix="+" />
              </p>
              <p className="mt-0.5 text-xs text-ink/45">{t.hero.stats[0]}</p>
            </div>
            <span className="hidden h-9 w-px bg-sand sm:block" />
            <div>
              <p className="flex items-center gap-1.5 font-display text-2xl font-bold text-ink">
                <Counter to={4.9} decimals={1} />
                <StarIcon className="h-4 w-4 text-gold" />
              </p>
              <p className="mt-0.5 text-xs text-ink/45">{t.hero.stats[1]}</p>
            </div>
            <span className="hidden h-9 w-px bg-sand sm:block" />
            <div>
              <p className="font-display text-2xl font-bold text-ink">2</p>
              <p className="mt-0.5 text-xs text-ink/45">{t.hero.stats[2]}</p>
            </div>
          </div>
        </div>

        {/* ---------- visual ---------- */}
        <div className="relative">
          <div className="relative mx-auto w-[88%] sm:w-[76%] lg:w-[70%]">
            <div className="arch-soft relative aspect-[3/4] overflow-hidden bg-sand/40 shadow-[0_50px_100px_-50px_rgba(122,82,76,0.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_IMG}
                alt={t.hero.eyebrow}
                className="slow-zoom h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mauve-deep/15 via-transparent to-transparent" />
            </div>

            {heroProduct && (
              <div className="absolute -bottom-7 right-0 flex w-[238px] items-center gap-3 rounded-2xl border border-sand/70 bg-linen/95 p-3 pr-4 shadow-xl shadow-mauve-deep/10 backdrop-blur-md sm:right-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroProduct.image}
                  alt={pName(heroProduct, lang)}
                  className="h-14 w-12 shrink-0 rounded-xl object-cover saturate-[0.95]"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-ink">
                    {pName(heroProduct, lang)}
                  </p>
                  <p className="mt-0.5 text-xs text-ink/50">
                    <span className="font-display text-sm font-bold text-mauve-deep">
                      {fmt(heroProduct.price)}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => add(heroProduct)}
                  aria-label={fill(t.hero.addAria, { name: pName(heroProduct, lang) })}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-linen transition-colors duration-300 hover:bg-mauve-deep"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================= WORD MARQUEE ============================= */

export function WordMarquee() {
  const t = useI18n();
  const words = [
    { t: "HAYFAA BEAUTY", en: true },
    { t: t.marquee[0], en: false },
    { t: "HAYFAA BEAUTY", en: true },
    { t: t.marquee[1], en: false },
    { t: "HAYFAA BEAUTY", en: true },
    { t: t.marquee[2], en: false },
  ];
  return (
    <div
      dir="ltr"
      className="relative overflow-hidden border-y border-sand/60 bg-linen py-5"
    >
      <div className="marquee-track items-center">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {words.map((w, i) => (
              <span key={i} className="flex items-center">
                <span
                  className={`whitespace-nowrap px-8 ${
                    w.en
                      ? "font-display text-xl font-bold tracking-[0.3em] text-ink/70 sm:text-2xl"
                      : "text-lg font-bold text-ink/55 sm:text-xl"
                  }`}
                >
                  {w.t}
                </span>
                <FlowerMark className="mx-2 h-4 w-5 shrink-0 opacity-50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================= MANIFESTO ============================= */

export function Manifesto() {
  const { lang } = useStore();
  const t = useI18n();
  const q1 = lang === "ar" ? "«" : "\u201C";
  const q2 = lang === "ar" ? "»" : "\u201D";
  const LINKS = [
    { label: t.manifesto.links[0], href: "#bags" },
    { label: t.manifesto.links[1], href: "#makeup" },
  ];
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <FlowerMark className="mx-auto h-10 w-11" />
          <p className="mt-6 text-[11px] font-bold tracking-[0.35em] text-mauve">
            {t.manifesto.eyebrow}
          </p>
          <h2 className="mt-7 font-display text-4xl font-bold leading-[1.6] text-ink sm:text-5xl sm:leading-[1.55]">
            {q1}
            {t.manifesto.l1} <Accent>{t.manifesto.accent1}</Accent>…
            <br />
            {t.manifesto.l2} <Accent>{t.manifesto.accent2}</Accent>
            {q2}
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-sm leading-8 text-ink/55">
            {t.manifesto.desc}
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-md grid-cols-2 gap-8">
          {LINKS.map((l, i) => (
            <Reveal key={l.href} delay={i * 120}>
              <a
                href={l.href}
                className="group flex flex-col items-center gap-1.5 border-t border-sand pt-6"
              >
                <span className="font-display text-4xl font-bold text-ink/15 transition-colors duration-500 group-hover:text-mauve sm:text-5xl">
                  {t.sections.num[i]}
                </span>
                <span className="font-display text-lg font-bold text-ink/80 sm:text-xl">
                  {l.label}
                </span>
                <span
                  dir="ltr"
                  className="font-script text-2xl text-mauve/45 transition-colors duration-500 group-hover:text-mauve"
                >
                  {l.href === "#bags" ? "Bags" : "Makeup"}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= FOUNDER (قصة هيفاء) ============================= */

function FounderImg({
  src,
  alt,
  className = "",
  onFail,
}: {
  src: string;
  alt: string;
  className?: string;
  onFail?: () => void;
}) {
  const [err, setErr] = useState(false);
  if (err) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => {
        setErr(true);
        onFail?.();
      }}
      className={className}
    />
  );
}

type FounderStat = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

const FOUNDER_STATS: FounderStat[] = [
  { to: 5, suffix: "+" },
  { to: 2500, prefix: "+" },
  { to: 1200, prefix: "+" },
  { to: 4.9, decimals: 1 },
];

export function Founder() {
  const { lang } = useStore();
  const t = useI18n();
  const [mainOk, setMainOk] = useState(true);
  const q1 = lang === "ar" ? "«" : "\u201C";
  const q2 = lang === "ar" ? "»" : "\u201D";

  return (
    <section id="story" className="relative scroll-mt-24 py-24 lg:py-28">
      <div className="absolute inset-0 bg-cream-deep/45" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42rem 26rem at 6% 10%, rgba(227,201,194,.35), transparent 60%), radial-gradient(36rem 24rem at 96% 92%, rgba(230,233,224,.5), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* ---------- portrait + scattered photos ---------- */}
        <Reveal>
          <div className="relative mx-auto w-[92%] sm:w-[80%]">
            <div className="arch-soft relative aspect-[3/4] overflow-hidden bg-sand/40 shadow-[0_50px_100px_-50px_rgba(122,82,76,0.45)]">
              {mainOk ? (
                <FounderImg
                  src="/images/founder/founder-main.jpg"
                  alt={t.founder.imgAlt}
                  onFail={() => setMainOk(false)}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-to-b from-cream-deep to-sand/60">
                  <div className="text-center">
                    <FlowerMark className="mx-auto h-10 w-11" />
                    <p dir="ltr" className="mt-3 font-script text-5xl text-mauve/60">
                      Hayfaa
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-sand/60 bg-linen/95 px-5 py-3.5 shadow-lg shadow-mauve-deep/10 backdrop-blur-md">
                <div>
                  <p className="font-display text-lg font-bold text-ink">
                    {t.founder.name}
                  </p>
                  <p className="text-[11px] font-bold text-ink/50">{t.founder.role}</p>
                </div>
                <FlowerMark className="h-6 w-7" />
              </div>
            </div>

            <FounderImg
              src="/images/founder/founder-1.jpg"
              alt={t.founder.name}
              className="absolute -right-4 bottom-24 w-28 rotate-3 rounded-2xl border-4 border-linen object-cover shadow-xl shadow-mauve-deep/20 sm:-right-8 sm:w-36"
            />
            <FounderImg
              src="/images/founder/founder-2.jpg"
              alt={t.founder.name}
              className="absolute -left-3 top-8 w-24 -rotate-6 rounded-2xl border-4 border-linen object-cover shadow-xl shadow-mauve-deep/20 sm:w-28"
            />
            <FounderImg
              src="/images/founder/founder-3.jpg"
              alt={t.founder.name}
              className="absolute -right-6 top-4 hidden w-24 rotate-6 rounded-2xl border-4 border-linen object-cover shadow-xl shadow-mauve-deep/20 sm:block sm:w-28"
            />
            <FounderImg
              src="/images/founder/founder-4.jpg"
              alt={t.founder.name}
              className="absolute -bottom-6 left-6 hidden w-24 -rotate-3 rounded-2xl border-4 border-linen object-cover shadow-xl shadow-mauve-deep/20 md:block md:w-28"
            />
          </div>
        </Reveal>

        {/* ---------- story ---------- */}
        <div>
          <Reveal delay={100}>
            <div className="flex items-center gap-3 text-mauve">
              <span className="h-px w-10 bg-mauve/50" />
              <p className="text-[11px] font-bold tracking-[0.35em]">
                {t.founder.eyebrow}
              </p>
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {t.founder.lead} <Accent>{t.founder.accent}</Accent>
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-8 text-ink/60">
              {t.founder.bio}
            </p>
            <p
              className={`mt-4 max-w-lg border-2 pr-5 font-display text-xl leading-10 text-ink/80 ${
                lang === "ar" ? "border-r border-mauve/40" : "border-l border-mauve/40"
              }`}
            >
              {q1}
              {t.founder.quote}
              {q2}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {FOUNDER_STATS.map((s, i) => (
              <Reveal key={t.founder.stats[i]} delay={i * 90}>
                <div>
                  <p className="font-display text-3xl font-bold text-ink">
                    <Counter
                      to={s.to}
                      decimals={s.decimals ?? 0}
                      prefix={s.prefix ?? ""}
                      suffix={s.suffix ?? ""}
                    />
                  </p>
                  <p className="mt-1 text-[11px] font-bold leading-5 text-ink/50">
                    {t.founder.stats[i]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-2.5">
            {t.founder.values.map((v) => (
              <span
                key={v}
                className="flex items-center gap-2 rounded-full border border-ink/15 bg-linen/70 px-4 py-2 text-xs font-bold text-ink/65"
              >
                <FlowerMark className="h-3.5 w-4" />
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================= TRUST STRIP ============================= */

const TRUST_ICONS = [TruckIcon, ShieldIcon, ExchangeIcon, GiftIcon];

export function TrustStrip() {
  const t = useI18n();
  return (
    <section className="border-b border-sand/50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-5 py-6 sm:px-8">
        {t.trust.map((label, i) => {
          const Icon = TRUST_ICONS[i];
          return (
            <Reveal key={label} delay={i * 80}>
              <span className="flex items-center gap-2.5 text-[13px] font-bold text-ink/55">
                <Icon
                  className={`h-4.5 w-4.5 ${i % 2 === 0 ? "text-mauve" : "text-sage-deep"}`}
                />
                {label}
              </span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ============================= CINEMATIC BAND ============================= */

const BAND_IMG = "/images/hero-b.jpg";

export function CinematicBand() {
  const t = useI18n();
  const { goToShop } = useStore();
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-mauve-deep">
      <Parallax
        speed={0.12}
        className="absolute inset-x-0 -top-[12%] h-[124%]"
        style={{
          backgroundImage: `url(${BAND_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-ink/55" aria-hidden />
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-5 text-center text-linen">
        <Reveal>
          <p dir="ltr" className="font-script text-4xl text-blush sm:text-5xl">
            {t.band.script}
          </p>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.45] sm:text-6xl sm:leading-[1.35]">
            {t.band.l1}
            <br />
            <Accent>{t.band.accent}</Accent>
          </h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] font-bold text-linen/70">
            {t.band.points.map((pt) => (
              <span key={pt} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-blush/70" />
                {pt}
              </span>
            ))}
          </div>
          <button
            onClick={() => goToShop()}
            className="group mt-11 inline-flex items-center gap-3 rounded-full border border-linen/30 px-8 py-4 text-sm font-bold text-linen transition-all duration-500 hover:bg-linen hover:text-ink"
          >
            {t.band.cta}
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================= PROCESS STRIP ============================= */

const STEP_ICONS = [WhatsappIcon, GiftIcon, TruckIcon, ShieldIcon];

export function ProcessStrip() {
  const t = useI18n();
  return (
    <section className="relative py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            center
            eyebrow={t.process.eyebrow}
            lead={t.process.lead}
            accent={t.process.accent}
          />
        </Reveal>
        <div className="relative mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div
            className="absolute inset-x-20 top-7 hidden border-t border-dashed border-sand lg:block"
            aria-hidden
          />
          {t.process.steps.map((s, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <Reveal key={s.t} delay={i * 120}>
                <div className="group relative flex flex-col items-center text-center">
                  <span
                    className={`relative z-10 grid h-14 w-14 place-items-center rounded-full border border-dashed bg-linen transition-all duration-500 group-hover:scale-105 group-hover:border-solid ${
                      i % 2 === 0
                        ? "border-mauve/40 text-mauve-deep group-hover:bg-mauve-deep group-hover:text-linen"
                        : "border-sage/50 text-sage-deep group-hover:bg-sage-deep group-hover:text-linen"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="mt-4 font-script text-3xl text-mauve/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-ink">{s.t}</h3>
                  <p className="mt-2 max-w-[220px] text-[13px] leading-6 text-ink/50">
                    {s.s}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================= TESTIMONIALS ============================= */

export function Testimonials() {
  const t = useI18n();
  return (
    <section id="reviews" className="relative py-24 lg:py-28">
      <StitchDivider className="mb-14" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            center
            eyebrow={t.reviews.eyebrow}
            lead={t.reviews.lead}
            accent={t.reviews.accent}
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
          {t.reviews.items.map((r, i) => (
            <Reveal
              key={r.name}
              delay={i * 140}
              className={i === 1 ? "md:translate-y-8" : ""}
            >
              <figure
                className={`relative h-full rounded-3xl border bg-linen p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-mauve-deep/10 ${
                  i === 1 ? "border-sage/50" : "border-sand/80"
                }`}
              >
                <FlowerMark className="absolute -top-4 right-6 h-9 w-10" />
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-lg leading-9 text-ink/75">
                  {r.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-sand/70 pt-4">
                  <div>
                    <p className="text-sm font-bold text-ink">{r.name}</p>
                    <p className="text-xs text-ink/45">{r.city}</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-mauve/10 px-3 py-1 text-[11px] font-bold text-mauve-deep">
                    <CheckIcon className="h-3 w-3" />
                    {t.reviews.verified}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= GALLERY ============================= */

const GALLERY = [
  {
    src: "https://images.pexels.com/photos/22432984/pexels-photo-22432984.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800",
    alt: "Bag detail",
  },
  {
    src: "https://images.pexels.com/photos/4938514/pexels-photo-4938514.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800",
    alt: "Makeup",
  },
  {
    src: "https://images.pexels.com/photos/7944717/pexels-photo-7944717.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800",
    alt: "Look with bag",
  },
  {
    src: "https://images.pexels.com/photos/7290670/pexels-photo-7290670.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800",
    alt: "Powder texture",
  },
  {
    src: "https://images.pexels.com/photos/8006405/pexels-photo-8006405.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800",
    alt: "Evening clutch",
  },
  {
    src: "https://images.pexels.com/photos/32388555/pexels-photo-32388555.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800",
    alt: "Shadow palette",
  },
  {
    src: "https://images.pexels.com/photos/8989582/pexels-photo-8989582.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800",
    alt: "Elegant bag",
  },
];

export function Gallery() {
  const t = useI18n();
  return (
    <section id="gallery" className="pb-24 lg:pb-28">
      <StitchDivider className="mb-12" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={t.gallery.eyebrow}
            lead={t.gallery.lead}
            accent={t.gallery.accent}
          />
          <a
            href="https://instagram.com/hayfaa.beauty"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink/60 transition-colors hover:border-ink hover:bg-ink hover:text-linen"
          >
            <InstagramIcon className="h-4 w-4" />
            <span dir="ltr">@hayfaa.beauty</span>
          </a>
        </Reveal>
      </div>
      <Reveal delay={150} className="mt-10">
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 sm:px-8 lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]">
          {GALLERY.map((g, i) => (
            <div
              key={i}
              className="group relative w-48 shrink-0 overflow-hidden rounded-2xl bg-sand/30 sm:w-56"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover saturate-[0.92] transition-transform duration-[1.4s] ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/0 text-linen opacity-0 transition-all duration-500 group-hover:bg-ink/45 group-hover:opacity-100">
                <InstagramIcon className="h-7 w-7" />
                <span className="text-xs font-bold tracking-wide">{t.gallery.brand}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ============================= NEWSLETTER ============================= */

export function Newsletter() {
  const t = useI18n();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="px-5 pb-20 sm:px-8 lg:pb-28">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[36px] bg-ink px-6 py-16 text-center sm:px-12 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(34rem 20rem at 12% 0%, rgba(138,147,130,.22), transparent 60%), radial-gradient(30rem 18rem at 92% 100%, rgba(161,115,108,.18), transparent 60%)",
            }}
          />
          <div
            dir="ltr"
            className="pointer-events-none absolute -bottom-12 left-8 select-none whitespace-nowrap font-script text-8xl text-linen/8"
            aria-hidden
          >
            Hayfaa
          </div>
          <div className="relative">
            <div className="mx-auto flex w-fit items-center gap-3">
              <span className="h-px w-10 bg-linen/30" />
              <SparkleIcon className="h-4 w-4 text-blush" />
              <span className="text-[11px] font-bold tracking-[0.3em] text-linen/70">
                {t.newsletter.eyebrow}
              </span>
              <span className="h-px w-10 bg-linen/30" />
            </div>
            <h2 className="mt-5 font-display text-4xl font-bold text-linen sm:text-5xl">
              {t.newsletter.titleA}{" "}
              <Accent className="text-blush">{t.newsletter.accent}</Accent>
              {t.newsletter.titleB && <> {t.newsletter.titleB}</>}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-linen/55">
              {t.newsletter.desc}
            </p>

            {done ? (
              <div className="mx-auto mt-9 w-fit rounded-2xl border border-linen/20 bg-linen/10 px-8 py-4 text-sm font-bold text-linen backdrop-blur-sm">
                {t.newsletter.doneA}{" "}
                <span dir="ltr" className="font-display text-blush">
                  HAYFAA10
                </span>
              </div>
            ) : (
              <form
                className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setDone(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  className="w-full flex-1 rounded-full border border-linen/20 bg-linen/10 px-6 py-3.5 text-sm text-linen placeholder:text-linen/40 outline-none transition-colors focus:border-blush"
                />
                <button
                  type="submit"
                  className="rounded-full bg-linen px-8 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:bg-blush hover:text-ink active:scale-95"
                >
                  {t.newsletter.cta}
                </button>
              </form>
            )}
            <p className="mt-5 text-[11px] text-linen/35">{t.newsletter.note}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================= FOOTER ============================= */

type TrackResult = {
  ok: boolean;
  stage?: number;
  error?: string;
};

export function Footer() {
  const t = useI18n();
  const [code, setCode] = useState("");
  const [tr, setTr] = useState<TrackResult | null>(null);
  const [tracing, setTracing] = useState(false);

  async function track(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setTracing(true);
    setTr(null);
    try {
      const res = await fetch(
        `/api/orders/track?code=${encodeURIComponent(code.trim())}`
      );
      const data = (await res.json()) as TrackResult & { error?: string };
      setTr(data);
    } catch {
      setTr({ ok: false, error: t.footer.error });
    } finally {
      setTracing(false);
    }
  }

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-linen/10 bg-ink text-linen/70"
    >
      <div
        dir="ltr"
        className="pointer-events-none absolute -top-8 right-0 select-none whitespace-nowrap font-script text-[9rem] leading-none text-linen/5"
        aria-hidden
      >
        Hayfaa
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo tone="light" size="md" />
          <p className="mt-5 max-w-xs text-sm leading-7 text-linen/45">
            {t.footer.desc}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://wa.me/963999000000"
              target="_blank"
              rel="noreferrer"
              aria-label={t.nav.whats}
              className="grid h-10 w-10 place-items-center rounded-full border border-linen/15 text-linen/60 transition-all hover:border-blush hover:text-blush"
            >
              <WhatsappIcon className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://instagram.com/hayfaa.beauty"
              target="_blank"
              rel="noreferrer"
              aria-label={t.nav.insta}
              className="grid h-10 w-10 place-items-center rounded-full border border-linen/15 text-linen/60 transition-all hover:border-blush hover:text-blush"
            >
              <InstagramIcon className="h-4.5 w-4.5" />
            </a>
            <a
              href="#"
              aria-label={t.nav.tiktok}
              className="grid h-10 w-10 place-items-center rounded-full border border-linen/15 text-linen/60 transition-all hover:border-blush hover:text-blush"
            >
              <TiktokIcon className="h-4.5 w-4.5" />
            </a>
          </div>

          <div className="mt-8 rounded-2xl border border-linen/10 bg-linen/5 p-4">
            <p className="text-xs font-bold text-linen/70">{t.footer.track}</p>
            <form onSubmit={track} className="mt-3 flex gap-2">
              <input
                dir="ltr"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="HB-XXXX"
                className="w-full min-w-0 flex-1 rounded-full border border-linen/15 bg-linen/10 px-4 py-2.5 text-sm text-linen placeholder:text-linen/35 outline-none transition-colors focus:border-blush"
              />
              <button
                type="submit"
                disabled={tracing}
                className="rounded-full bg-linen px-5 py-2.5 text-sm font-bold text-ink transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
              >
                {tracing ? "…" : t.footer.trackBtn}
              </button>
            </form>
            {tr &&
              (tr.ok ? (
                <div className="mt-4 space-y-2.5">
                  {t.footer.trackStages.map((st, i) => (
                    <div
                      key={st}
                      className={`flex items-center gap-3 text-xs ${
                        i <= (tr.stage ?? 0) ? "text-linen" : "text-linen/35"
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                          i <= (tr.stage ?? 0)
                            ? "bg-sage text-linen"
                            : "border border-linen/25"
                        }`}
                      >
                        {i <= (tr.stage ?? 0) ? (
                          <CheckIcon className="h-3 w-3" />
                        ) : (
                          i + 1
                        )}
                      </span>
                      <span className="shrink-0 font-bold">{st}</span>
                      <span className="hidden truncate text-linen/45 sm:inline">
                        — {t.footer.trackSubs[i]}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-xs font-bold text-blush">
                  {tr.error ?? t.footer.notFound}
                </p>
              ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold text-linen">
            {t.footer.sections}
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href="#bags" className="transition-colors hover:text-blush">
                {t.nav.bags}
              </a>
            </li>
            <li>
              <a href="#makeup" className="transition-colors hover:text-blush">
                {t.nav.makeup}
              </a>
            </li>
            <li>
              <a href="#reviews" className="transition-colors hover:text-blush">
                {t.nav.reviews}
              </a>
            </li>
            <li>
              <a href="#gallery" className="transition-colors hover:text-blush">
                {t.gallery.eyebrow}
              </a>
            </li>
            <li>
              <a href="#story" className="transition-colors hover:text-blush">
                {t.nav.story}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold text-linen">
            {t.footer.contact}
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <WhatsappIcon className="h-4 w-4 shrink-0 text-blush/70" />
              <span dir="ltr">+963 999 000 000</span>
            </li>
            <li className="flex items-center gap-3">
              <InstagramIcon className="h-4 w-4 shrink-0 text-blush/70" />
              <span dir="ltr">@hayfaa.beauty</span>
            </li>
            <li className="flex items-center gap-3">
              <BagIcon className="h-4 w-4 shrink-0 text-blush/70" />
              <span>{t.footer.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold text-linen">
            {t.footer.shipping}
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-linen/50">
            {t.footer.shippingItems.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {t.footer.payments.map((m) => (
              <span
                key={m}
                className="rounded-full border border-linen/10 px-3.5 py-1.5 text-[11px] font-bold text-linen/60"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-linen/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-linen/35 sm:flex-row sm:px-8">
          <p>{t.footer.rights}</p>
          <p className="flex items-center gap-2">
            {t.footer.madeA}
            <FlowerMark className="h-4 w-4.5" tone="light" />
            {t.footer.madeB}
          </p>
        </div>
      </div>
    </footer>
  );
}
