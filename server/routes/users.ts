import { query } from "@stack/server/validator/hono";
import { Hono } from "hono/tiny";
import * as v from "valibot";

const route = new Hono().basePath("/api/users").get(
  "/",
  query({
    limit: v.optional(v.number()),
  }),
  async (c) => {
    return c.json({ error: "not implemented" }, 501);
  },
);
export default route;
