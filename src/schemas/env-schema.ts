import { z } from "zod";

const envSchema = z.object({
  AUTH_DRIZZLE_URL: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
  AUTH_FACEBOOK_ID: z.string(),
  AUTH_FACEBOOK_SECRET: z.string(),
  RESEND_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
