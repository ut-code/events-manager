import type { Context } from "hono";
import { env as hono_env } from "hono/adapter";

export function panic(...context: unknown[]): never {
  console.error(...context);
  throw new Error(context.join(", "));
}

export function env(c: Context, name: string, options?: { fallback?: string }) {
  return (
    hono_env(c)[name] ??
    options?.fallback ??
    panic(`Environment variable ${name} not found`)
  );
}
