import { createCredentialAction } from "@/actions/credential/create-credential-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateCredential = () => {
  const { mutate: createCredential, isPending: isCreatingCredential } = useMutation({
    mutationFn: createCredentialAction,
    onSuccess: () => {
      toast.success("credential created successfully", { id: "create-credential" })
    },
    onError: (error) => {
      console.error(error)
      toast.error("something went wrong", { id: "create-credential" })
    }
  })

  return { createCredential, isCreatingCredential }
}
