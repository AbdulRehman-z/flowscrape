import "server-only";
import Stripe from "stripe";
import { GetSelectedCreditPack } from "../workflow/helpers";
import { PackId } from "@/types/pricing-types";
import { db, userBalance, userPurchase } from "@/db";
import { sql } from "drizzle-orm";

export const HandleCheckoutSessionCompleted = async (event: Stripe.Checkout.Session) => {
  const metadata = event.metadata
  if (!metadata) {
    throw new Error("no metadata attached with the checkout session")
  }

  const { userId, packId } = metadata
  if (!userId || !packId) {
    throw new Error("userId or packId not found in metadata")
  }

  const purchasedPack = GetSelectedCreditPack(packId as PackId)
  if (!purchasedPack) {
    throw new Error("purchased pack not found")
  }

  await db.insert(userBalance)
    .values({
      userId: userId,
      credits: purchasedPack.credits,
    })
    .onConflictDoUpdate({
      target: userBalance.userId, // Conflict on 'userId' field
      set: {
        // Increment existing credits by the new value (PostgreSQL EXCLUDED keyword)
        credits: sql`${userBalance.credits} + EXCLUDED.credits`
      }
    });

  await db.insert(userPurchase).values({
    userId,
    amount: event.amount_total!,
    currency: event.currency!,
    description: `${purchasedPack.name} - ${purchasedPack.credits} credits`,
    stripeId: event.id,
  })
}
