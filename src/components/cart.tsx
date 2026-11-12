"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { pName } from "@/lib/types";
import { fill } from "@/lib/i18n";
import { useI18n, useStore } from "@/lib/store-context";
import { brandName, detectCardBrand } from "@/lib/card";
import {
  ArrowIcon,
  BagIcon,
  CheckIcon,
  CloseIcon,
  GiftIcon,
  MinusIcon,
  PayIcon,
  PlusIcon,
} from "./ui";

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-ink/70">{label}</span>
      <input
        type={type}
        required={required}
        dir={dir}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-ink/15 bg-linen px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-mauve"
      />
    </label>
  );
}

export function CartDrawer() {
  const store = useStore();
  const {
    items,
    count,
    subtotal,
    freeShippingGap,
    drawerOpen,
    setDrawerOpen,
    setQty,
    remove,
    clear,
    goToShop,
    lang,
    fmt,
  } = store;
  const t = useI18n();
  const isRtl = lang === "ar";

  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderCode, setOrderCode] = useState("");
  const [gift, setGift] = useState(true);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    payment: "",
    card: "",
    expiry: "",
    cvv: "",
    notes: "",
  });

  /* sync default payment label when language changes */
  useEffect(() => {
    setForm((f) => ({ ...f, payment: t.cart.payments[0] || f.payment }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (!drawerOpen) {
      const timer = setTimeout(() => {
        setStep("cart");
        setError(null);
        setPlacing(false);
        setGift(true);
        setOrderCode("");
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [drawerOpen]);

  if (!drawerOpen) return null;

  const payment = form.payment || t.cart.payments[0];
  const shipping = subtotal >= 350 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  /* card brand auto-detection */
  const brand = detectCardBrand(form.card);
  const onCard = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 19);
    setForm({ ...form, card: d.replace(/(.{4})/g, "$1 ").trim() });
  };
  const onExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    setForm({
      ...form,
      expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d,
    });
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    setPlacing(true);
    setError(null);
    try {
      const finalNotes = [
        form.notes,
        gift ? t.cart.gift : "",
      ]
        .filter(Boolean)
        .join(" | ");
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          payment: payment,
          cardBrand: brand ?? undefined,
          notes: finalNotes,
          items: items.map((i) => ({ productId: i.product.id, qty: i.qty })),
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        code?: string;
        error?: string;
      };
      if (!data.ok) throw new Error(data.error ?? t.footer.error);
      setOrderCode(data.code ?? "");
      setStep("done");
      clear();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t.footer.error
      );
    } finally {
      setPlacing(false);
    }
  }

  const headerTitle =
    step === "cart"
      ? `${t.cart.title} ${count > 0 ? `(${count})` : ""}`
      : step === "checkout"
        ? t.cart.checkout
        : t.cart.done;

  return (
    <div className="fixed inset-0 z-[85]">
      <div
        className="fade-in absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        className={`absolute inset-y-0 flex w-full max-w-md flex-col bg-cream shadow-2xl ${
          isRtl ? "left-0 drawer-in" : "right-0 drawer-in-ltr"
        }`}
      >
        <header className="flex items-center justify-between border-b border-sand px-6 py-5">
          <h3 className="font-display text-xl font-bold text-ink">{headerTitle}</h3>
          <div className="flex items-center gap-3">
            {step === "checkout" && (
              <button
                onClick={() => setStep("cart")}
                className="text-xs font-bold text-mauve-deep hover:underline"
              >
                {t.cart.back}
              </button>
            )}
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label={t.cart.close}
              className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-mauve hover:text-mauve-deep"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* ---------- cart step ---------- */}
        {step === "cart" &&
          (items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-mauve/10 text-mauve">
                <BagIcon className="h-9 w-9" />
              </span>
              <p className="font-display text-2xl font-bold text-ink">
                {t.cart.emptyA}
              </p>
              <p className="text-sm text-ink/55">{t.cart.emptyB}</p>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  goToShop();
                }}
                className="mt-2 rounded-full bg-ink px-8 py-3 text-sm font-bold text-linen transition-colors hover:bg-mauve-deep"
              >
                {t.cart.emptyCta}
              </button>
            </div>
          ) : (
            <>
              <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-5">
                <div className="rounded-2xl border border-sand bg-linen p-4">
                  <p className="text-xs font-bold text-ink/70">
                    {freeShippingGap > 0 ? (
                      fill(t.cart.freeGap, { n: fmt(freeShippingGap) })
                    ) : (
                      <span className="flex items-center gap-1.5 text-sage-deep">
                        <CheckIcon className="h-3.5 w-3.5" />
                        {t.cart.freeOk}
                      </span>
                    )}
                  </p>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-sand">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-sage to-mauve transition-all duration-700"
                      style={{
                        width: `${Math.min(100, (subtotal / 350) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <ul className="mt-5 space-y-4">
                  {items.map((i) => (
                    <li
                      key={i.product.id}
                      className="flex gap-4 rounded-2xl border border-sand/70 bg-linen p-3"
                    >
                      <div className="arch-soft h-24 w-20 shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={i.product.image}
                          alt={pName(i.product, lang)}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-ink">
                              {pName(i.product, lang)}
                            </p>
                            <p className="mt-0.5 text-xs text-ink/50">
                              {fmt(i.product.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => remove(i.product.id)}
                            aria-label={t.cart.remove}
                            className="text-ink/35 transition-colors hover:text-mauve-deep"
                          >
                            <CloseIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-ink/15">
                            <button
                              onClick={() => setQty(i.product.id, i.qty - 1)}
                              aria-label={t.cart.less}
                              className="grid h-8 w-8 place-items-center text-ink/60 transition-colors hover:text-mauve-deep"
                            >
                              <MinusIcon className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm font-bold">
                              {i.qty}
                            </span>
                            <button
                              onClick={() => setQty(i.product.id, i.qty + 1)}
                              aria-label={t.cart.more}
                              className="grid h-8 w-8 place-items-center text-ink/60 transition-colors hover:text-mauve-deep"
                            >
                              <PlusIcon className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-mauve-deep">
                            {fmt(i.product.price * i.qty)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <footer className="border-t border-sand bg-linen px-6 py-5">
                <button
                  type="button"
                  onClick={() => setGift((g) => !g)}
                  className="mb-4 flex w-full items-center justify-between rounded-2xl border border-sand bg-cream px-4 py-3 transition-colors hover:border-sage/50"
                >
                  <span className="flex items-center gap-2.5 text-sm font-bold text-ink/75">
                    <GiftIcon className="h-4.5 w-4.5 text-mauve" />
                    {t.cart.gift}
                  </span>
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition-colors ${
                      gift ? "bg-sage text-linen" : "border border-ink/15 text-ink/50"
                    }`}
                  >
                    {gift && <CheckIcon className="h-3 w-3" />}
                    {gift ? t.cart.giftFree : t.cart.giftAdd}
                  </span>
                </button>

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-ink/60">
                    <span>{t.cart.subtotal}</span>
                    <span>{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-ink/60">
                    <span>{t.cart.shipping}</span>
                    <span>
                      {shipping === 0 ? t.cart.shippingFree : fmt(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 font-display text-lg font-bold text-ink">
                    <span>{t.cart.total}</span>
                    <span>{fmt(total)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep("checkout")}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-bold text-linen shadow-lg shadow-ink/20 transition-colors hover:bg-mauve-deep"
                >
                  {t.cart.checkout}
                  <ArrowIcon className="h-4 w-4" />
                </button>
              </footer>
            </>
          ))}

        {/* ---------- checkout step ---------- */}
        {step === "checkout" && (
          <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
            <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-6 py-5">
              <Field
                label={t.cart.nameL}
                required
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder={t.cart.namePh}
              />
              <Field
                label={t.cart.phoneL}
                required
                type="tel"
                dir="ltr"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder={t.cart.phonePh}
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label={t.cart.cityL}
                  value={form.city}
                  onChange={(v) => setForm({ ...form, city: v })}
                  placeholder={t.cart.cityPh}
                />
                <Field
                  label={t.cart.addressL}
                  value={form.address}
                  onChange={(v) => setForm({ ...form, address: v })}
                  placeholder={t.cart.addressPh}
                />
              </div>
              <div>
                <span className="mb-1.5 block text-xs font-bold text-ink/70">
                  {t.cart.paymentL}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {t.cart.payments.map((pm, i) => (
                    <button
                      type="button"
                      key={pm}
                      onClick={() => setForm({ ...form, payment: pm })}
                      className={`flex flex-col items-center gap-2 rounded-2xl border px-2 py-3 transition-all ${
                        payment === pm
                          ? "border-ink bg-ink"
                          : "border-ink/15 hover:border-mauve"
                      }`}
                    >
                      <PayIcon kind={i === 0 ? "cash" : i === 1 ? "card" : "apple"} />
                      <span
                        className={`text-center text-[11px] font-bold leading-tight ${
                          payment === pm ? "text-linen" : "text-ink/60"
                        }`}
                      >
                        {pm}
                      </span>
                    </button>
                  ))}
                </div>

                {payment === t.cart.payments[1] && (
                  <div className="mt-3 space-y-3 rounded-2xl border border-sand bg-linen p-4">
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-xs font-bold text-ink/70">
                          {t.cart.cardL}
                        </span>
                        {brand && (
                          <span className="text-[11px] font-bold text-sage-deep">
                            {fill(t.cart.detected, {
                              brand: brandName(brand, lang),
                            })}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          dir="ltr"
                          inputMode="numeric"
                          value={form.card}
                          onChange={(e) => onCard(e.target.value)}
                          placeholder={t.cart.cardPh}
                          className="w-full rounded-xl border border-ink/15 bg-cream/60 py-3 pe-14 ps-4 text-sm tracking-widest outline-none transition-colors placeholder:text-ink/30 focus:border-mauve"
                        />
                        <span className="absolute end-2.5 top-1/2 -translate-y-1/2">
                          <PayIcon kind={brand ?? "card"} />
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-ink/70">
                          {t.cart.expiryL}
                        </span>
                        <input
                          dir="ltr"
                          inputMode="numeric"
                          value={form.expiry}
                          onChange={(e) => onExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full rounded-xl border border-ink/15 bg-cream/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/30 focus:border-mauve"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-ink/70">
                          {t.cart.cvvL}
                        </span>
                        <input
                          dir="ltr"
                          inputMode="numeric"
                          value={form.cvv}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                            })
                          }
                          placeholder="123"
                          className="w-full rounded-xl border border-ink/15 bg-cream/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/30 focus:border-mauve"
                        />
                      </label>
                    </div>
                  </div>
                )}
                {payment === t.cart.payments[2] && (
                  <p className="mt-3 rounded-xl bg-sage-soft px-4 py-3 text-xs font-bold text-sage-deep">
                    {t.cart.appleReady}
                  </p>
                )}
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-ink/70">
                  {t.cart.notesL}
                </span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder={t.cart.notesPh}
                  className="w-full resize-none rounded-2xl border border-ink/15 bg-linen px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-ink/35 focus:border-mauve"
                />
              </label>
              {error && (
                <p className="rounded-xl bg-mauve/10 px-4 py-3 text-xs font-bold text-mauve-deep">
                  {error}
                </p>
              )}
            </div>
            <footer className="border-t border-sand bg-linen px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-ink/60">
                  {count} — {payment}
                  {gift ? ` — ${t.cart.giftFree}` : ""}
                </span>
                <span className="font-display text-lg font-bold text-ink">
                  {fmt(total)}
                </span>
              </div>
              <button
                type="submit"
                disabled={placing}
                className="w-full rounded-full bg-ink py-4 text-sm font-bold text-linen shadow-lg shadow-ink/20 transition-all hover:bg-mauve-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {placing
                  ? t.cart.sending
                  : `${t.cart.confirm} — ${fmt(total)}`}
              </button>
            </footer>
          </form>
        )}

        {/* ---------- done step ---------- */}
        {step === "done" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-10 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-sage/15 text-sage-deep">
              <CheckIcon className="h-10 w-10" />
            </span>
            <p className="font-display text-3xl font-bold text-ink">
              {t.cart.doneTitle}
            </p>
            <p className="text-sm leading-8 text-ink/60">
              {t.cart.doneA}{" "}
              <span className="font-bold text-mauve-deep" dir="ltr">
                {orderCode}
              </span>
              <br />
              {t.cart.doneB}
            </p>
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-2 rounded-full bg-ink px-8 py-3.5 text-sm font-bold text-linen transition-colors hover:bg-mauve-deep"
            >
              {t.cart.continue}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
