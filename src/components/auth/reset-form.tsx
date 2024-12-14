"use client";

import { resetAction } from "@/actions/reset-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetSchema } from "../../schemas/auth-schema";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CardWrapper from "./card-wrapper";

export default function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<{
    error?: string;
    success?: string;
  }>({});
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetSchema>) => {
    setFormStatus({}); // Clear previous status

    startTransition(() => {
      resetAction(data)
        .then((response) => {
          setFormStatus(
            response.error
              ? { error: response.error }
              : { success: response.success }
          );
        })
        .catch((error) => {
          setFormStatus({
            error: error instanceof Error ? error.message : "An error occurred",
          });
        });
    });
  };

  return (
    <CardWrapper
      titleFooter="Login"
      titleHeader="Forgot your password?"
      backButtonHref="/auth/login"
      backButtonLabel="Change of mind?"
      headerLabel="Enter your email, we will send a password reset link on that"
    >
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-muted-foreground">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="johndoe@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={formStatus.error} />
          <FormSuccess message={formStatus.success} />
          <div className="pt-4">
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Send Reset link"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper >
  );
}
