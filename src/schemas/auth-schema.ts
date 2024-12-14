import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Provide a valid email",
    })
    .email({
      message: "Provide a valid email",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  })),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be between 3 and 20 characters",
    })
    .max(20, {
      message: "Name must be between 3 and 20 characters",
    }),
  email: z
    .string({
      invalid_type_error: "Provide a valid email",
    })
    .email({
      message: "Provide a valid email",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const resetSchema = z.object({
  email: z.string().email()
})

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})
