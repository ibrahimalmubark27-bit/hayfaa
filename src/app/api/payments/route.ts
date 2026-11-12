import { NextResponse } from "next/server";
import { PAYMENT_CONFIG } from "@/lib/payment";

/**
 * نقطة ربط بوابة الدفع.
 *
 * حالياً: يرفض الطلب بـ 501 (البوابة غير مفعّلة بعد) حتى تضاف المفاتيح.
 * عند الربط: استقبلي { amountQAR, currency, customer } وأنشئي PaymentIntent
 * بمفتاح STRIPE_SK ثم أرجعي clientSecret للمنتج (السلة) في الواجهة.
 *
 * ملاحظة: المبالغ في قاعدة البيانات كلها بالريال القطري (QAR).
 */
export async function POST(req: Request) {
  if (PAYMENT_CONFIG.provider === "manual" || !PAYMENT_CONFIG.stripePublishableKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "بوابة الدفع الإلكتروني غير مفعّلة بعد — الدفع حالياً عند الاستلام أو بالتحويل البنكي",
      },
      { status: 501 }
    );
  }

  // ── عند ربط Stripe: ─────────────────────────────────────────
  // const stripe = new Stripe(process.env.STRIPE_SK!);
  // const body = await req.json() as { amountQAR: number; customer: string };
  // const intent = await stripe.paymentIntents.create({
  //   amount: Math.round(body.amountQAR * 100),
  //   currency: "qar",
  //   metadata: { customer: body.customer },
  // });
  // return NextResponse.json({ ok: true, clientSecret: intent.client_secret });
  // ────────────────────────────────────────────────────────────
  return NextResponse.json({ ok: false, error: "Not implemented yet" }, { status: 501 });
}
