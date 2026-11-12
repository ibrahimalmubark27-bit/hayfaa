/**
 * ─────────────────────────────────────────────────────────────
 *  إعداد بوابة الدفع — جاهز للربط
 * ─────────────────────────────────────────────────────────────
 * الوضع الحالي: "manual" (دفع عند الاستلام / تحويل بنكي /
 * تأكيد الطلب عبر واتساب).
 *
 * خطوات تفعيل الدفع الإلكتروني (Stripe مثالاً — يدعم الريال القطري):
 * 1) افتحي حساب Stripe تجاري (تفعيل دولة قطر) أو Checkout.com.
 * 2) أضيفي المفاتيح في ملف .env:
 *      NEXT_PUBLIC_STRIPE_PK=pk_test_...
 *      STRIPE_SK=sk_test_...
 * 3) اكملي دالة createPaymentIntent في src/app/api/payments/route.ts
 *    (هي جاهزة بالهيكل، ما ينقصها إلا استدعاء مكتبة stripe).
 * 4) بدّلي provider بالأسفل إلى "stripe".
 *
 * نفس الطريقة تنطبق على أي وسيط آخر (Checkout.com, Tabby, ...).
 * ─────────────────────────────────────────────────────────────
 */
export const PAYMENT_CONFIG = {
  provider: "manual" as "manual" | "stripe" | "checkout",
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PK ?? "",
};

/** Payment methods shown in the checkout (localized in i18n) */
export const GATEWAY_READY = PAYMENT_CONFIG.provider === "manual";
