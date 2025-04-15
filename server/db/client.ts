import { type Client, createClient } from "@libsql/client";
import { env, panic } from "@stack/server/lib";
import { drizzle } from "drizzle-orm/libsql";
import type { Context } from "hono";

let client: Client;
function getClient(c: Context) {
  console.log("[db] getting database client...");
  if (client) {
    console.log("[db] database client: cache hit");
    return client;
  }

  const db = env(c, "DB");
  switch (db) {
    case "memory":
      client = createClient({
        url: ":memory:",
      });
      console.log("[db] database client: cache miss");
      return client;
    case "local":
      client = createClient({
        url: "file:../local.db",
      });
      console.log("[db] database client: cache miss");
      return client;
    case "turso":
      client = createClient({
        url: env(c, "DATABASE_URL"),
        authToken: env(c, "DATABASE_AUTH_TOKEN"),
      });
      console.log("[db] database client: cache miss");
      return client;
    default:
      panic(`Unknown DB, expected memory, local or turso, got ${db}`);
  }
}

export function db(c: Context) {
  return drizzle(getClient(c), { casing: "snake_case" });
}
