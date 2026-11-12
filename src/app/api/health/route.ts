import { getDb, isDbConfigured } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * Health check يعمل دائماً (200) حتى بدون قاعدة بيانات —
 * يبلّغ عن حالة القاعدة عبر الحقول بدل إرجاع 500.
 */
export async function GET() {
  if (!isDbConfigured()) {
    return Response.json({ ok: true, database: false, note: "DATABASE_URL not set" });
  }
  try {
    await getDb().execute(sql`select 1`);
    return Response.json({ ok: true, database: true });
  } catch {
    return Response.json({ ok: true, database: false, note: "db connection failed" });
  }
}
