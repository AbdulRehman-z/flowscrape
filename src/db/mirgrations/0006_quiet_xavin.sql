ALTER TABLE "workflow" ADD COLUMN "cron" text;--> statement-breakpoint
ALTER TABLE "workflow" ADD COLUMN "next_run_at" timestamp DEFAULT now() NOT NULL;