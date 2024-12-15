import { auth } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export const middleware = auth((req) => {
  try {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req

    const isApiAuthRoute = req.url.startsWith(apiAuthPrefix)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
      return null
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
      return null
    }

    if (!isPublicRoute && !isLoggedIn) {
      return Response.redirect(new URL("/auth/login", nextUrl))
    }

    return null
  } catch (error) {
    console.error("Middleware error:", error)
    // Fallback to login page on error
    return Response.redirect(new URL("/auth/login", req.nextUrl))
  }
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
