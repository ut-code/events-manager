import { db } from "@stack/server/db/client";
import { eventsTable } from "@stack/server/db/schema.ts";
import { json, param } from "@stack/server/validator/hono";
import { InsertEvent } from "@stack/server/validator/schema.ts";
import { stringToNumber } from "@stack/server/validator/valibot-utils";
import { eq } from "drizzle-orm";
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
  })
  .delete(
    "/:id",
    param({
      id: stringToNumber,
    }),
    async (c) => {
      const params = c.req.valid("param");
      const d = db(c);
      const resp = await d
        .delete(eventsTable)
        .where(eq(eventsTable.id, params.id))
        .returning({ id: eventsTable.id });
      if (!resp.length) return c.json({ error: "not found" }, 404);
      return c.body(null, 204);
    },
  );
export default route;
