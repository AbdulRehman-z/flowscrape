"use client";

import { newPasswordAction } from "@/actions/new-password-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newPasswordSchema } from "../../schemas/auth-schema";
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

export default function NewPassowrdForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<{
    error?: string;
    success?: string;
  }>({});
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: ""
    },
  });


  const onSubmit = async (data: z.infer<typeof newPasswordSchema>) => {
    setFormStatus({}); // Clear previous status

    startTransition(() => {
      newPasswordAction(data, token)
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
      titleHeader="Set new password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Enter your new strong password below"
    >
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="password"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-muted-foreground">
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="*********"
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
              {isPending ? <Loader2 className="animate-spin" /> : "Reset password"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper >
  );
}
