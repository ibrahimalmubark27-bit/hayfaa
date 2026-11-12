"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode, SVGProps } from "react";
import { useStore } from "@/lib/store-context";

/* ============================= Accent word (callig AR / script EN) ============================= */

export function Accent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { lang } = useStore();
  return (
    <span
      className={`font-normal text-mauve ${
        lang === "ar" ? "font-callig" : "font-script text-[1.18em]"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/* ============================= Icons ============================= */

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export const BagIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4.8 8.6h14.4l-1.1 10a2.2 2.2 0 0 1-2.2 2H8.1a2.2 2.2 0 0 1-2.2-2l-1.1-10Z" />
    <path d="M8.6 8.6V7.2a3.4 3.4 0 0 1 6.8 0v1.4" />
    <path d="M9.4 12.4c0 1.6 1.2 2.6 2.6 2.6s2.6-1 2.6-2.6" />
  </svg>
);

export const BrushIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20.4 3.6c.9.9 1.3 2 .9 2.9l-8.9 10-3.9-3.9 10-8.9c.9-.4 2 0 1.9-.1Z" />
    <path d="M8.5 12.6 5 16.1a2.6 2.6 0 0 0 3.7 3.7l3.4-3.5" />
    <path d="M14.8 7.4 16.6 9.2" />
  </svg>
);

export const ShoeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.2 16.6c3.6-.4 5.9-2.3 7.7-5.4.9-1.6 2.3-2 3.8-1.1l4 2.6c1.1.7 1.4 2 .7 3.1l-2.1 2.9" />
    <path d="M16.4 18.2 15.6 20.6h4.2" />
    <path d="M3.2 20.6h9" opacity=".4" />
  </svg>
);

export const SparkleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5 13.9 9l5.6 2-5.6 2L12 18.5 10.1 13l-5.6-2 5.6-2L12 3.5Z" />
    <path d="M19 16.5v4M17 18.5h4" />
  </svg>
);

export const TruckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 6.5h11v10H3z" />
    <path d="M14 10h4l3 3v3.5h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3 5 5.8v5.4c0 4.6 3 8.1 7 9.8 4-1.7 7-5.2 7-9.8V5.8L12 3Z" />
    <path d="m8.8 11.8 2.2 2.2 4.2-4.4" />
  </svg>
);

export const ExchangeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.5 8h11l-3.2-3.2M17.5 16h-11l3.2 3.2" />
  </svg>
);

export const HeartIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

/** "Forward" arrow for RTL (points left) */
export const ArrowIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 3.4l2.4 5 5.4.7-4 3.8 1 5.4-4.8-2.6-4.8 2.6 1-5.4-4-3.8 5.4-.7 2.4-5Z" />
  </svg>
);

export const WhatsappIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z" />
    <path d="M8.9 8.6c-.3 2.8 3.7 6.8 6.5 6.5l1.2-1.3-2.2-1.3-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1.3-2.2-1.6.9Z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const TiktokIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14.5 4v9.8a3.6 3.6 0 1 1-3.2-3.6" />
    <path d="M14.5 4c.5 2.6 2.2 4.3 4.9 4.6" />
  </svg>
);

export const GiftIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="8" width="16" height="4" />
    <path d="M5 12v8h14v-8M12 8v12" />
    <path d="M12 8C9.5 8 7.6 6.8 8 5s2.8-1 4 3ZM12 8c2.5 0 4.4-1.2 4-3s-2.8-1-4 3Z" />
  </svg>
);

/* ============================= Flower mark ============================= */

export function FlowerMark({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const c = tone === "dark" ? "url(#hayfaa-flower)" : "#e2bcae";
  return (
    <svg viewBox="0 0 44 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="hayfaa-flower" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b0847e" />
          <stop offset="1" stopColor="#6b443f" />
        </linearGradient>
      </defs>
      <path d="M22 2.5c-4.4 6.2-4.8 11.8 0 16.6 4.8-4.8 4.4-10.4 0-16.6Z" fill={c} />
      <path
        d="M9.3 8c-1.8 7.4 2.1 12.6 9.4 15.1-1-7.3-3.8-12.1-9.4-15.1Z"
        fill={c}
        opacity=".82"
      />
      <path
        d="M34.7 8c1.8 7.4-2.1 12.6-9.4 15.1 1-7.3 3.8-12.1 9.4-15.1Z"
        fill={c}
        opacity=".82"
      />
      <path d="M11.5 27.2c2.8 5.8 18.2 5.8 21 0-6.8 2.5-14.2 2.5-21 0Z" fill={c} />
    </svg>
  );
}

/* ============================= Logo (official artwork) ============================= */

export function Logo({
  tone = "dark",
  size = "md",
}: {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}) {
  const h = size === "lg" ? "h-16" : size === "sm" ? "h-11" : "h-14";
  return (
    <span className={`relative block select-none leading-none ${h}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tone === "dark" ? "/images/logo.png" : "/images/logo-light.png"}
        alt="Hayfaa Beauty"
        draggable={false}
        className="pointer-events-none h-full w-auto object-contain"
      />
    </span>
  );
}

