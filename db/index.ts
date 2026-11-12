import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export type Db = NodePgDatabase<typeof schema>;

let _db: Db | null = null;

/** هل متغير DATABASE_URL موجود في بيئة التشغيل؟ */
export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * يولّد عميل قاعدة البيانات كسولاً عند أول استخدام فقط.
 * استيراد هذا الملف وقت البناء آمن تماماً ولا يتطلب أي متغيرات بيئة.
 */
export function getDb(): Db {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Add it to your environment variables."
      );
    }
    const pool = new Pool({ connectionString: url });
    _db = drizzle(pool, { schema }) as unknown as Db;
  }
  return _db;
}

/**
 * مصدور متوافق مع الاستعمال السابق (db.select ...).
 * بروبوكسي كسول: استيراده وقت البناء لا يفعل شيئاً،
 * وعميل القاعدة يُنشأ فقط عند أول عملية فعلية.
 */
export const db: Db = new Proxy({} as Db, {
  get(_target, prop) {
    const real = getDb() as unknown as Record<PropertyKey, unknown>;
    const value = real[prop];
    return typeof value === "function" ? value.bind(real) : value;
  },
});
