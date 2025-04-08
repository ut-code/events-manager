import { InsertEvent } from "+server/validator/schema.ts";
import { fail } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

import { createClient } from "+web/client.ts";
import type { Actions } from "./$types.ts";

export const actions: Actions = {
  default: async ({ request, fetch }) => {
    const form = await superValidate(request, valibot(InsertEvent));

    if (!form.valid) {
      return fail(400, { form });
    }

    const client = createClient({ fetch });

    const resp = await client.events.$post({
      json: form.data,
    });
    console.log(await resp.text());
    if (!resp.ok) return fail(400, { form });
    return message(form, "Form posted successfully!");
  },
};
