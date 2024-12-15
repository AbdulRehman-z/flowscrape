"use server"

import { signOut } from "@/auth";

export const signOutAction = async () => {
  try {
    await signOut({
      redirectTo: "/auth/login",
    });
  } catch (error) {
    if (error && (error as any).message === 'NEXT_REDIRECT') {
      // Let Next.js handle the redirect
      throw error;
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred');
  }
}
