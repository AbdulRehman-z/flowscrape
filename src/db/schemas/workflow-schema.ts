import { relations } from 'drizzle-orm';
import {
  text,
  timestamp,
  pgTable,
  varchar,
  integer,
  // uniqueIndex,
} from 'drizzle-orm/pg-core';

// Workflow table
export const workflows = pgTable('workflow', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().unique(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  description: text('description'),
  defination: text('defination').notNull().unique(),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}
);

// Workflow executions table
export const workflowExecutions = pgTable('workflow_execution', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull(),
  trigger: text('trigger').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  startedAt: timestamp('started_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
  workflowId: text('workflow_id')
    .notNull()
    .references(() => workflows.id, { onDelete: 'cascade' }),
});

// Execution phases table
export const workflowExecutionPhases = pgTable('execution_phase', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  number: integer('number').notNull(),
  node: text('node').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  startedAt: timestamp('started_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  inputs: text('inputs'),
  outputs: text('outputs'),
  creditsCost: integer('credits_cost'),
  workflowExecutionId: text('workflow_execution_id')
    .notNull()
    .references(() => workflowExecutions.id, { onDelete: 'cascade' }),
});

// Relations
export const workflowRelations = relations(workflows, ({ many }) => ({
  executions: many(workflowExecutions),
}));

export const workflowExecutionRelations = relations(workflowExecutions, ({ one, many }) => ({
  workflow: one(workflows, {
    fields: [workflowExecutions.workflowId],
    references: [workflows.id],
  }),
  phases: many(workflowExecutionPhases),
}));

export const workflowExecutionPhasesRelations = relations(workflowExecutionPhases, ({ one }) => ({
  execution: one(workflowExecutions, {
    fields: [workflowExecutionPhases.workflowExecutionId],
    references: [workflowExecutions.id],
  }),
}));
