"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { useDeleteCredential } from "@/hooks/credential/use-delete-credential"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { TrashIcon } from "lucide-react"

type DeletecredentialDialogProps = {
  credentialName: string,
}

export function DeleteCredentialDialog({ credentialName }: DeletecredentialDialogProps) {
  const [open, setOpen] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const { deleteCredential, isDeletingCredential } = useDeleteCredential()
  function handleDelete() {
    deleteCredential(credentialName)
    setConfirmText("")
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"}>
          <TrashIcon className="size-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            <b className="font-bold text-secondary-foreground"> {credentialName}</b> credential and remove your data from our servers.
          </AlertDialogDescription>

          <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="Type credential name to confirm" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={confirmText !== credentialName || isDeletingCredential} onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
