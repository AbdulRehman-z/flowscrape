import { z } from "zod";

export const createCredentialSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required"
  }),
  value: z
    .string({
      invalid_type_error: "Provide a valid value",
    }).max(500, {
      message: "Value must be between 3 and 500 characters",
    }).min(10, {
      message: "Value must be between 3 and 500 characters",
    })
})

export type CreateCredentialSchemaType = z.infer<typeof createCredentialSchema>
