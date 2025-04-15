import * as s from "@stack/server/db/schema.ts";
import type { InferSelectModel } from "drizzle-orm";
import { createSelectSchema } from "drizzle-valibot";
import * as v from "valibot";

export type SelectUser = InferSelectModel<typeof s.usersTable>;
export const SelectUser = createSelectSchema(s.usersTable);

export type SelectEvent = InferSelectModel<typeof s.eventsTable>;
const Text = v.pipe(
  v.string(),
  v.transform((text) => text.trim()),
  v.minLength(1),
);
const SQLiteBool = v.pipe(
  v.boolean(),
  v.transform((b) => Number(b)),
);
export type InsertEvent = v.InferInput<typeof InsertEvent>;
export const InsertEvent = v.object({
  id: v.optional(v.number()),
  name: Text,
  description: v.optional(Text),
  start: v.number(),
  end: v.number(),
  allday: SQLiteBool,
  multiday: SQLiteBool,
});
export const SelectEvent = createSelectSchema(s.eventsTable);
