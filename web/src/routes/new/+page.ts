import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

import { InsertEvent } from "+server/validator/schema.ts";

import type { PageLoad } from "./$types.ts";

export const load: PageLoad = async () => {
  const form = await superValidate(valibot(InsertEvent));

  return {
    form,
  };
};
