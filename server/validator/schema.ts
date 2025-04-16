import * as s from "@stack/server/db/schema.ts";
import type { InferSelectModel } from "drizzle-orm";
import { createSelectSchema } from "drizzle-valibot";
import * as v from "valibot";

export type SelectUser = InferSelectModel<typeof s.usersTable>;
export const SelectUser = createSelectSchema(s.usersTable);

const Text = (minlength: number) =>
  v.pipe(
    v.string(),
    v.transform((text) => text.trim()),
    v.minLength(minlength),
  );
const SQLiteBool = v.pipe(
  v.boolean(),
  v.transform((b) => Number(b)),
);
export type InsertEvent = v.InferInput<typeof InsertEvent>;
export const InsertEvent = v.object({
  name: Text(1),
  description: v.nullish(Text(0)),
  start: v.number(),
  end: v.number(),
  allday: SQLiteBool,
  multiday: SQLiteBool,
});
export type SelectEvent = v.InferOutput<typeof SelectEvent>;
export const SelectEvent = v.pipe(
  createSelectSchema(s.eventsTable),
  v.transform((event) => ({
    ...event,
    allday: !!event.allday,
    multiday: !!event.multiday,
  })),
);
