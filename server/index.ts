import { Hono } from "hono";

import events from "./routes/events.ts";
import users from "./routes/users.ts";

const app = new Hono()
  .basePath("/api")
  .route("/users", users)
  .route("/events", events);

export default app;
export type App = typeof app;
