// you don't need to touch this file,
// except for adding new request methods.

import app from "@stack/server/index.ts";
import { panic } from "@stack/share/stdlib.ts";
import type { RequestEvent } from "@sveltejs/kit";

async function hook(event: RequestEvent) {
  const platform = event.platform ?? panic("platform not found");
  // @ts-expect-error: TypeScript can't recognize platform type.
  const env = platform.env;
  return await app.fetch(event.request, env);
}

export const GET = hook;
export const POST = hook;
export const PUT = hook;
export const PATCH = hook;
export const DELETE = hook;
