import { number, pipe, string, transform } from "valibot";

export const coerceInt = pipe(
  string(),
  transform((v) => Number.parseInt(v, 10)),
  number(),
);
