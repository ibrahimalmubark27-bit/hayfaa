import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, isDbConfigured } from "@/db";
import { products } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    if (!isDbConfigured()) return NextResponse.json([]);
    const url = new URL(req.url);
    const cat = url.searchParams.get("category");
    const rows =
      cat && cat !== "all"
        ? await db.select().from(products).where(eq(products.category, cat))
        : await db.select().from(products);
    rows.sort(
      (a, b) => Number(b.featured) - Number(a.featured) || b.id - a.id
    );
    return NextResponse.json(rows);
  } catch (e) {
    console.error("[products] db error:", e);
    return NextResponse.json([]);
  }
}
