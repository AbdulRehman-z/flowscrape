"use client"

import { Layers2Icon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from "../ui/dialog";

import { useCreateWorkflow } from "@/hooks/workflow/use-create-workflow";
import { createWorkflowSchema, CreateWorkflowSchemaType } from "@/schemas/workflow-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomDialogHeader from "../custom-dialog-header";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

type CreateWorkflowDialogProps = {
  triggerText?: string
}

export default function CreateWorkflowDialog({ triggerText }: CreateWorkflowDialogProps) {
  const [open, setOpen] = useState(false);
  const { isCreatingWorkflow, createWorkflow } = useCreateWorkflow()
  const form = useForm<CreateWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })

  const onSubmit = useCallback((data: CreateWorkflowSchemaType) => {
    createWorkflow(data)
  }, [createWorkflow])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="">
          {triggerText ?? "Create workflow"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subtitle="Start building your new workflow"
        />
        <DialogDescription className="text-sm text-muted-foreground">
        Create a new workflow to automate your tasks. Fill in the details below to get started.
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
            <Button type="submit" className="w-full" disabled={isCreatingWorkflow}>
              {isCreatingWorkflow ? <Loader2 className="animate-spin" /> : "Create workflow"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
