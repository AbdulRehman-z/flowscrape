import { db } from "@/db"
import { twoFactorConfirmation } from "@/db/schemas/auth-schema"
import { eq } from "drizzle-orm"

export const get2FAConfirmationByUserId = async (userId: string) => {
  try {

    const twoFactorConfirmationToken = await db.select().from(twoFactorConfirmation).where(eq(twoFactorConfirmation.userId, userId))

    return twoFactorConfirmationToken.at(0)
  } catch (error) {
    console.error("Error fetching 2FA confirmation by email:", error);
    throw new Error("Failed to fetch 2FA confirmation by email");
  }
}
