import * as v from "valibot";
export const stringToNumber = v.pipe(
  v.string(),
  v.transform((v) => Number.parseInt(v, 10)),
  v.number(),
);
