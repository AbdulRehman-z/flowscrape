ALTER TABLE "workflow" ALTER COLUMN "next_run_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "workflow" ALTER COLUMN "next_run_at" DROP NOT NULL;