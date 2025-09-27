import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './client';

async function run() {
  try {
    await migrate(db, { migrationsFolder: 'drizzle/migrations' });
    // eslint-disable-next-line no-console
    console.log('Migrations complete');
  } finally {
    await pool.end();
  }
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


