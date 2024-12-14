"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Loader2 } from "lucide-react";
import CardWrapper from "./card-wrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth-schema";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { loginAction } from "../../actions/login-action";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<{
    error?: string;
    success?: string;
  }>({});
  const [show2FA, setShow2FA] = useState(false);
  // const [credentials, setCredentials] = useState<{
  //   email: string;
  //   password: string;
  // } | null>(null);

  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider"
    : "";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setFormStatus({});

    const submitData = show2FA
      ? {
        ...data,
        code: data.code
      }
      : data;

    startTransition(() => {
      loginAction(submitData)
        .then((response) => {
          if (response.error) {
            setFormStatus({ error: response.error });
          }
          if (response.success) {
            form.reset();
            setFormStatus({ success: response.success });
          }
          if (response.code) {
            setShow2FA(true);
            form.setValue('email', submitData.email);
            form.setValue('password', submitData.password);
          }
        })
        .catch((error) => {
          setFormStatus({
            error: error instanceof Error ? error.message : "An error occurred",
          });
        });
    });
  }

  console.log(form.watch())

  return (
    <CardWrapper
      titleHeader="Sign in to Acme Inc"
      titleFooter="Sign up"
      backButtonHref="/auth/signup"
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back! Please sign in to continue"
      showSocial
    >
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {!show2FA ? (
            <>
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
                    <Button className="p-0" variant={"link"} asChild size={"lg"}>
                      <Link href="/auth/reset">Forgot Password?</Link>
                    </Button>
                  </FormItem>
                )}
              />
            </>
          ) : (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the OTP sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormError message={formStatus.error || urlError} />
          <FormSuccess message={formStatus.success} />
          <div className="pt-4">
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : show2FA ? (
                "Verify"
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}







// "use client";

// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   FormDescription,
// } from "../ui/form";
// import { Loader2 } from "lucide-react";
// import CardWrapper from "./card-wrapper";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema } from "../../schemas/auth-schema";
// import { Input } from "../ui/input";
// import { useState, useTransition } from "react";
// import { loginAction } from "../../actions/login-action";
// import FormError from "../form-error";
// import FormSuccess from "../form-success";
// import { Button } from "../ui/button";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition();
//   const [formStatus, setFormStatus] = useState<{
//     error?: string;
//     success?: string;
//   }>({});
//   const [show2FA, setShow2FA] = useState(false);
//   const searchParams = useSearchParams();
//   const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
//     ? "Email already in use with different provider"
//     : "";

//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   async function onSubmit(data: z.infer<typeof loginSchema>) {
//     setFormStatus({});

//     console.log("The form data:", { data })

//     startTransition(() => {
//       loginAction(data)
//         .then((response) => {
//           if (response.error) {
//             form.reset()
//             setFormStatus({ error: response.error });
//           }
//           if (response.success) {
//             // form.reset();
//             setFormStatus({ success: response.success });
//           }
//           if (response.code) {
//             setShow2FA(true);
//           }
//         })
//         .catch((error) => {
//           setFormStatus({
//             error: error instanceof Error ? error.message : "An error occurred",
//           });
//         });
//     });
//   }

//   console.log(form.watch())

//   return (
//     <CardWrapper
//       titleHeader="Sign in to Acme Inc"
//       titleFooter="Sign up"
//       backButtonHref="/auth/signup"
//       backButtonLabel="Don't have an account?"
//       headerLabel="Welcome back! Please sign in to continue"
//       showSocial
//     >
//       <Form {...form}>
//         <form
//           className="w-full space-y-4"
//           onSubmit={form.handleSubmit(onSubmit)}
//         >
//           {!show2FA && (
//             <>
//               <FormField
//                 control={form.control}
//                 name="email"
//                 disabled={isPending}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         type="email"
//                         placeholder="johndoe@gmail.com"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 disabled={isPending}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input {...field} type="password" placeholder="********" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormError message={formStatus.error || urlError} />
//               <FormSuccess message={formStatus.success} />
//             </>
//           )}
//           {show2FA && (
//             <FormField
//               control={form.control}
//               name="code"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>OTP</FormLabel>
//                   <FormControl>
//                     <InputOTP
//                       maxLength={6}
//                       value={field.value}
//                       onChange={(value) => field.onChange(value)}
//                     >
//                       <InputOTPGroup>
//                         <InputOTPSlot index={0} />
//                         <InputOTPSlot index={1} />
//                         <InputOTPSlot index={2} />
//                         <InputOTPSlot index={3} />
//                         <InputOTPSlot index={4} />
//                         <InputOTPSlot index={5} />
//                       </InputOTPGroup>
//                     </InputOTP>

//                   </FormControl>
//                   <FormDescription>
//                     Please enter the OTP sent to your email.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           )}
//           <div className="pt-4">
//             <Button className="w-full" type="submit" disabled={isPending}>
//               {isPending ? (
//                 <Loader2 className="animate-spin" />
//               ) : show2FA ? (
//                 "Verify"
//               ) : (
//                 "Sign in"
//               )}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </CardWrapper>
//   );
// }
