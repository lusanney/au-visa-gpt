import "dotenv/config";
import { and, eq, sql } from "drizzle-orm";

import { db, pool } from "./client";
import { applications, users } from "./schema";

async function main() {
  const email = "owner@example.com";

  let user = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (!user) {
    const [inserted] = await db.insert(users).values({ email, displayName: "Owner" }).returning();
    user = inserted;
  }

  const app = await db.query.applications.findFirst({
    where: and(eq(applications.userId, user.id), eq(applications.visaCode, "191")),
  });
  if (!app) {
    await db.insert(applications).values({
      userId: user.id,
      visaCode: "191",
      profile: {
        fullName: "Owner",
        email,
        nationality: "AU",
        dateOfBirth: "1990-01-01",
        phone: "",
      },
    });
  }

  // Ensure sequences are in sync with max(id) to avoid duplicate key errors after manual inserts
  await db.execute(
    sql`select setval(pg_get_serial_sequence('public.users','id'), coalesce(max(id), 0)) from public.users;`,
  );
  await db.execute(
    sql`select setval(pg_get_serial_sequence('public.applications','id'), coalesce(max(id), 0)) from public.applications;`,
  );
}

main()
  .then(async () => {
    console.log("Seed complete");
    await pool.end();
  })
  .catch(async (err) => {
    console.error(err);
    await pool.end();
    process.exit(1);
  });
