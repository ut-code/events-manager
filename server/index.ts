import { Hono } from "hono";

import { env } from "./lib.ts";
import events from "./routes/events.ts";

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const app = new Hono()
  .basePath("/api")
  // TODO: exclude this on prod
  .use(async (c, next) => {
    const latency = env(c, "ARTIFICIAL_LATENCY", { fallback: "0" });
    await sleep(Number.parseInt(latency));
    return await next();
  })
  .route("/events", events);

export default app;
export type App = typeof app;
