import { downloadInvoiceAction } from "@/actions/billing/download-invoice-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDownloadInvoice = () => {
  const { mutate: downloadInvoice, isPending: isDownloadingInvoice } = useMutation({
    mutationFn: downloadInvoiceAction,
    onSuccess: (data: any) => {
      window.location.href = data.url
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return { downloadInvoice, isDownloadingInvoice }
}
