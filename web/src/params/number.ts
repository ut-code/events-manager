import type { ParamMatcher } from "@sveltejs/kit";

const regex = /\d+/;
export const match: ParamMatcher = (param: string): param is `${number}` => {
  return regex.test(param);
};
