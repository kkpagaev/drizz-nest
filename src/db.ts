import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

export function createDrizzle(dbUrl?: string) {
  const client = new Client({
    connectionString: dbUrl || 'postgres://user:user@localhost:7778/user',
  });

  const db = drizzle(client, { schema });

  return { db, client };
}
