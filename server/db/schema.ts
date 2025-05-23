import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey(),
  name: text().notNull(),
});
export const eventsTable = sqliteTable("events", {
  id: int().primaryKey(),
  name: text().notNull(),
  description: text(),
  start: int().notNull(), // unix timestamp = JS Time representation / 1000
  end: int().notNull(), // same as above
  allday: int().notNull(), // 0 OR 1
  multiday: int().notNull(),
});
export const joinsTable = sqliteTable("joins", {
  userId: int().references(() => usersTable.id),
  eventId: int().references(() => eventsTable.id),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  joins: many(joinsTable),
}));
export const eventsRelations = relations(eventsTable, ({ many }) => ({
  members: many(joinsTable),
}));
export const joinsRelations = relations(joinsTable, ({ one }) => ({
  user: one(usersTable),
  event: one(eventsTable),
}));
