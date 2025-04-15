import { defineConfig } from "drizzle-kit";
import { panic } from "./lib.ts";

function env(name: string) {
  return Bun.env[name] ?? panic(`Environment variable ${name} not found`);
}

const uniqueOptions: ReturnType<typeof defineConfig> = (() => {
  switch (env("DB")) {
    case "local":
      return {
        dialect: "sqlite",
        dbCredentials: {
          url: "file:../local.db",
        },
      };
    case "turso":
      return {
        dialect: "turso",
        dbCredentials: {
          url: env("DATABASE_URL"),
          authToken: env("DATABASE_AUTH_TOKEN"),
        },
      };
    default:
      return panic(
        `Bun.env.DB does not match any known variable! got ${env("DB")}`,
      );
  }
})();

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./.drizzle",
  verbose: true,
  strict: true,
  ...uniqueOptions,
});
