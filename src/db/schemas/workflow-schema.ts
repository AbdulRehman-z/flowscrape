import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const workflows = pgTable(
  "workflow",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("userId").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    defination: text("defination").notNull(),
    status: text("status").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (workflow) => ({
    userIdNameIdx: uniqueIndex("userId_name_idx").on(workflow.userId, workflow.name),
  })
);
