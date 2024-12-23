ALTER TABLE "execution_phase" DROP CONSTRAINT "execution_phase_number_unique";--> statement-breakpoint
ALTER TABLE "execution_phase" DROP CONSTRAINT "execution_phase_node_unique";--> statement-breakpoint
ALTER TABLE "execution_phase" DROP CONSTRAINT "execution_phase_name_unique";--> statement-breakpoint
ALTER TABLE "workflow_execution" DROP CONSTRAINT "workflow_execution_trigger_unique";