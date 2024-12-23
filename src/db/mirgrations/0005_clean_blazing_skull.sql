ALTER TABLE "execution_phase" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "workflow_execution" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "workflow" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
DROP INDEX "workflowExecutionId_idx";--> statement-breakpoint
DROP INDEX "workflowId_idx";--> statement-breakpoint
DROP INDEX "userId_name_idx";--> statement-breakpoint
ALTER TABLE "execution_phase" ALTER COLUMN "status" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "execution_phase" ALTER COLUMN "status" SET DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE "execution_phase" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "execution_phase" ALTER COLUMN "started_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "execution_phase" ALTER COLUMN "started_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "execution_phase" ALTER COLUMN "started_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "execution_phase" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "execution_phase" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "execution_phase" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workflow_execution" ALTER COLUMN "status" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "workflow_execution" ALTER COLUMN "status" SET DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE "workflow_execution" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "workflow_execution" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "workflow_execution" ALTER COLUMN "started_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "workflow_execution" ALTER COLUMN "started_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "workflow_execution" ALTER COLUMN "completed_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "workflow" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "workflow" ALTER COLUMN "status" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "workflow" ALTER COLUMN "status" SET DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE "workflow" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "workflow" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "workflow" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "workflow" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
CREATE UNIQUE INDEX "name_user_id_idx" ON "workflow" USING btree ("name","user_id");--> statement-breakpoint
ALTER TABLE "execution_phase" ADD CONSTRAINT "execution_phase_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "execution_phase" ADD CONSTRAINT "execution_phase_number_unique" UNIQUE("number");--> statement-breakpoint
ALTER TABLE "execution_phase" ADD CONSTRAINT "execution_phase_node_unique" UNIQUE("node");--> statement-breakpoint
ALTER TABLE "execution_phase" ADD CONSTRAINT "execution_phase_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "workflow_execution" ADD CONSTRAINT "workflow_execution_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "workflow_execution" ADD CONSTRAINT "workflow_execution_trigger_unique" UNIQUE("trigger");--> statement-breakpoint
ALTER TABLE "workflow_execution" ADD CONSTRAINT "workflow_execution_workflow_id_unique" UNIQUE("workflow_id");--> statement-breakpoint
ALTER TABLE "workflow" ADD CONSTRAINT "workflow_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "workflow" ADD CONSTRAINT "workflow_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "workflow" ADD CONSTRAINT "workflow_defination_unique" UNIQUE("defination");