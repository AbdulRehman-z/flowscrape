"use server"

import { getUserByEmail } from "@/data/user"
import { sendResetPasswordMail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/token"
import { resetSchema } from "@/schemas/auth-schema"
import { z } from "zod"

export const resetAction = async (formData: z.infer<typeof resetSchema>) => {
  const validatedData = resetSchema.safeParse(formData)
  if (validatedData.error) {
    return { error: "Invalid data!" }
  }

  const { email } = validatedData.data
  const existingUser = await getUserByEmail(email)
  if (!existingUser?.email) {
    return { error: "Email does not exist" }
  }

  // todo sent reset link
  const token = await generatePasswordResetToken(existingUser.email)
  await sendResetPasswordMail(existingUser.email, token)
  return { success: "Password reset link sent! Check your mailbox" }
}
