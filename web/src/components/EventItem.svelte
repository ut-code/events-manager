<script lang="ts">
  import type { SelectEvent } from "@stack/server/validator/schema.ts";
  import { lightFormat } from "date-fns";
  import { Popover } from "melt/builders";
  import { slide } from "svelte/transition";
  import Dots from "~icons/fe/elipsis-h";
  import EventPopover from "./EventPopover.svelte";

  const popover = new Popover();
  type Props = {
    event: SelectEvent;
    onupdate: () => Promise<void>;
  };
  const { event, onupdate }: Props = $props();
</script>

<EventPopover {event} {popover} {onupdate} />
<li class="list-row" transition:slide>
  <span>{event.name}</span>
  <span>{event.description}</span>
  <span>
    {#if event.allday}
      {lightFormat(new Date(event.start * 1000), "yyyy/MM/dd")}
    {:else}
      {lightFormat(new Date(event.start * 1000), "yyyy/MM/dd hh:mm")}
    {/if}
  </span>
  <button {...popover.trigger}>
    <Dots />
  </button>
</li>
