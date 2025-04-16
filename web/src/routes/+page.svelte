<script lang="ts">
  import { createClient } from "@/client.ts";
  import ErrorPage from "@/components/ErrorPage.svelte";
  import EventList from "@/components/EventList.svelte";
  import swr from "@/lib/swr.svelte.ts";
  import PageHead from "@/parts/PageHead.svelte";
  import { Event } from "@stack/server/validator/schema";
  import { array } from "valibot";

  const client = createClient({ fetch });
  const { data } = $props();
  const promise = swr("/ events", data.events, array(Event));
</script>

<PageHead title="Events Manager" thumbnail={null} description={null} />

<main class="mx-auto max-w-lg">
  {#await promise.current}
    loading...
  {:then events}
    <EventList
      {events}
      refetch={async () => {
        const r = await client.events.$get();
        if (!r.ok)
          throw new Error(`got status ${r.status} with text ${await r.text()}`);
        return await r.json();
      }}
    />
  {:catch err}
    <ErrorPage {err} />
  {/await}
  <a href="/new" class="btn btn-primary mr-0 ml-auto">create new</a>
</main>
