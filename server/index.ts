import { Hono } from "hono";

import events from "./routes/events.ts";

const app = new Hono().basePath("/api").route("/events", events);

export default app;
export type App = typeof app;
