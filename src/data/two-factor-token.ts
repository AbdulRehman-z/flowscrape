import { db } from "@/db";
import { twoFactorToken } from "@/db/schemas/auth-schema";
import { eq } from "drizzle-orm";

export const get2FATokenByEmail = async (email: string) => {
  try {
    const token = await db.select().from(twoFactorToken).where(eq(twoFactorToken.email, email));
    return token.at(0) ?? null;
  } catch (error) {
    console.error("Error fetching 2FA token by email:", error);
    throw new Error("Failed to fetch 2FA token by email");
  }
}
