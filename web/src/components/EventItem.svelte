<script lang="ts">
  import type { SelectEvent } from "+server/validator/schema.ts";
  import { lightFormat } from "date-fns";
  import Dots from "~icons/fe/elipsis-h";

  type Props = {
    event: SelectEvent;
  };
  const { event }: Props = $props();
</script>

<li class="list-row">
  <span>{event.name}</span>
  <span>{event.description}</span>
  <span>
    {#if event.allday}
      {lightFormat(new Date(event.start * 1000), "yyyy/MM/dd")}
    {:else}
      {lightFormat(new Date(event.start * 1000), "yyyy/MM/dd hh:mm")}
    {/if}
  </span>
  <Dots />
</li>
