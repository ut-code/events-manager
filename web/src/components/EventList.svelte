<script lang="ts">
  import type { SelectEvent } from "@stack/server/validator/schema.ts";
  import EventItem from "./EventItem.svelte";

  type Props = {
    events: SelectEvent[];
    refetch: () => Promise<SelectEvent[]>;
  };
  let { events, refetch }: Props = $props();
</script>

<ul class="list">
  {#each events as event (event.id)}
    <EventItem
      {event}
      onupdate={async () => {
        events = await refetch();
      }}
    />
  {:else}
    <li class="list-row">No events yet.</li>
  {/each}
</ul>
