import { db } from "@stack/server/db/client";
import { eventsTable } from "@stack/server/db/schema.ts";
import { json, param } from "@stack/server/validator/hono";
import { InsertEvent, SelectEvent } from "@stack/server/validator/schema.ts";
import { coerceInt } from "@stack/server/validator/valibot-utils";
import { eq, gte } from "drizzle-orm";
import { Hono } from "hono";
import { parse } from "valibot";

const route = new Hono()
  .get("/", async (c) => {
    const startOfToday = new Date();
    startOfToday.setHours(0);
    startOfToday.setMinutes(0);
    startOfToday.setSeconds(0);
    startOfToday.setMilliseconds(0);
    const d = db(c);
    const events = await d
      .select()
      .from(eventsTable)
      .where(gte(eventsTable.end, startOfToday.getTime() / 1000))
      .orderBy(eventsTable.start);
    return c.json(events.map((event) => parse(SelectEvent, event)));
  })
  .post("/", json(InsertEvent), async (c) => {
    const d = db(c);
    const resp = await d
      .insert(eventsTable)
      .values(c.req.valid("json"))
      .returning();
    return c.json(parse(SelectEvent, resp[0]), 201);
  })
  .get("/:id", param({ id: coerceInt }), async (c) => {
    const params = c.req.valid("param");
    const d = db(c);
    const resp = await d
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.id, params.id));
    if (resp.length === 0) return c.json({ error: "not found" }, 404);
    if (resp.length >= 2) return c.json({ error: "too many events" }, 500);
    return c.json(parse(SelectEvent, resp[0]), 200);
  })
  .put("/:id", param({ id: coerceInt }), json(InsertEvent), async (c) => {
    const params = c.req.valid("param");
    const d = db(c);
    const resp = await d
      .update(eventsTable)
      .set(c.req.valid("json"))
      .where(eq(eventsTable.id, params.id))
      .returning();
    if (resp.length === 0) return c.json({ error: "not found" }, 404);
    if (resp.length >= 2)
      return c.json({ error: "updated too many events" }, 500);
    return c.json(parse(SelectEvent, resp[0]), 200);
  })
  .delete(
    "/:id",
    param({
      id: coerceInt,
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
