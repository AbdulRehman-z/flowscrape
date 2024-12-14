import { db } from "@/db"
import { passwordResetTokens } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getPasswordResetTokenByToken = async (token: string): Promise<typeof passwordResetTokens.$inferSelect | null> => {
  try {
    const passwordResetToken = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.token, token))

    return passwordResetToken.at(0) ?? null
  } catch (error) {
    console.error("Error fetching password reset token by email:", error);
    throw new Error("Failed to fetch password reset token by email");
  }
}



export const getPasswordResetTokenByEmail = async (email: string): Promise<typeof passwordResetTokens.$inferSelect | null> => {
  try {
    const token = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.email, email))

    return token.at(0) ?? null
  } catch (error) {
    console.error("Error fetching password reset token by email:", error);
    throw new Error("Failed to fetch password reset token by email");
  }
}
