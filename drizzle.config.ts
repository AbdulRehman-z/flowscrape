import { env } from "./src/schemas/env-schema";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/mirgrations",
  schema: "./src/db/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.AUTH_DRIZZLE_URL,
  },
  verbose: true,
  strict: true,
});
