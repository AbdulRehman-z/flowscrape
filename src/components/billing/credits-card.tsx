"use client"

import { CoinsIcon, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { CreditsPack, PackId } from "@/types/pricing-types";
import { Button } from "../ui/button";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { usePurchaseCredits } from "@/hooks/billing/use-purchase-credits";

export default function CreditsPurchase() {
  const [selectedPack, setSelectedPack] = useState(PackId.MEDIUM)
  const { purchaseCredits, isPurchaseCreditsPending } = usePurchaseCredits()
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center gap-x-2">
          <h3 className="text-2xl font-extrabold text-foreground">{selectedPack}</h3>
          <CoinsIcon className="size-6 text-foreground" />
          <h3 className="text-2xl font-extrabold text-foreground">
            Purchase Credits
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Select the amount of credits you want to purchase.
        </p>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={(value) => setSelectedPack(value as PackId)} value={selectedPack}>
          {CreditsPack.map((pack) => (
            <div
              key={pack.id}
              className="flex items-center space-x-3 bg-secondary/50 rounded-lg p-3 hover:bg-secondary"
              onClick={() => setSelectedPack(pack.id as PackId)}
            >
              <RadioGroupItem value={pack.id} id={pack.id} />
              <Label className="flex justify-between w-full cursor-pointer">
                <span className="font-medium">
                  {pack.name} - {pack.label}
                </span>
                <span className="font-bold">
                  ${(pack.price / 100).toFixed(2)}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CreditCard className="mr-2 size-5" /> Purchase credits
        </Button>
      </CardFooter>
    </Card>
  )
}
