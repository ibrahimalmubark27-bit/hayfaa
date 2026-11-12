import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db, isDbConfigured } from "@/db";
import { orders, products } from "@/db/schema";

export const dynamic = "force-dynamic";

type OrderItemIn = { productId: number; qty: number };

export async function POST(req: Request) {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json(
        { ok: false, error: "المتجر غير موصول بقاعدة البيانات حالياً" },
        { status: 503 }
      );
    }
    const body = (await req.json()) as {
      customerName?: string;
      phone?: string;
      city?: string;
      address?: string;
      paymentMethod?: string;
      notes?: string;
      name?: string;
      payment?: string;
      items?: OrderItemIn[];
    };

    const customerName = String(body.customerName ?? body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const city = String(body.city ?? "").trim();
    const address = String(body.address ?? "").trim();
    const paymentMethod = String(body.paymentMethod ?? body.payment ?? "كاش عند الاستلام").trim();
    const notes = String(body.notes ?? "").trim();
    const items = Array.isArray(body.items) ? body.items : [];

    if (!customerName || !phone) {
      return NextResponse.json(
        { ok: false, error: "الاسم ورقم الهاتف مطلوبان" },
        { status: 400 }
      );
    }
    if (items.length === 0) {
      return NextResponse.json(
        { ok: false, error: "سلتك فاضية" },
        { status: 400 }
      );
    }

    const result = await db.transaction(async (tx) => {
      let total = 0;
      const orderItems: {
        productId: number;
        name: string;
        price: number;
        qty: number;
        image: string;
      }[] = [];

      for (const it of items) {
        const id = Number(it?.productId);
        const qty = Math.max(1, Math.min(20, Number(it?.qty) || 1));
        const rows = await tx
          .select()
          .from(products)
          .where(eq(products.id, id));
        const p = rows[0];
        if (!p || p.stock < qty) {
          return {
            ok: false as const,
            error: p ? `الكمية المطلوبة غير متوفرة من «${p.name}»` : "أحد المنتجات غير متوفر",
          };
        }
        total += p.price * qty;
        orderItems.push({
          productId: p.id,
          name: p.name,
          price: p.price,
          qty,
          image: p.image,
        });
        await tx
          .update(products)
          .set({ stock: p.stock - qty })
          .where(eq(products.id, p.id));
      }

      const code =
        "HB-" +
        Math.random().toString(36).slice(2, 6).toUpperCase() +
        Date.now().toString(36).slice(-2).toUpperCase();

      const [order] = await tx
        .insert(orders)
        .values({
          code,
          customerName,
          phone,
          city,
          address,
          paymentMethod,
          notes,
          items: orderItems,
          total,
          status: "new",
        })
        .returning();

      return { ok: true as const, order };
    });

    if (!result.ok) {
      return NextResponse.json(result, { status: 409 });
    }
    return NextResponse.json({
      ok: true,
      code: result.order.code,
      total: result.order.total,
    });
  } catch (e) {
    console.error("order creation failed", e);
    return NextResponse.json(
      { ok: false, error: "حدث خطأ غير متوقع، حاولي مجدداً" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const rows = await db.select().from(orders).orderBy(desc(orders.id));
  return NextResponse.json(rows);
}
