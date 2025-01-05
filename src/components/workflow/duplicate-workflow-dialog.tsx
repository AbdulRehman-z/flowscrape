"use client"

import { CopyIcon, Layers2Icon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "../ui/dialog";

import { useDuplicateWorkflow } from "@/hooks/workflow/use-duplicate-workflow";
import { duplicateWorkflowSchema, DuplicateWorkflowSchemaType } from "@/schemas/workflow-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomDialogHeader from "../custom-dialog-header";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

type DuplicateWorkflowDialogProps = {
  workflowId?: string
}

export default function DuplicateWorkflowDialog({ workflowId }: DuplicateWorkflowDialogProps) {
  const [open, setOpen] = useState(false);
  const { duplicateWorkflow, isDuplicating } = useDuplicateWorkflow()
  const form = useForm<DuplicateWorkflowSchemaType>({
    resolver: zodResolver(duplicateWorkflowSchema),
    defaultValues: {
      workflowId,
    }
  })

  const onSubmit = useCallback((data: DuplicateWorkflowSchemaType) => {
    duplicateWorkflow(data)
    setOpen((prev) => !prev)
  }, [duplicateWorkflow])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="group-hover/card:opacity-100 opacity-0 transition-opacity ml-2">
          <CopyIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Duplicate workflow"
          subtitle="Start building your new workflow"
        />
        <DialogDescription className="text-sm text-muted-foreground">
          Duplicate workflow to automate your tasks. Fill in the details below to get started.
        </DialogDescription>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Name
                    <p className="text-sm">(Required)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Workflow name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a name for your workflow.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Description
                    <p className="text-sm">(Optional)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Workflow name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This field is optional but highly recommended as it will help you identify your workflow in the future.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isDuplicating}>
              {isDuplicating ? <Loader2 className="animate-spin" /> : "Duplicate workflow"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
