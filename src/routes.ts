/**
 * An array of authentication-related routes.
 * Contains paths for login and signup endpoints.
 * @constant
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/signup", "/auth/reset", "/auth/error", "/auth/new-password", "/auth/2FA"];
/**
 * The prefix path for authentication-related API routes.
 * This constant is used to define the base URL path for all authentication endpoints.
 * @constant
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
/**
 * The default redirect path after successful login.
 * @constant
 * @default "/settings"
 */
/**
 * Default redirect path after successful login.
 * Users will be redirected to this route upon completing authentication.
 * @constant {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
/**
 * A constant string representing the base public route path.
 * This route is accessible without authentication.
 * @constant
 * @type {string}
 */
export const publicRoutes = ["/", "/auth/verification", "/api/workflows/cron", "/api/workflows/execute"];
