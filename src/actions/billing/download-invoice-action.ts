"use server"

import { auth } from "@/auth"
import { db, userPurchase } from "@/db"
import { stripe } from "@/lib/stripe/stripe"
import { and, eq } from "drizzle-orm"

export const downloadInvoiceAction = async (id: string) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Not authenticated")
  }

  const userId = session.user.id

  const [purchase] = await db.select().from(userPurchase).where(and(eq(userPurchase.id, id), eq(userPurchase.userId, userId)))

  if (!purchase) {
    throw new Error("No purchase found")
  }

  const stripeSession = await stripe.checkout.sessions.retrieve(purchase.stripeId)
  if (!stripeSession) {
    throw new Error("Stripe session not found")
  }

  const invoice = await stripe.invoices.retrieve(stripeSession.id)
  if (!invoice) {
    throw new Error("Invoice not found")
  }

  return invoice.hosted_invoice_url
}
