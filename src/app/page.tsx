import { desc } from "drizzle-orm";
import { db, isDbConfigured } from "@/db";
import { products as productsTable } from "@/db/schema";
import type { Product } from "@/lib/types";
import Storefront from "@/components/Storefront";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products: Product[] = [];
  try {
    if (isDbConfigured()) {
      const rows = await db
        .select()
        .from(productsTable)
        .orderBy(desc(productsTable.featured), desc(productsTable.id));

      products = rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        subtitle: r.subtitle,
        category: r.category as Product["category"],
        price: r.price,
        oldPrice: r.oldPrice,
        description: r.description,
        nameEn: r.nameEn,
        subtitleEn: r.subtitleEn,
        descriptionEn: r.descriptionEn,
        image: r.image,
        badge: r.badge,
        featured: r.featured,
        stock: r.stock,
      }));
    }
  } catch (e) {
    // بدون قاعدة بيانات (أو عند فشلها) يُعرض الموقع بقائمة فارغة بدل 500
    console.error("[home] database unavailable, rendering empty catalog:", e);
  }

  return <Storefront products={products} />;
}
