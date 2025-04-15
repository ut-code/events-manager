import type { App } from "@stack/server/index.ts";
import { hc } from "hono/client";

type Fetch = typeof fetch;
export const createClient = ({ fetch }: { fetch: Fetch }) =>
  hc<App>("/", { fetch }).api;
