
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { get2FATokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/db";
import { passwordResetTokens, twoFactorToken, verificationTokens } from "@/db/schemas/auth-schema";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const generateTwoFactorToken = async function (email: string) {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  try {
    const existing2FA = await get2FATokenByEmail(email)
    if (existing2FA) {
      await db.delete(twoFactorToken).where(eq(twoFactorToken.email, email))
    }

    const [factorToken] = await db.insert(twoFactorToken).values({
      email,
      expires,
      token
    }).returning({
      token: twoFactorToken.token,
      email: twoFactorToken.email
    })
    return factorToken
  } catch (error) {
    console.error("Error generating 2FA token:", error);
    throw new Error("Failed to generate 2FA token");
  }
}

export const generatePasswordResetToken = async function (email: string) {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  try {
    const existingToken = await getPasswordResetTokenByEmail(email)
    if (existingToken) {
      await db.delete(passwordResetTokens).where(eq(passwordResetTokens.email, email))
    }

    const [passwordResetToken] = await db.insert(passwordResetTokens).values({
      email,
      token,
      expires,
    }).returning({
      token: passwordResetTokens.token
    })

    return passwordResetToken.token
  } catch (error) {
    console.error("Error generating password reset token:", error);
    throw new Error("Failed to generate password reset token");
  }
}

export const generateVerificationToken = async function (
  email: string
): Promise<string> {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  try {
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      // Delete the existing token from the correct table
      await db.delete(verificationTokens)
        .where(eq(verificationTokens.email, email));
    }

    const [verificationToken] = await db
      .insert(verificationTokens)
      .values({
        email,
        token,
        expires,
      })
      .returning({
        token: verificationTokens.token,
      });

    return verificationToken.token;
  } catch (error) {
    console.error("Error generating verification token:", error);
    throw new Error("Failed to generate verification token");
  }
};
