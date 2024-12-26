import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique
} from "drizzle-orm/pg-core";

export const role = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: role("role").default("USER"),
  isTwoFactorEnabled: boolean().default(false) // Directly assign the default value
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const verificationTokens = pgTable(
  "verificationToken",
  {
    id: text("id").$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.email, verificationToken.token],
    }),
  })
);

export const passwordResetTokens = pgTable(
  "passwordResetToken",
  {
    id: text("id").$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (passwordResetToken) => ({
    first: unique().on(passwordResetToken.email, passwordResetToken.token)
  })
);

export const twoFactorToken = pgTable("twoFactorToken", {
  id: text("id").$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
},
  (twoFactorToken) => ({
    first: unique().on(twoFactorToken.email, twoFactorToken.token)
  })
);

export const twoFactorConfirmation = pgTable("twoFactorConfirmation", {
  id: text("id").$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" })
}, (twoFactorConfirmation) => ({
  first: unique().on(twoFactorConfirmation.userId)
}))

export const users_twoFactorConfirmationRelation = relations(users, ({ one }) => ({
  twoFactor: one(twoFactorConfirmation, {
    fields: [users.id],
    references: [twoFactorConfirmation.userId]
  })
}))
