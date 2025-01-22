"use client"

import { useDownloadInvoice } from "@/hooks/billing/use-download-invoice"
import { Loader2Icon } from "lucide-react"
import { Button } from "../ui/button"


export default function InvoiceBtn({ purchaseId }: { purchaseId: string }) {
  const { downloadInvoice, isDownloadingInvoice } = useDownloadInvoice()

  function handleClick() {
    downloadInvoice(purchaseId)
  }

  return (
    <Button onClick={handleClick} variant={"ghost"} size={"sm"} className="text-xs px-1 text-muted-foreground gap-2">
      Invoice
      {isDownloadingInvoice && <Loader2Icon className="ml-2 text-muted-foreground" />}
    </Button>
  )
}
