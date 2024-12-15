import { env } from '@/schemas/env-schema';
import { neon, neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import ws from 'ws';
import * as schema from './schemas/auth-schema';

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
export const db = drizzle(sql, {
  schema
});

export const { accounts, users, passwordResetTokens, twoFactorConfirmation, twoFactorToken, users_twoFactorConfirmationRelation, verificationTokens } = schema
