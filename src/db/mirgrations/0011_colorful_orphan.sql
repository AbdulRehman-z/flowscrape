ALTER TABLE "workflow" ADD COLUMN "last_runs_at" timestamp;--> statement-breakpoint
ALTER TABLE "workflow" ADD COLUMN "last_execution_status" text;--> statement-breakpoint
ALTER TABLE "workflow" ADD COLUMN "last_execution_id" text;