/* ============================= Reveal on scroll ============================= */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ============================= Scroll progress ============================= */

export function ScrollProgress() {
  const { lang } = useStore();
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setW(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px]"
    >
      <div
        className={`absolute top-0 h-full bg-gradient-to-l from-sage via-gold to-mauve ${
          lang === "en" ? "left-0" : "right-0"
        }`}
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

/* ============================= Back to top ============================= */

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="العودة إلى الأعلى"
      className="fade-in fixed bottom-24 right-5 z-[75] grid h-12 w-12 place-items-center rounded-full border border-sand bg-linen text-mauve-deep shadow-xl shadow-mauve-deep/15 transition-all duration-300 hover:-translate-y-1 hover:bg-ink hover:text-linen lg:bottom-6"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4.5 w-4.5"
        aria-hidden
      >
        <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
      </svg>
    </button>
  );
}

/* ============================= Animated counter ============================= */

export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1500;
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / dur);
          setVal(to * (1 - Math.pow(1 - k, 3)));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} dir="ltr">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ============================= Announcement marquee ============================= */

export function Marquee({ items }: { items: string[] }) {
  const Row = ({ k }: { k: string }) => (
    <div key={k} className="flex shrink-0 items-center" aria-hidden={k === "b"}>
      {items.map((t, i) => (
        <span
          key={i}
          className="flex items-center gap-3 whitespace-nowrap px-7 text-[11px] font-medium tracking-wide text-linen/90"
        >
          <FlowerMark className="h-3.5 w-4 shrink-0" tone="light" />
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <div dir="ltr" className="overflow-hidden bg-ink py-2">
      <div className="marquee-track">
        <Row k="a" />
        <Row k="b" />
      </div>
    </div>
  );
}

/* ============================= Section heading ============================= */

export function SectionHeading({
  eyebrow,
  lead,
  accent,
  tail,
  desc,
  center = false,
}: {
  eyebrow: string;
  lead: string;
  accent?: string;
  tail?: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "flex flex-col items-center text-center" : ""}>
      <div className="flex items-center gap-3 text-mauve">
        <span className="h-px w-10 bg-mauve/50" />
        <span className="text-[11px] font-bold tracking-[0.25em]">{eyebrow}</span>
        {center && <span className="h-px w-10 bg-mauve/50" />}
      </div>
      <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
        {lead}
        {accent && (
          <>
            {" "}
            <span className="font-callig font-normal text-mauve">{accent}</span>
          </>
        )}
        {tail}
      </h2>
      {desc && (
        <p className="mt-3 max-w-xl text-[15px] leading-7 text-ink/60">{desc}</p>
      )}
    </div>
  );
}

/* ============================= Stitch divider ============================= */

export function StitchDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto flex w-full max-w-2xl items-center gap-5 px-5 ${className}`}
      aria-hidden
    >
      <span className="flex-1 border-t border-dashed border-sand" />
      <FlowerMark className="h-5 w-6 opacity-60" />
      <span className="flex-1 border-t border-dashed border-sand" />
    </div>
  );
}

/* ============================= Payment icons ============================= */

import type { CardBrand } from "@/lib/card";

export type PayKind = CardBrand | "card" | "cash" | "apple";

export function PayIcon({
  kind,
  className = "",
}: {
  kind: PayKind;
  className?: string;
}) {
  const chip = (
    children: React.ReactNode,
    w = "w-11"
  ) => (
    <span
      className={`grid ${w} h-6 place-items-center rounded-md bg-white shadow-sm ring-1 ring-ink/10 ${className}`}
    >
      {children}
    </span>
  );
  switch (kind) {
    case "visa":
      return chip(
        <svg viewBox="0 0 40 20" className="h-4 w-8">
          <text
            x="20"
            y="14"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontStyle="italic"
            fontWeight="800"
            fontSize="13"
            fill="#1A1F71"
          >
            VISA
          </text>
        </svg>
      );
    case "mastercard":
      return chip(
        <svg viewBox="0 0 40 20" className="h-4 w-8">
          <circle cx="16" cy="10" r="7.5" fill="#EB001B" />
          <circle cx="24" cy="10" r="7.5" fill="#F79E1B" />
          <path d="M20 4.4a7.5 7.5 0 0 1 0 11.2 7.5 7.5 0 0 1 0-11.2Z" fill="#FF5F00" />
        </svg>
      );
    case "mada":
      return chip(
        <svg viewBox="0 0 40 20" className="h-4 w-8">
          <text
            x="20"
            y="14.5"
            textAnchor="middle"
            fontFamily="Tajawal, Arial, sans-serif"
            fontWeight="700"
            fontSize="11"
            fill="#00843D"
          >
            مدى
          </text>
        </svg>
      );
    case "naps":
      return chip(
        <svg viewBox="0 0 40 20" className="h-4 w-8">
          <text
            x="20"
            y="13.5"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="800"
            fontSize="9"
            fill="#57534E"
            letterSpacing="1"
          >
            NAPS
          </text>
        </svg>
      );
    case "card":
      return chip(
        <svg viewBox="0 0 32 20" className="h-4 w-7">
          <rect x="1" y="2" width="30" height="16" rx="3" fill="#2f2927" />
          <rect x="1" y="5" width="30" height="4" fill="#b9976b" />
          <rect x="4" y="12" width="10" height="2.5" rx="1.25" fill="#e8c9bf" />
        </svg>
      );
    case "cash":
      return chip(
        <svg viewBox="0 0 32 20" className="h-4 w-7">
          <rect x="1" y="2" width="30" height="16" rx="3" fill="#EAE4D6" stroke="#8a9382" strokeWidth="1" />
          <circle cx="16" cy="10" r="4" fill="#8a9382" />
          <circle cx="16" cy="10" r="2" fill="#EAE4D6" />
        </svg>
      );
    case "apple":
      return chip(
        <svg viewBox="0 0 44 20" className="h-4 w-9">
          <path
            d="M12.9 6.4c.6-.8 1-1.8.9-2.8-1 0-2 .6-2.6 1.3-.6.6-1.1 1.6-1 2.7 1.1.1 2.1-.5 2.7-1.2Zm3.1 4.8c0-1.5 1.2-2.2 1.3-2.3-.7-1-1.8-1.2-2.2-1.2-1-.1-1.9.6-2.4.6s-1.3-.6-2.2-.6c-1.1 0-2.2.7-2.7 1.7-1.1 1.9-.3 4.7.8 6.2.5.8 1.2 1.5 2 1.5s1.1-.5 2-.5 1.2.5 2 .5 1.4-.7 1.9-1.5c.6-.9.8-1.7.9-1.8 0 0-1.5-.6-1.4-2.6Z"
            fill="#111110"
          />
          <text
            x="27"
            y="14"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="600"
            fontSize="11"
            fill="#111110"
          >
            Pay
          </text>
        </svg>
      );
  }
}

/* ============================= Parallax (safe: background-based) ============================= */

export function Parallax({
  speed = 0.1,
  className = "",
  style,
  children,
}: {
  speed?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        setY(-center * speed);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transform: `translate3d(0, ${y}px, 0)` }}
    >
      {children}
    </div>
  );
}
