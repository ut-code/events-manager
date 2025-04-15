import { createClient } from "@/client";
import type { PageLoad } from "./$types.ts";

export const load: PageLoad = ({ fetch }) => {
  const client = createClient({ fetch });
  const events = client.events.$get().then(async (r) => {
    if (!r.ok)
      throw new Error(
        `response status was not ok: status ${r.status}, text: ${await r.text()}`,
      );
    return await r.json();
  });
  return {
    events,
  };
};
