import { purchaseCreditsAction } from "@/actions/billing/purchase-credits-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const usePurchaseCredits = () => {
  const { mutate: purchaseCredits, isPending: isPurchaseCreditsPending }
    = useMutation({
      mutationFn: purchaseCreditsAction,
      onSuccess: () => {
        toast.success("Purchased successfully", { id: "credits-purchase" })
      },
      onError: (error: any) => {
        console.error(error)
        toast.error("Purchase failed", { id: "credits-purchase" })
      }
    })

  return { purchaseCredits, isPurchaseCreditsPending }
}
