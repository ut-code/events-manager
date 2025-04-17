<script lang="ts">
  import { createClient } from "@/client.ts";
  import ErrorPage from "@/components/ErrorPage.svelte";
  import EventList from "@/components/EventList.svelte";
  import { SWR } from "@/lib/swr.svelte.ts";
  import PageHead from "@/parts/PageHead.svelte";
  import { Event } from "@stack/server/validator/schema";
  import { array } from "valibot";

  const client = createClient({ fetch });
  const { data } = $props();
  const swr = new SWR("/ events", () => data.events, array(Event));
</script>

<PageHead title="Events Manager" thumbnail={null} description={null} />

<main class="mx-auto max-w-lg px-5">
  {#await swr.current}
    <div class="h-20 w-full">
      <span class="loading loading-bars mx-auto"></span>
    </div>
  {:then events}
    <EventList
      {events}
      refetch={async () => {
        const r = await client.events.$get();
        if (!r.ok)
          throw new Error(`got status ${r.status} with text ${await r.text()}`);
        const updated = await r.json();
        swr.update(updated);
        return updated;
      }}
    />
  {:catch err}
    <ErrorPage {err} />
  {/await}
  <a href="/new" class="btn btn-primary mr-0 ml-auto">create new</a>
</main>
