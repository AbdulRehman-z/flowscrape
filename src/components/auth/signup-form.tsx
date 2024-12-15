"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupSchema } from "../../schemas/auth-schema";
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

import { useState, useTransition } from "react";
import { signupAction } from "../../actions/signup-action";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";

export default function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<{
    error?: string;
    success?: string;
  }>({});

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signupSchema>) {
    setFormStatus({}); // Clear previous status

    startTransition(() => {
      signupAction(data)
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
  }

  return (
    <CardWrapper
      titleHeader="Sign up to Acme Inc"
      titleFooter="Sign in"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      headerLabel="Welcome! Please sign up to continue"
      showSocial
    >
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
          <FormField
            control={form.control}
            name="password"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={formStatus.error} />
          <FormSuccess message={formStatus.success} />
          <div className="pt-4">
            <Button className="w-full " type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create account"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
