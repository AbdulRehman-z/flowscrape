import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

// Workflow table
export const workflows = pgTable(
  'workflow',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    defination: text('defination').notNull(),
    executionPlan: text('execution_plan'),
    cron: text("cron"),
    creditsCost: integer('credits_cost').notNull().default(0),
    lastRunsAt: timestamp('last_runs_at'),
    lastRunStatus: text('last_execution_status'),
    lastRunId: text('last_execution_id'),
    nextRunAt: timestamp('next_run_at'),
    status: varchar('status', { length: 50 }).notNull().default('draft'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    nameUserIdx: uniqueIndex('name_user_idx').on(table.name, table.userId),
  })
);

// Workflow executions table
export const workflowExecutions = pgTable('workflow_execution', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull(),
  trigger: text('trigger').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  defination: text("defination"),
  startedAt: timestamp('started_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
  creditsConsumed: integer('credits_consumed'),
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
  completedAt: timestamp('completed_at'),
  inputs: text('inputs'),
  outputs: text('outputs'),
  creditsConsumed: integer('credits_consumed'),
  workflowExecutionId: text('workflow_execution_id')
    .notNull()
    .references(() => workflowExecutions.id, { onDelete: 'cascade' }),
});


export const workflowExecutionPhaseLogs = pgTable("executionLog", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  executionPhaseId: text("execution_phase_id").notNull().references(() => workflowExecutionPhases.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  logLevel: varchar("log_level", { length: 50 }).notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
})

export const userBalance = pgTable('user_balance', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().unique(),
  credits: integer('credits').notNull(),
});


export const userPurchase = pgTable('user_purchase', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull(),
  stripeId: text('stripe_id').notNull(),
  description: text('description').notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull(),
  date: timestamp('created_at').notNull().defaultNow(),
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

export const workflowExecutionPhasesRelations = relations(workflowExecutionPhases, ({ one, many }) => ({
  execution: one(workflowExecutions, {
    fields: [workflowExecutionPhases.workflowExecutionId],
    references: [workflowExecutions.id],
  }),
  logs: many(workflowExecutionPhaseLogs),
}));

export const workflowExecutionPhaseLogsRelations = relations(workflowExecutionPhaseLogs, ({ one }) => ({
  phase: one(workflowExecutionPhases, {
    fields: [workflowExecutionPhaseLogs.executionPhaseId],
    references: [workflowExecutionPhases.id],
  }),
}));
