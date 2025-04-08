<script lang="ts">
  import type { SelectEvent } from "+server/validator/schema.ts";
  type Props = {
    events: SelectEvent[];
  };
  const { events }: Props = $props();
</script>

<ul class="list">
  {#each events as event (event.id)}
    <li class="list-row">
      <span>{event.name}</span>
      <span>{event.description}</span>
      <span>{event.date}</span>
    </li>
  {:else}
    <li>No events yet.</li>
  {/each}
</ul>
