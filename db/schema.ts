import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const academyState = sqliteTable('academy_state', { id: text('id').primaryKey(), revision: integer('revision').notNull().default(0), payload: text('payload').notNull(), updatedAt: text('updated_at').notNull() });

export const hubState=sqliteTable('hub_state',{id:text('id').primaryKey(),revision:integer('revision').notNull().default(0),payload:text('payload').notNull(),updatedAt:text('updated_at').notNull()});
