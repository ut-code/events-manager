import type { Context } from "hono";
import { env as hono_env } from "hono/adapter";

export function panic(...context: unknown[]): never {
  console.error(...context);
  throw new Error(context.join(", "));
}

export function env(c: Context, name: string) {
  return hono_env(c)[name] ?? panic(`Environment variable ${name} not found`);
}
