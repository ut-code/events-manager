import * as s from "+server/db/schema.ts";
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
export const InsertEvent = v.object({
  id: v.optional(v.number()),
  name: Text,
  description: Text,
  date: v.pipe(
    v.string(),
    v.transform((t) => new Date(t)),
    v.date(),
    v.transform((d) => d.toString()),
  ),
});
export const SelectEvent = v.pipe(
  createSelectSchema(s.eventsTable),
  v.transform((o) => ({ ...o, date: new Date(o.date) })),
);
