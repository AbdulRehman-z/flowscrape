import { deleteCredentialAction } from "@/actions/credential/delete-credential-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDeleteCredential = () => {
  const { mutate: deleteCredential, isPending: isDeletingCredential } = useMutation({
    mutationFn: deleteCredentialAction,
    onSuccess: () => {
      toast.success("credential deleted successfully", { id: "delete-credential" })
    },
    onError: (error) => {
      console.error(error)
      toast.error("something went wrong", { id: "delete-credential" })
    }
  })

  return {
    deleteCredential, isDeletingCredential
  }
}
