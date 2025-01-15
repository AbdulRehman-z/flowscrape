"use server"

import { auth } from "@/auth"
import { credentials, db } from "@/db"
import { symmetricEncrypt } from "@/lib/encryption"
import { CreateCredentialSchemaType } from "@/schemas/credential-schema"
import { revalidatePath } from "next/cache"

export const createCredentialAction = async (data: CreateCredentialSchemaType) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("User not authenticated")
  }

  const userId = session.user.id

  const encryptedValue = symmetricEncrypt(data.value)
  const result = await db.insert(credentials).values({
    name: data.name,
    userId,
    value: encryptedValue
  })

  if (!result) {
    throw new Error("failed creating credential")
  }

  revalidatePath("/credentials")
}
