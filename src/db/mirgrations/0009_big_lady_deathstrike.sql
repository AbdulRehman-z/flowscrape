CREATE TABLE "credential" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"name" text,
	"value" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "cred_name_user_idx" ON "credential" USING btree ("name","user_id");