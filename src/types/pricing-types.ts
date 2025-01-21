import { env } from "@/schemas/env-schema"

type CreditPack = {
  id: string
  name: string
  label: string
  price: number
  credits: number
  priceId: string
}

export enum PackId {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export const CreditsPack: CreditPack[] = [
  {
    id: PackId.SMALL,
    name: "Small",
    label: "1,000 credits",
    credits: 1000,
    price: 999, // $9.99
    priceId: env.STRIPE_PRICE_ID_SMALL,
  },
  {
    id: PackId.MEDIUM,
    name: "Medium",
    label: "5,000 credits",
    credits: 5000,
    price: 4999, // $49.99
    priceId: env.STRIPE_PRICE_ID_MEDIUM,
  },
  {
    id: PackId.LARGE,
    name: "Large",
    label: "10,000 credits",
    credits: 10000,
    price: 9999, // $99.99
    priceId: env.STRIPE_PRICE_ID_LARGE,
  },
]
