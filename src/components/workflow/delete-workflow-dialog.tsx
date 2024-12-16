"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useDeleteWorkflow } from "@/hooks/workflow/use-delete-workflow"
import { useState } from "react"
import { Input } from "../ui/input"

type DeleteWorkflowDialogProps = {
  workflowId: string,
  workflowName: string,
  open: boolean,
  setOpen: (open: boolean) => void
}

export function DeleteWorkflowDialog({ open, setOpen, workflowId, workflowName }: DeleteWorkflowDialogProps) {
  const [confirmText, setConfirmText] = useState("")
  const { deleteWorkflow, isDeletingWorkflow } = useDeleteWorkflow()
  function handleDelete() {
    deleteWorkflow(workflowId)
    setConfirmText("")
  }

  return (
    <AlertDialog open={open} onOpenChange={() => {
      setConfirmText("")
      setOpen(false)
    }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            <b className="font-bold text-secondary-foreground"> {workflowName}</b> workflow and remove your data from our servers.
          </AlertDialogDescription>

          <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="Type workflow name to confirm" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={confirmText !== workflowName || isDeletingWorkflow} onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
