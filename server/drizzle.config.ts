import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  dbCredentials: {
    url: "file:../local.db",
  },
  schema: "./db/schema.ts",
  out: "./.drizzle",
  verbose: true,
  strict: true,
});
