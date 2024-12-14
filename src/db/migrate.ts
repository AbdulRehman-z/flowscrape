import { env } from "../schemas/env-schema";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";

// const db = drizzle(env.DATABASE_URL, {
//   max: 1,
// });

const migrationClient = neon(env.DATABASE_URL);
const db = drizzle(migrationClient);

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
    });

    console.log("Migration successful");
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    process.exit(process.exitCode || 0);
  }
}

await main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
