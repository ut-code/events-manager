import { Hono } from "hono";

import events from "./routes/events.ts";

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const app = new Hono()
  .basePath("/api")
  // TODO: exclude this on prod
  .use(async (_c, next) => {
    await sleep(1000);
    return await next();
  })
  .route("/events", events);

export default app;
export type App = typeof app;
