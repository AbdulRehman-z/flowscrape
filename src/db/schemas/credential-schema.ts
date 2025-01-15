import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const credentials = pgTable('credential', {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id"),
  name: text("name"),
  value: text("value"),
  createdAt: timestamp("created_at").notNull().defaultNow()
}, (table) => ({
  credNameUserIdx: uniqueIndex('cred_name_user_idx').on(table.name, table.userId)
}))
