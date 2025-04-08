import { vValidator } from "@hono/valibot-validator";
import * as v from "valibot";

type Validation =
  | v.GenericSchema<unknown, unknown, v.BaseIssue<unknown>>
  | v.GenericSchemaAsync<unknown, unknown, v.BaseIssue<unknown>>;

// structured
export const json = <T extends Validation>(validate: T) =>
  vValidator("json", validate);

// unstructred
export const param = <T extends v.ObjectEntries>(validate: T) =>
  vValidator("param", v.object(validate));
export const header = <T extends v.ObjectEntries>(validate: T) =>
  vValidator("header", v.object(validate));
export const query = <T extends v.ObjectEntries>(validate: T) =>
  vValidator("query", v.object(validate));
export const cookie = <T extends v.ObjectEntries>(validate: T) =>
  vValidator("cookie", v.object(validate));
export const form = <T extends v.ObjectEntries>(validate: T) =>
  vValidator("form", v.object(validate));
