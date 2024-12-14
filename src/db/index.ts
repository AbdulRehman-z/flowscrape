import { env } from "../schemas/env-schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schemas/auth-schema";

const queryClient = postgres(env.AUTH_DRIZZLE_URL);
export const db = drizzle({ client: queryClient });

export const { accounts, users } = schema;
