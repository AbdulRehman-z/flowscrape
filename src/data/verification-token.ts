import { db } from "@/db";
import { verificationTokens } from "@/db/schemas/auth-schema";
import { eq } from "drizzle-orm";

export const getVerificationTokenByEmail = async function (
  email: string
): Promise<typeof verificationTokens.$inferSelect | null> {
  try {
    const token = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.email, email));
    return token.at(0) ?? null;
  } catch (error) {
    console.error("Error fetching verification token by email:", error);
    throw new Error("Failed to fetch verification token by email");
  }
};

export const getVerificationTokenByToken = async function (
  token: string
): Promise<typeof verificationTokens.$inferSelect | null> {
  try {
    const tokenRecord = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.token, token));

    console.log("token record:", tokenRecord)

    return tokenRecord.at(0) ?? null;
  } catch (error) {
    console.error("Error fetching verification token by token:", error);
    throw new Error("Failed to fetch verification token by token");
  }
};
