"use client"

import { Dialog } from "@radix-ui/react-dialog"
import { DialogClose, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog"
import cronstrue from "cronstrue"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon, TriangleAlertIcon } from "lucide-react"
import CustomDialogHeader from "../custom-dialog-header"
import { Input } from "../ui/input"
import { useUpdateExecutionCron } from "@/hooks/workflow/use-update-execution-cron"
import { useEffect, useState } from "react"
import { toast } from "sonner"

type SchedulerDialogProps = {
  workflowId: string
}

export default function SchedulerDialog({ workflowId }: SchedulerDialogProps) {
  const [cron, setCron] = useState("")
  const [validCron, setValidCron] = useState(false)
  const [readableCron, setReadableCron] = useState("")
  const { updateExecutionCron, isUpdatingExecutionCron } = useUpdateExecutionCron()


  function handleSave() {
    toast.loading("Saving workflow execution schedule...", {
      id
        : "execution-schedule"
    })
    updateExecutionCron({
      cron,
      workflowId,
    })
  }


  useEffect(() => {
    try {
      const humanCronStr = cronstrue.toString(cron)
      setValidCron(true)
      setReadableCron(humanCronStr)
    } catch (error) {
      setValidCron(false)
      console.error(error)
    }
  }, [setValidCron, cron])


  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"link"}
          size={"sm"}
          className={cn("text-sm p-0 h-auto")}
        >
          <div className="flex items-center gap-1">
            <TriangleAlertIcon className="size-3" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader title="Schedule workflow execution" icon={CalendarIcon} />
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground text-sm">Specify a cron expression to schedule periodic execution of this workflow.</p>
          <Input value={cron} onChange={(e) => setCron(e.target.value)} placeholder="*****" />
          <div className={cn("bg-accent rounded-md p-4 text-sm border-destructive text-destructive ", validCron && "border-primary text-primary")}>
            {validCron ? readableCron : "Invalid cron expression"}
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"} className="w-full" >Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={handleSave} className="w-full" >Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
