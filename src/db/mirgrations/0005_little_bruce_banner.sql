ALTER TABLE "workflow" ADD COLUMN "execution_plan" text;--> statement-breakpoint
ALTER TABLE "workflow" ADD COLUMN "credits_cost" integer DEFAULT 0 NOT NULL;