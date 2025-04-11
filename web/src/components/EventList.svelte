<script lang="ts">
  import type { SelectEvent } from "+server/validator/schema.ts";
  import EventItem from "./EventItem.svelte";
  type Props = {
    events: SelectEvent[];
  };
  const { events }: Props = $props();
</script>

<ul class="list">
  {#each events as event (event.id)}
    <EventItem {event} />
  {:else}
    <li class="list-row">No events yet.</li>
  {/each}
</ul>
