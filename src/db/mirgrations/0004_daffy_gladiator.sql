CREATE TABLE "execution_phase" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"status" text NOT NULL,
	"number" integer NOT NULL,
	"node" text NOT NULL,
	"name" text NOT NULL,
	"started_at" timestamp with time zone,
	"created_at" timestamp with time zone,
	"inputs" text,
	"outputs" text,
	"credits_cost" integer,
	"workflow_execution_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workflow_execution" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"trigger" text NOT NULL,
	"status" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"workflow_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "execution_phase" ADD CONSTRAINT "execution_phase_workflow_execution_id_workflow_execution_id_fk" FOREIGN KEY ("workflow_execution_id") REFERENCES "public"."workflow_execution"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workflow_execution" ADD CONSTRAINT "workflow_execution_workflow_id_workflow_id_fk" FOREIGN KEY ("workflow_id") REFERENCES "public"."workflow"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "workflowExecutionId_idx" ON "execution_phase" USING btree ("workflow_execution_id");--> statement-breakpoint
CREATE UNIQUE INDEX "workflowId_idx" ON "workflow_execution" USING btree ("workflow_id");