"use client"

import { Layers2Icon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import { createCredentialSchema, CreateCredentialSchemaType } from "@/schemas/credential-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomDialogHeader from "../custom-dialog-header";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useCreateCredential } from "@/hooks/credential/use-create-credential";

type CreateCredentialDialogProps = {
  triggerText?: string
}

export default function CreateCredentialDialog({ triggerText }: CreateCredentialDialogProps) {
  const [open, setOpen] = useState(false);
  const { isCreatingCredential, createCredential } = useCreateCredential()
  const form = useForm<CreateCredentialSchemaType>({
    resolver: zodResolver(createCredentialSchema),
    defaultValues: {
      name: "",
      value: ""
    }
  })

  const onSubmit = useCallback((data: CreateCredentialSchemaType) => {
    createCredential(data)
    form.reset()
    setOpen((prev) => !prev)
  }, [createCredential, setOpen, form])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="">
          {triggerText ?? "Proceed"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create Credential"
        />
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
                    <Input placeholder="Credential name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a unique and descriptive name for your credential
                    <br />
                    This name will be use to identify the description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Description
                    <p className="text-sm">(Required)</p>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Credential value" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the value associated with this credential
                    <br />
                    This value will be securely stored and encrypted
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isCreatingCredential}>
              {isCreatingCredential ? <Loader2 className="animate-spin" /> : "Create credential"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
