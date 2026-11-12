import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  subtitle: text("subtitle"),
  category: text("category").notNull(), // "bags" | "makeup"
  price: integer("price").notNull(),
  oldPrice: integer("old_price"),
  description: text("description"),
  nameEn: text("name_en"),
  subtitleEn: text("subtitle_en"),
  descriptionEn: text("description_en"),
  image: text("image").notNull(),
  badge: text("badge"),
  featured: boolean("featured").notNull().default(false),
  stock: integer("stock").notNull().default(20),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  city: text("city"),
  address: text("address"),
  paymentMethod: text("payment_method").notNull(),
  notes: text("notes"),
  items: jsonb("items").notNull(),
  total: integer("total").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ProductRow = typeof products.$inferSelect;
export type OrderRow = typeof orders.$inferSelect;
