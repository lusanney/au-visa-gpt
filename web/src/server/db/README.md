Database (Drizzle + Postgres)

Setup
- Add DATABASE_URL to .env, e.g. postgres://postgres:postgres@localhost:5432/auvisa
- Optionally set DEFAULT_USER_ID and DEFAULT_APPLICATION_ID for stable seeds

Commands
- pnpm db:generate — generate SQL migrations from schema
- pnpm db:migrate — apply migrations
- pnpm db:seed — seed default user and application


