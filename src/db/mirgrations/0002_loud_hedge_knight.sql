CREATE TABLE "workflows" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"defination" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DROP TABLE "workflow" CASCADE;--> statement-breakpoint
CREATE UNIQUE INDEX "userId_name_idx" ON "workflows" USING btree ("userId","name");