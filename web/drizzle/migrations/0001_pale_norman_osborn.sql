DROP INDEX "ocr_results_doc_created_idx";--> statement-breakpoint
CREATE INDEX "ocr_results_doc_created_idx" ON "ocr_results" USING btree ("document_id","created_at" DESC NULLS LAST);