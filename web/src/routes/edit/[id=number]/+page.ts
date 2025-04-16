import { createClient } from "@/client.ts";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types.ts";

export const load: PageLoad = async ({ fetch, params }) => {
  const id = params.id;
  const client = createClient({ fetch });
  const resp = await client.events[":id"].$get({
    param: {
      id,
    },
  });
  if (!resp.ok) error(resp.status, await resp.text());

  return {
    event: await resp.json(),
  };
};
