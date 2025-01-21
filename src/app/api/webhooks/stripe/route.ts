import { stripe } from "@/lib/stripe"
import { env } from "@/schemas/env-schema"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature") as string

  try {
    const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
    switch (event.type) {
      case "checkout.session.completed":
        HandleCheckoutSessionCompleted(event.data.object)
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("webhook error", { status: 400 })
  }
}
