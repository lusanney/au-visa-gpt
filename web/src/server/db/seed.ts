import "dotenv/config";
import { eq } from "drizzle-orm";

import { db, pool } from "./client";
import { users, applications } from "./schema";

async function main() {
  const defaultUserId = Number(process.env.DEFAULT_USER_ID || 1);
  const defaultAppId = Number(process.env.DEFAULT_APPLICATION_ID || 1);

  const email = "owner@example.com";

  const user = await db.query.users.findFirst({
    where: eq(users.id, defaultUserId),
  });
  if (!user) {
    await db.insert(users).values({ id: defaultUserId, email, displayName: "Owner" });
  }

  const app = await db.query.applications.findFirst({
    where: eq(applications.id, defaultAppId),
  });
  if (!app) {
    await db.insert(applications).values({
      id: defaultAppId,
      userId: defaultUserId,
      visaCode: "191",
      profile: {},
    });
  }
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
