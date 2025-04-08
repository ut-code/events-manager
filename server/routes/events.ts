import { db } from "+server/db/client";
import { eventsTable } from "+server/db/schema.ts";
import { json } from "+server/validator/hono";
import { InsertEvent } from "+server/validator/schema.ts";
import { Hono } from "hono";

const route = new Hono()
  .get("/", async (c) => {
    const d = db(c);
    const events = await d.select().from(eventsTable);
    return c.json(events);
  })
  .post("/", json(InsertEvent), async (c) => {
    const d = db(c);
    const resp = await d
      .insert(eventsTable)
      .values(c.req.valid("json"))
      .returning();
    return c.json(resp[0], 201);
  });
export default route;
