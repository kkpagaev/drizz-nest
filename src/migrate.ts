import { createDrizzle } from './db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import dotenv from 'dotenv';
dotenv.config();

async function run_migration() {
  const { db, client } = createDrizzle();
  await client.connect();

  await migrate(db, { migrationsFolder: './drizzle/migrations' });

  await client.end();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run_migration();
