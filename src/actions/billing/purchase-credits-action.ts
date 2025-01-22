"use server"

import { auth } from "@/auth"
import { stripe } from "@/lib/stripe/stripe"
import { GetSelectedCreditPack } from "@/lib/workflow/helpers"
import { PackId } from "@/types/pricing-types"
import { redirect } from "next/navigation"

export const purchaseCreditsAction = async (packId: PackId) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Not logged in")
  }

  const userId = session.user.id
  const selectedPack = GetSelectedCreditPack(packId)
  if (!selectedPack) {
    throw new Error("Pack not found")
  }

  const priceId = selectedPack.priceId

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    invoice_creation: {
      enabled: true
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/billing`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/billing`,
    metadata: {
      userId,
      price: priceId
    }
  })

  if (!stripeSession.url) {
    throw new Error("Could not create checkout session")
  }

  redirect(stripeSession.url)
}
