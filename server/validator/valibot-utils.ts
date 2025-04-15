import { number, pipe, string, transform } from "valibot";

export const stringToNumber = pipe(
  string(),
  transform((v) => Number.parseInt(v, 10)),
  number(),
);

