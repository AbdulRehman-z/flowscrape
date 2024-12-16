import { env } from '@/schemas/env-schema';
import { neon, neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import ws from 'ws';

// Import all schemas
import * as auth from './schemas/auth-schema';
import * as workflow from './schemas/workflow-schema';
// Import any other schema files you have

// Combine all schemas into a single object
const schema = {
  ...auth,
  ...workflow,
  // ...spread other schemas here
};

let connectionString = env.AUTH_DRIZZLE_URL;

// Configuring Neon for local development
if (env.NODE_ENV === 'development') {
  connectionString = 'postgres://postgres:postgres@db.localtest.me:5432/main';
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] = host === 'db.localtest.me' ? ['http', 4444] : ['https', 443];
    return `${protocol}://${host}:${port}/sql`;
  };
  const connectionStringUrl = new URL(connectionString);
  neonConfig.useSecureWebSocket = connectionStringUrl.hostname !== 'db.localtest.me';
  neonConfig.wsProxy = (host: string, port: string | number): string => (host === 'db.localtest.me' ? `${host}:4444/v1` : `${host}:${port}/v1`);
  neonConfig.webSocketConstructor = ws;
}

export const pool = new Pool({ connectionString });
export const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

// Export all schemas
export { schema };
// You can also export individual schemas if needed
export { auth, workflow };

// Export specific tables/relations
export const {
  accounts,
  users,
  passwordResetTokens,
  twoFactorConfirmation,
  twoFactorToken,
  workflow: workflowTable,
  users_twoFactorConfirmationRelation,
  verificationTokens,
} = schema;

// import { env } from '@/schemas/env-schema';
// import { neon, neonConfig, Pool } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import ws from 'ws';
// import auth from './schemas/auth-schema';
// import workflow from './schemas/workflow-schema';

// let connectionString = env.AUTH_DRIZZLE_URL;

// // Configuring Neon for local development
// if (env.NODE_ENV === 'development') {
//   connectionString = 'postgres://postgres:postgres@db.localtest.me:5432/main';
//   neonConfig.fetchEndpoint = (host) => {
//     const [protocol, port] = host === 'db.localtest.me' ? ['http', 4444] : ['https', 443];
//     return `${protocol}://${host}:${port}/sql`;
//   };
//   const connectionStringUrl = new URL(connectionString);
//   neonConfig.useSecureWebSocket = connectionStringUrl.hostname !== 'db.localtest.me';
//   neonConfig.wsProxy = (host: string, port: string | number): string => (host === 'db.localtest.me' ? `${host}:4444/v1` : `${host}:${port}/v1`);
//   neonConfig.webSocketConstructor = ws;
// }

// export const pool = new Pool({ connectionString });
// export const sql = neon(connectionString);
// export const db = drizzle(sql, {
//   schema: { ...auth }
// });

// export const { accounts, users, passwordResetTokens, twoFactorConfirmation, twoFactorToken, workflow, users_twoFactorConfirmationRelation, verificationTokens } = db.schemas;
