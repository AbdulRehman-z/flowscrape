CREATE TABLE "executionLog" (
	"id" text PRIMARY KEY NOT NULL,
	"execution_phase_id" text NOT NULL,
	"message" text NOT NULL,
	"log_level" varchar(50) NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workflow" DROP CONSTRAINT "workflow_user_id_unique";--> statement-breakpoint
ALTER TABLE "workflow" DROP CONSTRAINT "workflow_name_unique";--> statement-breakpoint
ALTER TABLE "executionLog" ADD CONSTRAINT "executionLog_execution_phase_id_execution_phase_id_fk" FOREIGN KEY ("execution_phase_id") REFERENCES "public"."execution_phase"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "name_user_idx" ON "workflow" USING btree ("name","user_id");