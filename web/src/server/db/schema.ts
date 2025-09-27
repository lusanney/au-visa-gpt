import { pgEnum, pgTable, text, timestamp, serial, integer, jsonb, bigint, index, uniqueIndex } from 'drizzle-orm/pg-core';

export const documentCategory = pgEnum('document_category', [
  'identity',
  'financial',
  'employment',
  'form',
  'police',
  'education',
  'residential',
  'health',
  'other',
  'unclassified',
]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  visaCode: text('visa_code').notNull(),
  profile: jsonb('profile').default({}).notNull(),
  lastAdvice: jsonb('last_advice'),
  lastAdviceAt: timestamp('last_advice_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  index('applications_visa_idx').on(t.visaCode.asc()),
]);

export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  applicationId: integer('application_id').notNull().references(() => applications.id, { onDelete: 'cascade' }),
  originalFilename: text('original_filename').notNull(),
  mimeType: text('mime_type').notNull(),
  byteSize: bigint('byte_size', { mode: 'number' }).notNull(),
  sha256: text('sha256').notNull(),
  storageKey: text('storage_key').notNull(),
  status: text('status').notNull().default('uploaded'),
  category: documentCategory('category').notNull().default('unclassified'),
  typeCode: text('type_code'),
  tags: jsonb('tags'),
  source: text('source').notNull().default('upload'),
  title: text('title'),
  metadata: jsonb('metadata').default({}).notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  index('documents_application_idx').on(t.applicationId.asc()),
  uniqueIndex('documents_storage_key_uidx').on(t.storageKey.asc()),
  uniqueIndex('documents_app_sha256_uidx').on(t.applicationId.asc(), t.sha256.asc()),
]);

export const ingestionJobs = pgTable('ingestion_jobs', {
  id: serial('id').primaryKey(),
  documentId: integer('document_id').notNull().references(() => documents.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  status: text('status').notNull().default('pending'),
  attempt: integer('attempt').notNull().default(0),
  maxAttempts: integer('max_attempts').notNull().default(3),
  startedAt: timestamp('started_at', { withTimezone: true }),
  finishedAt: timestamp('finished_at', { withTimezone: true }),
  error: text('error'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  index('ingestion_jobs_doc_status_idx').on(t.documentId.asc(), t.status.asc()),
]);

export const ocrResults = pgTable('ocr_results', {
  id: serial('id').primaryKey(),
  documentId: integer('document_id').notNull().references(() => documents.id, { onDelete: 'cascade' }),
  jobId: integer('job_id').notNull().references(() => ingestionJobs.id, { onDelete: 'cascade' }),
  version: integer('version').notNull().default(1),
  text: text('text').notNull(),
  pages: integer('pages'),
  engine: text('engine'),
  confidence: text('confidence'),
  durationMs: integer('duration_ms'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (t) => [
  index('ocr_results_doc_created_idx').on(t.documentId.asc(), t.createdAt.desc()),
]);


