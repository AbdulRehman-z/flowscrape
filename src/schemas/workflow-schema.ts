import { z } from "zod";

export const createWorkflowSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required",
  }),
  description: z
    .string({
      invalid_type_error: "Provide a valid description",
    }).max(250, {
      message: "Description must be between 3 and 250 characters",
    }).optional()
});

export type CreateWorkflowSchemaType = z.infer<typeof createWorkflowSchema>;


export const duplicateWorkflowSchema = createWorkflowSchema.extend({
  workflowId: z.string()
})

export type DuplicateWorkflowSchemaType = z.infer<typeof duplicateWorkflowSchema>;
