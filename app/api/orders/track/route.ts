import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, isDbConfigured } from "@/db";
import { orders } from "@/db/schema";

export const dynamic = "force-dynamic";

const STAGES = [
  { t: "تم استلام الطلب", s: "نراجع طلبك حالياً" },
  { t: "قيد التجهيز", s: "نجهّز طلبك بتغليف هدية" },
  { t: "تم الشحن", s: "طلبك في الطريق — راح نتواصل معك" },
];

export async function GET(req: Request) {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json(
        { ok: false, error: "خدمة التتبع غير متاحة حالياً" },
        { status: 503 }
      );
    }
    const code = new URL(req.url).searchParams.get("code")?.trim().toUpperCase();
    if (!code) {
      return NextResponse.json(
        { ok: false, error: "أدخلي رقم الطلب" },
        { status: 400 }
      );
    }
    const rows = await db.select().from(orders).where(eq(orders.code, code));
    const o = rows[0];
    if (!o) {
      return NextResponse.json(
        { ok: false, error: "ما لقينا طلب بهذا الرقم" },
        { status: 404 }
      );
    }
    const hours = (Date.now() - o.createdAt.getTime()) / 36e5;
    const stage = hours < 1 ? 0 : hours < 24 ? 1 : 2;
    const itemCount = Array.isArray(o.items) ? o.items.length : 0;
    return NextResponse.json({
      ok: true,
      code: o.code,
      total: o.total,
      itemCount,
      stage,
      stages: STAGES,
    });
  } catch (e) {
    console.error("[track] error:", e);
    return NextResponse.json(
      { ok: false, error: "حدث خطأ، حاولي مجدداً" },
      { status: 500 }
    );
  }
}
